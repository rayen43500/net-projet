import { Alert, Box, Button, Card, CardContent, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiClient } from "../api/client";

type SearchRecord = Record<string, unknown>;

type SearchResult = {
  label: string;
  type: string;
  path: string;
  content: string;
};

const sources = [
  { endpoint: "/clients", path: "/clients", type: "Client", labelKeys: ["name", "contactName", "email"] },
  { endpoint: "/services", path: "/services", type: "Service", labelKeys: ["name", "category"] },
  { endpoint: "/projects", path: "/projects", type: "Projet", labelKeys: ["reference", "name", "status"] },
  { endpoint: "/tasks", path: "/tasks", type: "Tache", labelKeys: ["title", "priority", "status"] },
  { endpoint: "/quote-requests", path: "/quote-requests", type: "Demande devis", labelKeys: ["companyName", "projectType", "status"] },
  { endpoint: "/quotes", path: "/quotes", type: "Devis", labelKeys: ["reference", "status"] },
  { endpoint: "/invoices", path: "/invoices", type: "Facture", labelKeys: ["reference", "status"] },
  { endpoint: "/payments", path: "/payments", type: "Paiement", labelKeys: ["invoiceId", "status", "method"] },
  { endpoint: "/documents", path: "/documents", type: "Document", labelKeys: ["name", "documentType"] },
  { endpoint: "/tickets", path: "/tickets", type: "Ticket", labelKeys: ["subject", "priority", "status"] },
  { endpoint: "/blog-posts", path: "/blog", type: "Blog", labelKeys: ["title", "category"] },
  { endpoint: "/promotions", path: "/promotions", type: "Promotion", labelKeys: ["name", "code"] }
];

const buildLabel = (record: SearchRecord, keys: string[]) => {
  const value = keys.map((key) => record[key]).find((item) => item !== null && item !== undefined && item !== "");
  return String(value ?? "Element");
};

const Search = () => {
  const location = useLocation();
  const initialQuery = useMemo(() => new URLSearchParams(location.search).get("q") ?? "", [location.search]);
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const responses = await Promise.allSettled(
          sources.map((source) => apiClient.get<SearchRecord[]>(source.endpoint))
        );
        const nextResults = responses.flatMap((response, index) => {
          if (response.status !== "fulfilled") {
            return [];
          }

          const source = sources[index];
          return response.value.data.map((record) => ({
            label: buildLabel(record, source.labelKeys),
            type: source.type,
            path: source.path,
            content: Object.values(record)
              .map((value) => (Array.isArray(value) ? value.join(" ") : String(value ?? "")))
              .join(" ")
              .toLowerCase()
          }));
        });

        setResults(nextResults);
      } catch {
        setError("Impossible de charger la recherche globale.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return results.slice(0, 20);
    }

    return results.filter((item) => item.content.includes(normalized) || item.label.toLowerCase().includes(normalized));
  }, [query, results]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Recherche globale
      </Typography>
      <TextField
        fullWidth
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Rechercher un client, projet, ticket..."
        sx={{ mb: 3 }}
      />
      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : null}
      {loading ? (
        <Stack alignItems="center" sx={{ py: 5 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <Stack spacing={2}>
          {filteredResults.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Aucun resultat.
            </Typography>
          ) : (
            filteredResults.map((item, index) => (
              <Card key={`${item.type}-${item.label}-${index}`} variant="outlined">
                <CardContent sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">{item.label}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.type}
                    </Typography>
                  </Box>
                  <Button component={Link} to={`${item.path}?q=${encodeURIComponent(query)}`} variant="outlined">
                    Ouvrir
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      )}
    </Box>
  );
};

export default Search;
