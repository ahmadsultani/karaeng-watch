import { Box, styled } from "@mui/material";
import { theme } from "@/constants/theme";
import { COLORS } from "@/constants/colors";

interface ItemProps {
  isRead: boolean;
}

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "64px",
  gap: "24px",
  "@media (max-width: 840px)": {
    padding: "32px",
  },
  "@media (max-width: 600px)": {
    padding: "16px",
  },
});

export const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  // gap: "16px",
});

export const Item = styled(Box)<ItemProps>(({ isRead }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "16px",
  gap: "8px",
  justifyContent: "space-between",
  color: isRead ? COLORS.grey : theme.palette.secondary.main,
  transition: "background-color 0.3s ease, color 0.3s ease",
  borderBottom: `1px solid ${COLORS.grey}`,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  "@media (max-width: 600px)": {
    padding: "12px",
  },
}));

export const Circle = styled(Box)<ItemProps>(({ isRead }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: isRead ? "transparent" : theme.palette.primary.main,
}));

export const Content = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "8px",
  width: "100%",
});

export const ItemDate = styled(Box)({
  fontSize: "12px",
  color: "#666",
});

export const ItemTitle = styled(Box)({
  fontSize: "18px",
  fontWeight: "bold",
});

export const ItemDescription = styled(Box)({
  fontSize: "14px",
  color: "#444",
});
