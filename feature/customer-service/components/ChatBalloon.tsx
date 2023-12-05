"use client";

import { formatToHour } from "@/utils/formatter";
import { Box } from "@mui/material";
import {
  AdminBalloon,
  BalloonContainer,
  ChatText,
  DateText,
  UserBalloon,
} from "../styles";

interface ChatBalloonProps {
  children: React.ReactNode;
  variant: "User" | "Admin";
  date: string;
}

export const ChatBalloon: React.FC<ChatBalloonProps> = ({
  children,
  variant = "User",
  date,
}) => {
  if (variant === "Admin") {
    return (
      <BalloonContainer>
        <AdminBalloon bgcolor={"primary.main"}>
          <ChatText color={"black"}>{children}</ChatText>
          <Box display={"flex"} width="100%" justifyContent={"flex-end"}>
            <DateText color={"black"}>{formatToHour(date)}</DateText>
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
              {formatToHour(date)}
              {/* {second < 10 ? "0" + second : second} */}
            </DateText>
          </Box>
        </UserBalloon>
      </BalloonContainer>
    );
  }
};
