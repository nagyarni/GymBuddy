import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";
import TopBar from "../util/TopBar";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { useGetChatDataQuery, useSendMessageMutation } from "../../features/chat/chatApi-slice";
import chatSlice from "../../features/chat/chat-slice";
import LoadingSpinner from "../util/LoadingSpinner";
import { useSnackbar } from "../util/SnackBarContext";

function Chat() {
  const { clientid, coachid } = useParams();

  const myUserId = useSelector((state) => state.auth.user.userId)

  const dispatch = useDispatch()

  // Get chat data from store
  const chatData = useSelector((state) => state.chat.chatData)

  // Snackbar message hook
  const { setSnackbarMessage } = useSnackbar();

  let content = ""

  // Use send message mutation from Chat api slice
  const [sendMessage, sendMessageResult] = useSendMessageMutation();

  // Call API fetch hook to get chat info
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetChatDataQuery({ clientid: clientid, coachid: coachid }, { pollingInterval: 3000 })


  useEffect(() => {
    if (isSuccess) {
      dispatch(chatSlice.actions.updateChatData({ newChatData: data }))
    }
  }, [isSuccess, data])
  
  if (isError) {
    //setSnackbarMessage({ message: "Error while fetching data, please reload page!", isError: true });
    console.log(error)
  }

  const theme = useTheme();
  const chatAreaRef = useRef(null); // Ref to the chat area

  const [newMessage, setNewMessage] = useState("");

  const handleMessageSend = async () => {
    if (newMessage.trim() !== "") {
      const chatid = chatData._id

      try {
        const body = {
          content: newMessage,
          sender: myUserId
        };
        console.log(body)
        const { data, error } = await sendMessage({ chatid: chatid, message: body });
      } catch (error) {
        console.log(error);
        const errorMessage = error.data ? error.data.message : 'Unexpected error occurred while adding cycle!';
        setSnackbarMessage({ message: errorMessage, isError: true });
      }
      setNewMessage("");
    }
  };

  // Scroll to the bottom of the chat area whenever messages change
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chatData?.messages]);

  return (
    <>
    <TopBar title={"Chat"} />
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: theme.palette.background.default,
            height: "calc(100vh - 64px)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            ref={chatAreaRef} // Attach ref to the chat area
            sx={{
              flexGrow: 1,
              overflowY: "scroll",
            }}
          >
          {
            chatData !== null ?
              chatData.messages.map((message, index) => (
                <Message message={{
                  ...message,
                  sender: message.sender === myUserId ? "me" : message.sender
                }} 
                key={index} />
              ))
            : <LoadingSpinner />
          }
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <TextField
              label="Type a message"
              variant="outlined"
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleMessageSend();
                }
              }}
              autoComplete="off"
            />
            <IconButton
              color="primary"
              onClick={handleMessageSend}
              sx={{ marginLeft: "10px" }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Chat;
