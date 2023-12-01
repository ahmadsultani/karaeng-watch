"use client";

import { Box } from "@mui/material";
import {
  AdminBalloon,
  BalloonContainer,
  ChatText,
  DateText,
  UserBalloon,
} from "./styles";

interface ChatBalloonProps {
  children: React.ReactNode;
  variant: "User" | "Admin";
  Date: Date;
}

export const ChatBalloon: React.FC<ChatBalloonProps> = ({
  children,
  variant = "User",
  Date,
}) => {
  const hour = Date.getHours();
  const minute = Date.getMinutes();

  if (variant === "Admin") {
    return (
      <BalloonContainer>
        <AdminBalloon bgcolor={"primary.main"}>
          <ChatText color={"black"}>{children}</ChatText>
          <Box display={"flex"} width="100%" justifyContent={"flex-end"}>
            <DateText color={"black"}>
              {hour < 10 ? "0" + hour : hour}:
              {minute < 10 ? "0" + minute : minute}
              {/* {second < 10 ? "0" + second : second} */}
            </DateText>
          </Box>
        </AdminBalloon>
      </BalloonContainer>
    );
  } else {
    return (
      <BalloonContainer justifyContent={"flex-end"}>
        <UserBalloon bgcolor={"secondary.main"}>
          <ChatText color={"white"}>{children}</ChatText>
          <Box display={"flex"} width="100%" justifyContent={"flex-end"}>
            <DateText color={"white"}>
              {hour < 10 ? "0" + hour : hour}:
              {minute < 10 ? "0" + minute : minute}
              {/* {second < 10 ? "0" + second : second} */}
            </DateText>
          </Box>
        </UserBalloon>
      </BalloonContainer>
    );
  }
};
