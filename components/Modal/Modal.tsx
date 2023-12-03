"use client";

import { useState } from "react";

import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";

import { Close as CloseIcon, DeleteOutline } from "@mui/icons-material";
import {
  ModalBody,
  ModalButtonGroup,
  ModalContainer,
  ModalHeader,
  StyledModal,
} from "./styles";

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  type: "delete" | "edit" | "ok";
  onClose: () => void;
  onComplete: () => void;
}

export const Modal = ({
  isOpen,
  title,
  children,
  type,
  onClose,
  onComplete,
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (e: Event | React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(false);
    onClose();
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    onComplete();
    setIsLoading(false);
  };

  return (
    <StyledModal open={isOpen} onClose={handleClose}>
      <ModalContainer width="428px">
        <ModalHeader>
          <Typography fontWeight={600}>{title}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon htmlColor="#000000" />
          </IconButton>
        </ModalHeader>

        <ModalBody>{children}</ModalBody>

        <ModalButtonGroup>
          <Button
            size="small"
            variant="text"
            color="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={
              isLoading ? (
                <CircularProgress />
              ) : (
                type === "delete" && <DeleteOutline />
              )
            }
            color={type === "delete" ? "error" : "primary"}
            onClick={handleSave}
            disabled={isLoading}
          >
            {
              {
                delete: "Delete",
                edit: "Save",
                ok: "Ok",
              }[type]
            }
          </Button>
        </ModalButtonGroup>
      </ModalContainer>
    </StyledModal>
  );
};
