"use client";

import Image from "next/image";
import { CSNavbar } from "@/components/Navbar";
import { ChatInput } from "./components/ChatInput";
import Cookies from "js-cookie";
import { ChatContainer } from "./components/ChatContainer";
import {
  ChatWrapper,
  CSAdminContainer,
  EmptyChatIcon,
  UserChatLists,
} from "./styles";
import { IUser } from "@/interfaces/user";
import { useEffect, useLayoutEffect, useState } from "react";
import { IChatMessage } from "./types";
import { db } from "@/config/firebase";
import { onSnapshot, doc, collection } from "firebase/firestore";
import {
  Box,
  CircularProgress,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import { ChatBalloon } from "./components/ChatBalloon";
import { IUserChats } from "@/interfaces/userChats";
import { ChatUserListItem } from "./components/ChatUserListItem";
import { EmptyWrapper } from "@/components/Wrapper/styles";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export const CustomerServiceAdmin: React.FC = () => {
  const [user, setUser] = useState<IUser>();
  const [chatRoom, setChatRoom] = useState<string>("");

  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([]);
  const [userChats, setUserChats] = useState<IUserChats[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUserChat, setIsLoadingUserChat] = useState(true);

  const handleChangeChatRoom = (id: string) => {
    setChatRoom(id);
  };

  useLayoutEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      toast.dismiss();
      toast.error("You need laptop to use this advanced feature!");
      redirect("/admin");
    }
  }, []);

  useEffect(() => {
    const userCookies = Cookies.get("user");
    userCookies && setUser(JSON.parse(userCookies) as IUser);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (chatRoom) {
      const unsubscribe = onSnapshot(doc(db, "chats", chatRoom), (doc) => {
        doc.exists() && setChatMessages(doc.data().messages);
        setIsLoading(false);
      });

      return () => {
        unsubscribe();
      };
    } else {
      setChatMessages([]);
      setIsLoading(false);
    }
  }, [chatRoom]);

  useEffect(() => {
    setIsLoadingUserChat(true);
    const unsubscribe = onSnapshot(collection(db, "userChats"), (data) => {
      const chatsData: IUserChats[] = [];

      data.forEach((doc) => {
        const chatData = doc.data() as IUserChats;
        const chatId = doc.id;
        chatsData.push({
          date: chatData.date,
          lastMessage: chatData.lastMessage,
          id: chatId,
          senderId: chatData.senderId,
        });
      });

      setUserChats(chatsData);
      setIsLoadingUserChat(false);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <ChatWrapper>
      <CSNavbar prevUrl="/admin" />
      <CSAdminContainer>
        <UserChatLists>
          {isLoadingUserChat ? (
            <EmptyWrapper>
              <CircularProgress />
            </EmptyWrapper>
          ) : (
            userChats.map((chat, index) => (
              <>
                <ChatUserListItem
                  onClick={() => handleChangeChatRoom(chat.id)}
                  key={index}
                  id={chat.id}
                  lastMessage={chat.lastMessage}
                  date={chat.date}
                  senderId={chat.senderId}
                />
                {index + 1 <= userChats.length - 1 && <Divider />}
              </>
            ))
          )}
        </UserChatLists>
        <Box
          display={"flex"}
          flex={1}
          flexDirection={"column"}
          height={"100%"}
          position={"relative"}
        >
          {chatRoom ? (
            <ChatContainer chatMessages={chatMessages} isLoading={isLoading}>
              {chatMessages.map((message, index) => (
                <ChatBalloon
                  key={index}
                  date={String(message.date.toDate())}
                  variant={
                    message.senderId === user?.uid ? "sender" : "receiver"
                  }
                >
                  {message.message}
                </ChatBalloon>
              ))}
            </ChatContainer>
          ) : (
            <EmptyWrapper>
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
                <Typography color={"gray"} fontWeight={"300"} component="span">
                  {user ? (
                    `Hello ${user?.firstName} ${user?.lastName}, Select a User First!`
                  ) : (
                    <Skeleton width={"200px"} variant="text" />
                  )}
                </Typography>
              </Box>
            </EmptyWrapper>
          )}
          {chatRoom && <ChatInput chatroomId={chatRoom} />}
        </Box>
      </CSAdminContainer>
    </ChatWrapper>
  );
};
