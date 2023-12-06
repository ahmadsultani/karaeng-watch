import { styled, Box, Typography, List } from "@mui/material";

// Customer Service UI
export const ChatWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  height: "100vh",
  overflow: "hidden",
});

export const EmptyChatIcon = styled(Box)({
  width: "60px",
  height: "60px",
  position: "relative",
});

export const ChatContainerWrapper = styled(Box)({
  flex: "1",
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  gap: "16px",
  overflowY: "auto",
  height: "100%",
});

export const CSAdminContainer = styled(Box)({
  width: "100%",
  maxHeight: "100%",
  display: "flex",
});

export const UserChatLists = styled(List)({
  padding: "8px",
  boxShadow: "1px 0 2px 0 rgba(0,0,0,0.4)",
  width: "360px",
  height: "calc(100vh - 54px)",
  overflowY: "auto",
});

export const ChatHeader = styled(Box)({
  padding: "24px",
  display: "flex",
  justifyContent: "center",
});

export const ChatInputWrapper = styled(Box)(({ theme }) => ({
  position: "sticky",
  bottom: "0",
  gap: "16px",
  padding: "16px 32px",
  backgroundColor: theme.palette.secondary.main,
  display: "flex",
  alignItems: "flex-end",
  ["@media (max-width: 768px)"]: {
    padding: "16px",
  },
}));

//Balloon Chat
export const BalloonContainer = styled(Box)({
  width: "100%",
  display: "flex",
  height: "max-content",
});

//Balloon User and Admin
export const UserBalloon = styled(Box)({
  padding: "12px",
  maxWidth: "45%",
  minWidth: "200px",
  display: "flex",
  borderRadius: "8px 0 8px 8px",
  gap: "4x",
  flexDirection: "column",
  ["@media (max-width: 1024px)"]: {
    maxWidth: "65%",
  },
  ["@media (max-width: 768px)"]: {
    maxWidth: "75%",
  },
});
export const AdminBalloon = styled(Box)({
  padding: "12px",
  maxWidth: "45%",
  minWidth: "200px",
  display: "flex",
  gap: "4x",
  flexDirection: "column",
  borderRadius: "0 8px 8px 8px",

  ["@media (max-width: 1024px)"]: {
    maxWidth: "65%",
  },
  ["@media (max-width: 768px)"]: {
    maxWidth: "75%",
  },
});

export const ChatText = styled(Typography)({
  width: "100%",
  wordWrap: "break-word",
  fontWeight: "300",
  fontSize: "14px",
});

export const DateText = styled(Typography)({
  fontSize: "12px",
});
