import { Box, Link, styled } from "@mui/material";

export const Wrappper = styled(Box)<{ notonhero: boolean }>(
  ({ notonhero, theme }) => ({
    position: notonhero ? "sticky" : "fixed",
    top: 0,
    right: 0,
    left: 0,
    width: "100vw",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "12px 64px",
    alignItems: "center",
    background: notonhero
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
      paddingInline: "24px",
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
