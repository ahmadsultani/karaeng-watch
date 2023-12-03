import { Box, Modal, styled } from "@mui/material";
import { COLORS } from "@/constants/colors";

export const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ModalContainer = styled(Box)({
  minWidth: "300px",
  borderRadius: "4px",
  overflow: "hidden",
  maxHeight: "calc(100vh - 64px)",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
});

export const ModalHeader = styled(Box)({
  backgroundColor: "white",
  borderBottom: `1px solid ${COLORS.grey}`,
  padding: "8px 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const ModalBody = styled(Box)({
  padding: "16px",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  minHeight: "160px",
  maxHeight: "calc(100vh - 64px - 120px - 64px)",
});

export const ModalButtonGroup = styled(Box)({
  borderTop: `1px solid ${COLORS.grey}`,
  padding: "12px 16px",
  display: "flex",
  gap: "12px",
  justifyContent: "end",
  alignItems: "center",
});
