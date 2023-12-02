import { styled, Box, List, ListItemButton } from "@mui/material";

export const SidebarContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "black",
  height: "100vh",
});

export const SidebarHead = styled(Box)({
  padding: "18px",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  backgroundColor: "#292929",
  userSelect: "none",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
});

export const SidebarMenus = styled(List)({
  display: "flex",
  flexDirection: "column",
  padding: "24px 0px",
});

export const SideBarItemContainer = styled(ListItemButton)({
  display: "flex",
  padding: "18px",
  borderRadius: "0px 24px 24px 0px",
  maxWidth: "240px",
});
