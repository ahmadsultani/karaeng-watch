import { Box, Link, styled } from "@mui/material";

export const Wrappper = styled(Box)<{ notOnHero: boolean }>(
  ({ notOnHero, theme }) => ({
    position: notOnHero ? "sticky" : "fixed",
    top: 0,
    right: 0,
    left: 0,
    display: "flex",
    padding: "12px 64px",
    justifyContent: "space-between",
    alignItems: "center",
    background: notOnHero
      ? theme.palette.secondary.main
      : "linear-gradient(180deg, rgba(0, 0, 0, 0.35) 54.69%, rgba(0, 0, 0, 0.00) 100%)",
    backdropFilter: "blur(2px)",
    zIndex: 10,
  }),
);

export const Menu = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

export const StyledLink = styled(Link)({
  fontSize: "14px",
});
