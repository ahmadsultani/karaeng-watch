"use client";

import { COLORS } from "@/constants/colors";
import { theme } from "@/constants/theme";
import { Box, styled } from "@mui/material";

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "64px",
  gap: "72px",
  ["@media (max-width: 768px)"]: {
    padding: "32px",
    gap: "48px",
  },
  ["@media (max-width: 480px)"]: {
    padding: "16px",
    gap: "24px",
  },
});

export const Title = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
  width: "55%",
  padding: "24px",
  ["@media (max-width: 768px)"]: {
    width: "100%",
  },
  ["@media (max-width: 480px)"]: {
    padding: "16px",
  },
});

export const TitleText = styled(Box)({
  fontSize: "48px",
  color: theme.palette.secondary.main,
  textAlign: "center",
  ["@media (max-width: 768px)"]: {
    fontSize: "36px",
  },
  ["@media (max-width: 480px)"]: {
    fontSize: "24px",
  },
});

export const Subtitle = styled(Box)({
  fontSize: "20px",
  color: COLORS.grey,
  textAlign: "center",
  ["@media (max-width: 768px)"]: {
    fontSize: "18px",
  },
  ["@media (max-width: 480px)"]: {
    fontSize: "14px",
  },
});

export const Frames = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "48px",
  ["@media (max-width: 768px)"]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "24px",
  },
  ["@media (max-width: 480px)"]: {
    gridTemplateColumns: "repeat(1, 1fr)",
    gridGap: "24px",
  },
});

export const Content = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
  width: "50%",
  ["@media (max-width: 768px)"]: {
    width: "100%",
  },
});

export const ContentText = styled(Box)({
  fontSize: "36px",
  color: theme.palette.secondary.main,
  textAlign: "center",
  ["@media (max-width: 768px)"]: {
    fontSize: "24px",
  },
  ["@media (max-width: 480px)"]: {
    fontSize: "18px",
  },
});

export const Divider = styled(Box)({
  width: "100%",
  height: "1px",
  backgroundColor: theme.palette.secondary.main,
});
