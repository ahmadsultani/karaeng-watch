"use client";
import React, { useState } from "react";
import { ChatContainer, ChatInput, ChatWrapper, EmptyChatIcon } from "./styles";
import { ChatBalloon } from "./ChatBalloon";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import Image from "next/image";

interface CustomerServiceProps {}

interface ChatMessage {
  Date: Date;
  message: string;
  variant: "User" | "Admin";
}

export const CustomerService: React.FC<CustomerServiceProps> = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      const currentDate = new Date();

      const newChatMessage: ChatMessage = {
        Date: currentDate,
        message: inputValue.trim(),
        variant: "User",
      };

      setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
      setInputValue("");
    }
  };
  const handleAdminSubmit = () => {
    if (inputValue.trim() !== "") {
      const currentDate = new Date();

      const newChatMessage: ChatMessage = {
        Date: currentDate,
        message: inputValue.trim(),
        variant: "Admin",
      };

      setChatMessages((prevMessages) => [...prevMessages, newChatMessage]);
      setInputValue("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <ChatWrapper>
        <ChatContainer>
          {chatMessages.length === 0 ? (
            <Box
              display={"flex"}
              flexGrow={1}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={"12px"}
              >
                <EmptyChatIcon>
                  <Image
                    src={"/icons/emptyChat.svg"}
                    alt="emptyChat.svg"
                    fill
                  />
                </EmptyChatIcon>
                <Typography color={"gray"} fontWeight={"300"}>
                  No Messages Yet
                </Typography>
              </Box>
            </Box>
          ) : (
            chatMessages.map((message, index) => (
              <ChatBalloon
                key={index}
                Date={message.Date}
                variant={message.variant}
              >
                {message.message}
              </ChatBalloon>
            ))
          )}
        </ChatContainer>
      </ChatWrapper>
      <ChatInput>
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
        <IconButton size="large" color="primary" onClick={handleAdminSubmit}>
          <Send />
        </IconButton>
      </ChatInput>
    </>
  );
};
