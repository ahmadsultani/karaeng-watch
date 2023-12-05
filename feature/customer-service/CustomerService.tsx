"use client";
import { CSNavbar } from "@/components/Navbar";
import { EmptyWrapper } from "@/components/Wrapper/styles";
import { db } from "@/config/firebase";
import { IUser } from "@/interfaces/user";
import { Box, CircularProgress, Typography } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatBalloon } from "./components/ChatBalloon";
import { ChatContainer, ChatWrapper, EmptyChatIcon } from "./styles";
import { IChatMessage } from "./types";

export const CustomerService: React.FC = () => {
  const user = JSON.parse(Cookies.get("user") || "{}") as IUser;
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);

  return (
    <ChatWrapper>
      <CSNavbar />
      <ChatContainer ref={chatRef}>
        {isLoading ? (
          <EmptyWrapper>
            <CircularProgress size="32px" />
          </EmptyWrapper>
        ) : chatMessages.length === 0 ? (
          <EmptyWrapper>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={"12px"}
            >
              <EmptyChatIcon>
                <Image src={"/icons/emptyChat.svg"} alt="emptyChat.svg" fill />
              </EmptyChatIcon>
              <Typography color={"gray"} fontWeight={"300"}>
                No Messages Yet
              </Typography>
            </Box>
          </EmptyWrapper>
        ) : (
          chatMessages.map((message, index) => (
            <ChatBalloon
              key={index}
              date={String(message.date.toDate())}
              variant={message.senderId === user.uid ? "User" : "Admin"}
            >
              {message.message}
            </ChatBalloon>
          ))
        )}
      </ChatContainer>
      <ChatInput />
    </ChatWrapper>
  );
};
