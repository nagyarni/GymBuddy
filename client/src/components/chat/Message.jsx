import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material'
import React from 'react'

function Message({ message }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:
          message.sender === "me" ? "flex-end" : "flex-start",
        marginBottom: "10px",
      }}
    >
      <Box
        sx={{
          maxWidth: "70%",
          padding: "10px",
          borderRadius: "10px",
          background:
            message.sender === "me"
              ? theme.palette.primary.main
              : theme.palette.grey[700],
          color: message.sender === "me" ? "#FFF" : "#000",
          wordWrap: "break-word", // Allow long words to wrap
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
      </Box>
    </Box>
  )
}

export default Message
