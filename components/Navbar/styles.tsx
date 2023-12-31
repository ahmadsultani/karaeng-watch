import { Box, IconButton, Link, Typography, styled } from "@mui/material";

export const Wrapper = styled(Box)<{ notonhero?: string }>(
  ({ notonhero, theme }) => ({
    top: 0,
    right: 0,
    left: 0,
    width: "100vw",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "12px 64px",
    alignItems: "center",
    background: JSON.parse(notonhero || "true")
      ? theme.palette.secondary.main
      : "linear-gradient(180deg, rgba(0, 0, 0, 0.35) 54.69%, rgba(0, 0, 0, 0.00) 100%)",
    backdropFilter: "blur(2px)",
    zIndex: 10,
    transition: "all 0.5s ease",
    ["@media (max-width: 1024px)"]: {
      paddingInline: "32px",
      gridTemplateColumns: "1fr 1fr",
    },
    ["@media (max-width: 768px)"]: {
      paddingInline: "16px",
    },
  }),
);

export const Menu = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "16px",
});

export const StyledLink = styled(Link)({
  fontSize: "14px",
});

export const DrawerContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "24px",
  padding: "32px",
  width: "100vw",
  height: "100vh",
  backgroundColor: "black",
  color: "white",
});

export const DrawerCloseButton = styled(Box)({
  position: "absolute",
  top: "16px",
  right: "16px",
  cursor: "pointer",
  "& svg": {
    fontSize: "32px",
  },
});

export const CSNavbarWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.secondary.main,
  position: "sticky",
  top: 0,
  display: "flex",
  alignItems: "center",
  padding: "16px 24px",
  gap: "16px",
}));

export const CSHeader = styled(Typography)({
  fontSize: "20px",
  userSelect: "none",
  width: "100%",
  textAlign: "center",
  flexGrow: 1,
});

export const BackButton = styled(IconButton)({
  padding: "8px",
  fontSize: "28px",
  display: "flex",
  color: "white",
  position: "absolute",
  left: "0",
  justifyContent: "center",
});
