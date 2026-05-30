import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";

const messages = [
  { author: "Support", text: "Bonjour, comment puis-je aider ?" },
  { author: "Client", text: "Le login ne fonctionne pas." }
];

const ChatWidget = () => {
  return (
    <Box sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Chat temps reel
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={1} sx={{ mb: 2 }}>
        {messages.map((message, index) => (
          <Box key={index} sx={{ p: 1.5, bgcolor: "#f2f4f8", borderRadius: 2 }}>
            <Typography variant="subtitle2">{message.author}</Typography>
            <Typography variant="body2">{message.text}</Typography>
          </Box>
        ))}
      </Stack>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
        <TextField fullWidth size="small" placeholder="Votre message..." />
        <Button variant="contained">Envoyer</Button>
      </Stack>
    </Box>
  );
};

export default ChatWidget;
