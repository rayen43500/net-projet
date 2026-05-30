import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "../api/client";

type FieldType =
  | "text"
  | "password"
  | "textarea"
  | "number"
  | "date"
  | "datetime"
  | "boolean"
  | "select"
  | "tags"
  | "image"
  | "image-list";

export type ModuleField = {
  key: string;
  label: string;
  type?: FieldType;
  options?: string[];
  required?: boolean;
  helperText?: string;
  defaultValue?: unknown;
  readOnly?: boolean;
};

export type ModuleColumn = {
  key: string;
  label: string;
  type?: "text" | "date" | "datetime" | "boolean" | "money" | "image" | "tags";
  render?: (value: unknown, row: ModuleRecord) => ReactNode;
};

type ModuleRecord = Record<string, unknown> & {
  id?: string;
};

type ModulePageProps = {
  title: string;
  description?: string;
  apiEndpoint: string;
  columns: ModuleColumn[];
  fields: ModuleField[];
  createLabel?: string;
  searchPlaceholder?: string;
  readOnly?: boolean;
  pageSize?: number;
};

const toInputDate = (value: unknown) => {
  if (!value) {
    return "";
  }

  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

const toInputDateTime = (value: unknown) => {
  if (!value) {
    return "";
  }

  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 16);
};

const formatValue = (value: unknown, column: ModuleColumn) => {
  if (column.render) {
    return null;
  }

  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (column.type === "boolean") {
    return value ? "Oui" : "Non";
  }

  if (column.type === "date" || column.type === "datetime") {
    const date = new Date(String(value));
    if (Number.isNaN(date.getTime())) {
      return String(value);
    }

    return column.type === "date" ? date.toLocaleDateString() : date.toLocaleString();
  }

  if (column.type === "money") {
    return Number(value).toLocaleString(undefined, {
      maximumFractionDigits: 2
    });
  }

  if (column.type === "tags") {
    return Array.isArray(value) ? value.join(", ") : String(value);
  }

  return String(value);
};

const getFieldDefault = (field: ModuleField) => {
  if (field.defaultValue !== undefined) {
    return field.defaultValue;
  }

  if (field.type === "boolean") {
    return false;
  }

  if (field.type === "tags" || field.type === "image-list") {
    return [];
  }

  return "";
};

const normalizeRecordForForm = (record: ModuleRecord, fields: ModuleField[]) =>
  fields.reduce<ModuleRecord>((acc, field) => {
    const value = record[field.key] ?? getFieldDefault(field);
    acc[field.key] =
      field.type === "date"
        ? toInputDate(value)
        : field.type === "datetime"
          ? toInputDateTime(value)
          : value;
    return acc;
  }, {});

const buildPayloadValue = (value: unknown, field: ModuleField) => {
  if (field.type === "number") {
    return value === "" || value === null || value === undefined ? 0 : Number(value);
  }

  if (field.type === "boolean") {
    return Boolean(value);
  }

  if (field.type === "tags" || field.type === "image-list") {
    if (Array.isArray(value)) {
      return value;
    }

    return String(value ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (field.type === "date" || field.type === "datetime") {
    return value ? new Date(String(value)).toISOString() : null;
  }

  return value ?? "";
};

const getSearchValue = (record: ModuleRecord) =>
  Object.values(record)
    .map((value) => (Array.isArray(value) ? value.join(" ") : String(value ?? "")))
    .join(" ")
    .toLowerCase();

const downloadCsv = (title: string, columns: ModuleColumn[], records: ModuleRecord[]) => {
  const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const header = columns.map((column) => escape(column.label)).join(",");
  const body = records
    .map((record) =>
      columns
        .map((column) => {
          const value = record[column.key];
          return escape(Array.isArray(value) ? value.join(", ") : value);
        })
        .join(",")
    )
    .join("\n");

  const blob = new Blob([[header, body].filter(Boolean).join("\n")], {
    type: "text/csv;charset=utf-8"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

const ModulePage = ({
  title,
  description,
  apiEndpoint,
  columns,
  fields,
  createLabel = "Ajouter",
  searchPlaceholder = "Rechercher...",
  readOnly = false,
  pageSize = 8
}: ModulePageProps) => {
  const location = useLocation();
  const initialSearch = useMemo(() => new URLSearchParams(location.search).get("q") ?? "", [location.search]);
  const [records, setRecords] = useState<ModuleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ModuleRecord | null>(null);
  const [formData, setFormData] = useState<ModuleRecord>({});
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  const loadData = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const response = await apiClient.get<ModuleRecord[]>(apiEndpoint);
      setRecords(Array.isArray(response.data) ? response.data : []);
    } catch {
      setStatus({ type: "error", message: "Impossible de charger les donnees." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [apiEndpoint]);

  useEffect(() => {
    setSearch(initialSearch);
    setPage(1);
  }, [initialSearch]);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return records;
    }

    return records.filter((record) => getSearchValue(record).includes(query));
  }, [records, search]);

  const pageCount = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const paginatedRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const openCreateDialog = () => {
    setEditingRecord(null);
    setFormData(
      fields.reduce<ModuleRecord>((acc, field) => {
        acc[field.key] = getFieldDefault(field);
        return acc;
      }, {})
    );
    setDialogOpen(true);
  };

  const openEditDialog = (record: ModuleRecord) => {
    setEditingRecord(record);
    setFormData(normalizeRecordForForm(record, fields));
    setDialogOpen(true);
  };

  const closeDialog = () => {
    if (!saving) {
      setDialogOpen(false);
      setEditingRecord(null);
    }
  };

  const handleFieldChange = (field: ModuleField, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field.key]: value }));
  };

  const handleUpload = async (field: ModuleField, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setStatus({ type: "error", message: "Veuillez choisir une image valide." });
      return;
    }

    const body = new FormData();
    body.append("file", file);
    setUploadingField(field.key);

    try {
      const response = await apiClient.post<{ url: string }>("/uploads/images", body);
      const nextValue =
        field.type === "image-list"
          ? [response.data.url]
          : response.data.url;
      handleFieldChange(field, nextValue);
      setStatus({ type: "success", message: "Image uploadee." });
    } catch {
      setStatus({ type: "error", message: "Upload image impossible." });
    } finally {
      setUploadingField(null);
    }
  };

  const buildPayload = () => {
    const fieldPayload = fields.reduce<ModuleRecord>((acc, field) => {
      if (field.readOnly) {
        return acc;
      }

      acc[field.key] = buildPayloadValue(formData[field.key], field);
      return acc;
    }, {});

    return editingRecord ? { ...editingRecord, ...fieldPayload } : fieldPayload;
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const payload = buildPayload();
      if (editingRecord?.id) {
        await apiClient.put(`${apiEndpoint}/${editingRecord.id}`, payload);
        setStatus({ type: "success", message: "Element mis a jour." });
      } else {
        await apiClient.post(apiEndpoint, payload);
        setStatus({ type: "success", message: "Element cree." });
      }

      setDialogOpen(false);
      setEditingRecord(null);
      await loadData();
    } catch {
      setStatus({ type: "error", message: "Enregistrement impossible." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (record: ModuleRecord) => {
    if (!record.id || !window.confirm("Supprimer cet element ?")) {
      return;
    }

    setStatus(null);
    try {
      await apiClient.delete(`${apiEndpoint}/${record.id}`);
      setStatus({ type: "success", message: "Element supprime." });
      await loadData();
    } catch {
      setStatus({ type: "error", message: "Suppression impossible." });
    }
  };

  const renderField = (field: ModuleField) => {
    const value = formData[field.key] ?? getFieldDefault(field);

    if (field.type === "boolean") {
      return (
        <FormControlLabel
          key={field.key}
          control={
            <Checkbox
              checked={Boolean(value)}
              onChange={(event) => handleFieldChange(field, event.target.checked)}
            />
          }
          label={field.label}
        />
      );
    }

    if (field.type === "image" || field.type === "image-list") {
      const preview = Array.isArray(value) ? value[0] : value;
      return (
        <Stack key={field.key} spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {field.label}
          </Typography>
          {preview ? (
            <Box
              component="img"
              src={String(preview)}
              alt={field.label}
              sx={{
                width: 112,
                height: 76,
                objectFit: "cover",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider"
              }}
            />
          ) : null}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button variant="outlined" component="label" disabled={uploadingField === field.key}>
              {uploadingField === field.key ? "Upload..." : "Uploader image"}
              <input hidden type="file" accept="image/*" onChange={(event) => handleUpload(field, event)} />
            </Button>
            <TextField
              fullWidth
              size="small"
              label="URL image"
              value={Array.isArray(value) ? value.join(", ") : String(value ?? "")}
              onChange={(event) =>
                handleFieldChange(
                  field,
                  field.type === "image-list"
                    ? event.target.value
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean)
                    : event.target.value
                )
              }
            />
          </Stack>
          {field.helperText ? (
            <Typography variant="caption" color="text.secondary">
              {field.helperText}
            </Typography>
          ) : null}
        </Stack>
      );
    }

    return (
      <TextField
        key={field.key}
        select={field.type === "select"}
        label={field.label}
        type={
          field.type === "number"
            ? "number"
            : field.type === "date"
              ? "date"
              : field.type === "datetime"
                ? "datetime-local"
                : field.type === "password"
                  ? "password"
                  : "text"
        }
        value={Array.isArray(value) ? value.join(", ") : value}
        required={field.required}
        disabled={field.readOnly}
        multiline={field.type === "textarea"}
        minRows={field.type === "textarea" ? 3 : undefined}
        helperText={field.helperText}
        InputLabelProps={field.type === "date" || field.type === "datetime" ? { shrink: true } : undefined}
        onChange={(event) => handleFieldChange(field, event.target.value)}
      >
        {field.type === "select"
          ? field.options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))
          : null}
      </TextField>
    );
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      ) : null}

      <Card>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {!readOnly ? (
                <Button variant="contained" onClick={openCreateDialog}>
                  {createLabel}
                </Button>
              ) : null}
              <Button variant="outlined" onClick={() => downloadCsv(title, columns, filteredRecords)}>
                Exporter
              </Button>
              <Button variant="outlined" onClick={loadData}>
                Actualiser
              </Button>
            </Stack>
            <Box sx={{ flex: 1 }} />
            <TextField
              size="small"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </Stack>

          {status ? (
            <Alert severity={status.type} sx={{ mb: 2 }}>
              {status.message}
            </Alert>
          ) : null}

          {loading ? (
            <Stack alignItems="center" sx={{ py: 5 }}>
              <CircularProgress />
            </Stack>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.key}>{column.label}</TableCell>
                    ))}
                    {!readOnly ? <TableCell align="right">Actions</TableCell> : null}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length + (readOnly ? 0 : 1)}>
                        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: "center" }}>
                          Aucun element trouve.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedRecords.map((record) => (
                      <TableRow key={record.id ?? JSON.stringify(record)} hover>
                        {columns.map((column) => (
                          <TableCell key={column.key}>
                            {column.render ? column.render(record[column.key], record) : formatValue(record[column.key], column)}
                          </TableCell>
                        ))}
                        {!readOnly ? (
                          <TableCell align="right">
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                              <Button size="small" variant="outlined" onClick={() => openEditDialog(record)}>
                                Modifier
                              </Button>
                              <Button size="small" color="error" onClick={() => handleDelete(record)}>
                                Supprimer
                              </Button>
                            </Stack>
                          </TableCell>
                        ) : null}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {filteredRecords.length} element(s)
            </Typography>
            <Pagination count={pageCount} page={page} color="primary" onChange={(_, value) => setPage(value)} />
          </Stack>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingRecord ? `Modifier - ${title}` : createLabel}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            {fields.map((field) => renderField(field))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={saving}>
            Annuler
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModulePage;
