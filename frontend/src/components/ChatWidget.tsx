import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

type ChatMessage = {
  author: string;
  text: string;
};

const initialMessages: ChatMessage[] = [
  { author: "Support", text: "Bonjour, comment puis-je aider ?" },
  { author: "Client", text: "Le login ne fonctionne pas." }
];

const ChatWidget = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) {
      return;
    }

    setMessages((prev) => [...prev, { author: role ?? "Utilisateur", text }]);
    setDraft("");
  };

  return (
    <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Chat temps reel
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={1} sx={{ mb: 2 }}>
        {messages.map((message, index) => (
          <Box key={`${message.author}-${index}`} sx={{ p: 1.5, bgcolor: "background.default", borderRadius: 2 }}>
            <Typography variant="subtitle2">{message.author}</Typography>
            <Typography variant="body2">{message.text}</Typography>
          </Box>
        ))}
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
        <TextField
          fullWidth
          size="small"
          placeholder="Votre message..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button variant="contained" onClick={sendMessage}>
          Envoyer
        </Button>
      </Stack>
    </Box>
  );
};

export default ChatWidget;
