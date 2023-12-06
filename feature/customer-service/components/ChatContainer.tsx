import { useRef, useEffect } from "react";
import { ChatContainerWrapper, EmptyChatIcon } from "../styles";
import { EmptyWrapper } from "@/components/Wrapper/styles";
import { CircularProgress, Box, Typography } from "@mui/material";
import Image from "next/image";
import { IChatMessage } from "../types";

interface ChatContainerProps {
  chatMessages: IChatMessage[];
  children: React.ReactNode;
  isLoading: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  chatMessages,
  isLoading,
  children,
}) => {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages]);
  return (
    <ChatContainerWrapper
      sx={{
        maxHeight: "calc(100vh - 134px)",
      }}
      ref={chatRef}
    >
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
        children
      )}
    </ChatContainerWrapper>
  );
};
