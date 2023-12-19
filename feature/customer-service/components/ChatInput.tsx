import { Timestamp, arrayUnion, doc, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { ChatInputWrapper } from "../styles";
import { useEffect, useState } from "react";
import { db } from "@/config/firebase";
import { IUser } from "@/interfaces/user";
import { IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";

interface ChatInputProps {
  chatroomId: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ chatroomId }) => {
  const user = JSON.parse(Cookies.get("user") || "{}") as IUser;
  const [inputValue, setInputValue] = useState<string>("");
  const query = useSearchParams();

  useEffect(() => {
    const productJSON = query.get("product");
    if (productJSON) {
      const product = JSON.parse(productJSON);
      const baseUrl = window.location.origin;
      setInputValue(
        `Hi, I want to ask about "${product.name}" with id "${product.id} and link "${baseUrl}/product/${product.id}"`,
      );
    }
  }, [query]);

  const handleSend = async () => {
    if (inputValue.trim()) {
      await setDoc(
        doc(db, "chats", chatroomId),
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
        doc(db, "userChats", chatroomId),
        {
          lastMessage: inputValue,
          date: Timestamp.now(),
          senderId: user.uid,
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
