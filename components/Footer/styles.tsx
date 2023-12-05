import { Box, TextField, styled } from "@mui/material";

export const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "64px",
  padding: "16px 64px",
  backgroundColor: "black",
  color: "white",
  ["@media (max-width: 768px)"]: {
    flexDirection: "column",
    gap: "16px",
    paddingInline: "32px",
  },
});

export const Main = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "64px",
  padding: "32px 64px",
  paddingBottom: "64px",
  flexWrap: "wrap",
  backgroundColor: "black",
  ["@media (max-width: 768px)"]: {
    paddingInline: "32px",
  },
});

export const MainSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  maxWidth: "200px",
  color: "white",
});

export const HeaderContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  ["@media (max-width: 768px)"]: {
    flexDirection: "column",
  },
});

export const Bottom = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px 64px",
  gap: "16px",
  backgroundColor: theme.palette.secondary.main,
}));

export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    color: "white",
    padding: "4px 8px",
  },
});
