"use client";
import { CSNavbar } from "@/components/Navbar";
import { db } from "@/config/firebase";
import { IUser } from "@/interfaces/user";
import { doc, onSnapshot } from "firebase/firestore";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { ChatInput } from "./components/ChatInput";
import { ChatWrapper } from "./styles";
import { IChatMessage } from "./types";
import { ChatContainer } from "./components/ChatContainer";
import { ChatBalloon } from "./components/ChatBalloon";

export const CustomerService: React.FC = () => {
  const user = JSON.parse(Cookies.get("user") || "{}") as IUser;
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(doc(db, "chats", user.uid), (doc) => {
      doc.exists() && setChatMessages(doc.data().messages);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  return (
    <ChatWrapper>
      <CSNavbar />
      <ChatContainer chatMessages={chatMessages} isLoading={isLoading}>
        {chatMessages.map((message, index) => (
          <ChatBalloon
            key={index}
            date={String(message.date.toDate())}
            variant={message.senderId === user.uid ? "sender" : "receiver"}
          >
            {message.message}
          </ChatBalloon>
        ))}
      </ChatContainer>
      <ChatInput chatroomId={user.uid} />
    </ChatWrapper>
  );
};
