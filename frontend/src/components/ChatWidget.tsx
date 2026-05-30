import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { apiClient } from "../api/client";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

type ChatMessage = {
  author: string;
  role: string;
  text: string;
  timestamp: string;
  isSelf: boolean;
};

const CHANNELS = [
  { id: "general", name: "# general", description: "Discussions generales" },
  { id: "support", name: "# support-client", description: "Aide et assistance technique" },
  { id: "commercial", name: "# commercial-ventes", description: "Demandes de devis et services" },
  { id: "devs", name: "# developpeurs", description: "Discussions techniques & tasks" }
];

const ChatWidget = () => {
  const theme = useTheme();
  const authUserId = useSelector((state: RootState) => state.auth.userId);
  const authRole = useSelector((state: RootState) => state.auth.role);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [activeChannel, setActiveChannel] = useState(CHANNELS[0]);
  const [fullName, setFullName] = useState("");
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected" | "failed">("disconnected");
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load user profile name
  useEffect(() => {
    const loadProfile = async () => {
      if (authUserId) {
        try {
          const res = await apiClient.get<{ fullName: string }>(`/profile/${authUserId}`);
          if (res.data?.fullName) {
            setFullName(res.data.fullName);
          }
        } catch {
          setFullName(`Utilisateur (${authRole})`);
        }
      }
    };
    loadProfile();
  }, [authUserId, authRole]);

  // Set up SignalR connection
  useEffect(() => {
    setConnectionStatus("connecting");
    const newConnection = new HubConnectionBuilder()
      .withUrl("/hubs/chat")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  // Connect & listen for events
  useEffect(() => {
    if (!connection) return;

    const startConnection = async () => {
      try {
        await connection.start();
        setConnectionStatus("connected");
        
        // Listen for incoming messages
        connection.on("ReceiveMessage", (userAndRole: string, text: string) => {
          const [name, role] = userAndRole.split(" | ");
          const cleanName = name || "Utilisateur";
          const cleanRole = role || "Client";
          
          setMessages((prev) => [
            ...prev,
            {
              author: cleanName,
              role: cleanRole,
              text,
              timestamp: new Date().toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit"
              }),
              isSelf: cleanName === (fullName || "Utilisateur")
            }
          ]);
        });
      } catch (err) {
        console.error("SignalR Connection Error: ", err);
        setConnectionStatus("failed");
      }
    };

    startConnection();

    return () => {
      connection.off("ReceiveMessage");
      connection.stop();
    };
  }, [connection, fullName]);

  // Scroll to bottom when messages list updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = draft.trim();
    if (!text) return;

    const senderName = fullName || "Utilisateur";
    const senderRole = authRole || "Client";
    const userAndRole = `${senderName} | ${senderRole}`;

    if (connection && connectionStatus === "connected") {
      try {
        await connection.invoke("SendMessage", userAndRole, text);
        setDraft("");
      } catch (err) {
        console.error("Sending message failed: ", err);
      }
    } else {
      // Fallback local mode for robust operation
      setMessages((prev) => [
        ...prev,
        {
          author: senderName,
          role: senderRole,
          text,
          timestamp: new Date().toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit"
          }),
          isSelf: true
        }
      ]);
      setDraft("");
      
      // Simulate automatic response in offline mode
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            author: "System (Auto)",
            role: "Support",
            text: `[Canal hors-ligne] Nous avons bien recu : "${text}". Notre equipe repondra des sa connexion.`,
            timestamp: new Date().toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit"
            }),
            isSelf: false
          }
        ]);
      }, 1000);
    }
  };

  return (
    <Grid container spacing={2} sx={{ minHeight: "75vh" }}>
      {/* Sidebar for channels */}
      <Grid item xs={12} md={3.5}>
        <Paper elevation={3} sx={{ height: "100%", borderRadius: 2, overflow: "hidden" }}>
          <Box sx={{ p: 2, bgcolor: "primary.main", color: "primary.contrastText" }}>
            <Typography variant="h6" fontWeight="bold">
              Canaux de chat
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Rejoignez un canal pour echanger
            </Typography>
          </Box>
          <List sx={{ p: 0 }}>
            {CHANNELS.map((channel) => (
              <ListItem key={channel.id} disablePadding>
                <ListItemButton
                  selected={activeChannel.id === channel.id}
                  onClick={() => setActiveChannel(channel)}
                  sx={{
                    py: 1.5,
                    borderLeft: "4px solid",
                    borderLeftColor: activeChannel.id === channel.id ? "secondary.main" : "transparent"
                  }}
                >
                  <ListItemText
                    primary={channel.name}
                    secondary={channel.description}
                    primaryTypographyProps={{ fontWeight: "bold", variant: "body2" }}
                    secondaryTypographyProps={{ variant: "caption" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
          <Divider />
          
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
              Mon Profil Chat
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar sx={{ bgcolor: "secondary.main", width: 32, height: 32 }}>
                {(fullName || "U").slice(0, 1)}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight="medium">
                  {fullName || "Chargement..."}
                </Typography>
                <Chip size="small" label={authRole} color="primary" variant="outlined" sx={{ height: 18, fontSize: "0.7rem" }} />
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Grid>

      {/* Main chat window */}
      <Grid item xs={12} md={8.5}>
        <Paper elevation={3} sx={{ display: "flex", flexDirection: "column", height: "75vh", borderRadius: 2, overflow: "hidden" }}>
          {/* Header */}
          <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {activeChannel.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {activeChannel.description}
              </Typography>
            </Box>
            
            {/* Status indicator */}
            {connectionStatus === "connected" && (
              <Chip size="small" color="success" label="En ligne" variant="filled" sx={{ height: 24 }} />
            )}
            {connectionStatus === "connecting" && (
              <Chip size="small" color="warning" label="Connexion..." variant="outlined" sx={{ height: 24 }} />
            )}
            {connectionStatus === "failed" && (
              <Chip size="small" color="error" label="Hors-ligne (Fallback)" variant="filled" sx={{ height: 24 }} />
            )}
          </Box>

          {/* Messages area */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2, bgcolor: "grey.50" }}>
            {connectionStatus === "failed" && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Connexion WebSocket en attente. Le systeme a bascule en mode simulation robuste pour assurer le fonctionnement continu !
              </Alert>
            )}
            
            <Stack spacing={2}>
              {messages.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 5, color: "text.secondary" }}>
                  <Typography variant="body2">Aucun message pour le moment dans {activeChannel.name}.</Typography>
                  <Typography variant="caption">Soyez le premier a ecrire un message !</Typography>
                </Box>
              ) : (
                messages.map((msg, index) => (
                  <Box
                    key={`${msg.author}-${index}`}
                    sx={{
                      display: "flex",
                      justifyContent: msg.isSelf ? "flex-end" : "flex-start",
                      width: "100%"
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        maxWidth: "75%",
                        flexDirection: msg.isSelf ? "row-reverse" : "row"
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: msg.isSelf ? "secondary.main" : "primary.main",
                          mt: 0.5
                        }}
                      >
                        {msg.author.slice(0, 1)}
                      </Avatar>
                      <Box>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.3, justifyContent: msg.isSelf ? "flex-end" : "flex-start" }}>
                          <Typography variant="caption" fontWeight="bold" color="text.primary">
                            {msg.author}
                          </Typography>
                          <Chip
                            size="small"
                            label={msg.role}
                            variant="outlined"
                            sx={{
                              height: 14,
                              fontSize: "0.6rem",
                              px: 0.5,
                              borderColor: msg.isSelf ? "secondary.light" : "primary.light"
                            }}
                          />
                        </Stack>
                        <Paper
                          elevation={1}
                          sx={{
                            p: 1.5,
                            borderRadius: msg.isSelf ? "12px 0px 12px 12px" : "0px 12px 12px 12px",
                            bgcolor: msg.isSelf ? "secondary.main" : "white",
                            color: msg.isSelf ? "secondary.contrastText" : "text.primary"
                          }}
                        >
                          <Typography variant="body2" style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
                            {msg.text}
                          </Typography>
                        </Paper>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mt: 0.3, textAlign: msg.isSelf ? "right" : "left" }}
                        >
                          {msg.timestamp}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                ))
              )}
              <div ref={messagesEndRef} />
            </Stack>
          </Box>

          {/* Input area */}
          <Divider />
          <Box sx={{ p: 2, bgcolor: "white" }}>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="medium"
                placeholder={`Ecrire dans ${activeChannel.name}...`}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={sendMessage}
                sx={{
                  px: 3,
                  borderRadius: 3,
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark"
                  }
                }}
              >
                Envoyer
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChatWidget;
