import { Box, Modal, styled } from "@mui/material";
import { COLORS } from "@/constants/colors";

export const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ModalContainer = styled(Box)({
  minWidth: "300px",
  maxWidth: "min(90vw, 560px)",
  overflow: "hidden",
  maxHeight: "calc(100vh - 64px)",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
});

export const ModalHeader = styled(Box)({
  backgroundColor: "white",
  display: "flex",
  padding: "32px",
  justifyContent: "space-between",
  fontSize: "24px",
  alignItems: "center",
  ["@media (max-width: 1024px)"]: {
    padding: "24px",
    fontSize: "20px",
  },
  ["@media (max-width: 768px)"]: {
    padding: "16px",
  },
  ["@media (max-width: 480px)"]: {
    padding: "12px",
  },
  paddingBottom: 0,
});

export const ModalBody = styled(Box)({
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  minHeight: "160px",
  paddingInline: "32px",
  maxHeight: "calc(100vh - 64px - 120px - 64px)",
  ["@media (max-width: 1024px)"]: {
    paddingInline: "24px",
  },
  ["@media (max-width: 768px)"]: {
    paddingInline: "16px",
  },
  ["@media (max-width: 480px)"]: {
    paddingInline: "8px",
  },
});

export const ModalButtonGroup = styled(Box)({
  borderTop: `1px solid ${COLORS.lightGrey}`,
  paddingBlock: "20px",
  display: "flex",
  gap: "12px",
  justifyContent: "end",
  alignItems: "center",
  paddingInline: "32px",
  ["@media (max-width: 1024px)"]: {
    paddingInline: "24px",
  },
  ["@media (max-width: 768px)"]: {
    paddingInline: "16px",
  },
  ["@media (max-width: 480px)"]: {
    paddingInline: "8px",
  },
});
