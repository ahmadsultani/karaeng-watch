import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { ChatInputWrapper } from "./styles";
import { useState } from "react";
import { db } from "@/config/firebase";
import { IUser } from "@/interfaces/user";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";

export const ChatInput = () => {
  const user = JSON.parse(Cookies.get("user") || "{}") as IUser;
  const [inputValue, setInputValue] = useState<string>("");

  const handleSend = async () => {
    if (inputValue.trim()) {
      await setDoc(
        doc(db, "chats", user.uid),
        {
          messages: arrayUnion({
            id: uuidv4(),
            message: inputValue,
            senderId: user.uid,
            date: Timestamp.now(),
          }),
        },
        {
          merge: true,
        },
      );

      await setDoc(
        doc(db, "userChats", user.uid),
        {
          lastMessage: inputValue,
          date: serverTimestamp(),
        },
        {
          merge: true,
        },
      );

      setInputValue("");
    }
  };

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await handleSend();
    }
  };

  return (
    <ChatInputWrapper component="form" onSubmit={handleSend}>
      <TextField
        multiline
        fullWidth
        maxRows={4}
        color="primary"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type A Message"
        inputProps={{
          style: { color: "white", fontSize: "14px" },
        }}
        onKeyDown={handleKeyPress}
      />
      <IconButton size="large" color="primary" type="submit">
        <Send />
      </IconButton>
    </ChatInputWrapper>
  );
};
