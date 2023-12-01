import { styled, Box, ListItem, Typography } from "@mui/material";

export const SettingWrapper = styled(Box)({
  padding: "32px 16px",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  gap: "16px",
  ["@media (max-width: 1024px)"]: {
    padding: "24px 12px",
  },
  ["@media (max-width: 768px)"]: {
    padding: "16px 8px",
  },
});

export const SettingList = styled(ListItem)({
  padding: "8px 12px",
});

export const SettingLabel = styled(Typography)({
  fontSize: "18px",
  ["@media (max-width: 1024px)"]: {
    fontSize: "16px",
  },
  ["@media (max-width: 768px)"]: {
    fontSize: "14px",
  },
});

export const SettingProfile = styled(Box)({
  width: "100%",
  display: "flex",
  padding: "8px 24px",
  gap: "16px",
  alignItems: "center",
  flexDirection: "column",
});
