import {
  Box,
  Button,
  ButtonBase,
  Input,
  Typography,
  styled,
} from "@mui/material";

export const ProfileWrapper = styled(Box)({
  padding: "32px 64px",
  display: "flex",
  flexDirection: "column",
  gap: "48px",
  ["@media (max-width: 1024px)"]: {
    paddingInline: "32px",
  },
  ["@media (max-width: 768px)"]: {
    paddingInline: "16px",
  },
});

export const ProfileItemContainer = styled(Box)({
  gap: "16px",
  display: "flex",
  flexDirection: "column",
});

export const ProfileTextHeader = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "flex-start",
});

export const ProfileItems = styled(Box)({
  display: "flex",
  gap: "16px",
  padding: "12px 0",
  height: "max-content",
  alignItems: "center",
  ["@media (max-width: 1024px)"]: {
    gap: "8px",
  },
  ["@media (max-width: 768px)"]: {
    gap: "4px",
    alignItems: "flex-start",
    flexDirection: "column",
  },
});

export const ProfileFormSection = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
});

export const ProfileLabel = styled(Typography)({
  fontSize: "20px",
  minWidth: "150px",
  fontWeight: "400",
  ["@media (max-width: 1024px)"]: {
    fontSize: "18px",
    minWidth: "120px",
  },
  ["@media (max-width: 768px)"]: {
    fontSize: "16px",
    minWidth: "100px",
  },
});

export const ProfileContent = styled(Input)(({ theme }) => ({
  fontSize: "20px",
  color: theme.palette.secondary.main,
  "&::placeholder": {
    color: theme.palette.grey[500],
  },
  width: "100%",
  fontWeight: "300",
  ["@media (max-width: 1024px)"]: {
    fontSize: "18px",
  },
  ["@media (max-width: 768px)"]: {
    fontSize: "16px",
  },
}));

export const DropArea = styled(ButtonBase)({
  border: `1px solid grey`,
  width: "100%",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px 12px",
});

export const ProfileButton = styled(Button)({
  padding: "8px 32px",
  ["@media (max-width: 1024px)"]: {},
  ["@media (max-width: 768px)"]: {
    width: "100%",
  },
});
