"use client";

import { Modal } from "@/components/Modal";
import { AdminWrapper, EmptyWrapper } from "@/components/Wrapper/styles";
import { IBrand } from "@/interfaces/brand";
import { Add } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { BrandTable } from "./components/BrandTable";
import { deleteBrand, getAllBrand } from ".";

enum EBrandStatus {
  LOADING,
  ERROR,
  SUCCESS,
}

export const BrandAdmin: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: brands,
    isLoading: isLoadingBrand,
    isError: isErrorBrand,
    error,
  } = useQuery({
    queryKey: ["brand"],
    queryFn: getAllBrand,
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["brand"],
    mutationFn: deleteBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand"] });
      toast.success(`Brand "${isOpenDelete?.name}" Deleted`);
      setIsOpenDelete(undefined);
    },
    onError: (error) => {
      toast.error(error?.message || "Unknown Error");
    },
  });

  const [isOpenDelete, setIsOpenDelete] = useState<IBrand>();

  const renderContent = (status: EBrandStatus) => {
    switch (status) {
      case EBrandStatus.LOADING:
        return (
          <EmptyWrapper>
            <CircularProgress />
          </EmptyWrapper>
        );
      case EBrandStatus.ERROR:
        toast.error(error?.name || "Unknown Error");

        return (
          <EmptyWrapper>
            <p>{error?.message || "Error Occurred, try to refresh the page"}</p>
          </EmptyWrapper>
        );
      case EBrandStatus.SUCCESS:
        return (
          <AdminWrapper>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                href="/admin/brand/create"
                startIcon={<Add />}
                size="large"
              >
                <Typography ml={1} mr={2}>
                  Create
                </Typography>
              </Button>
            </Box>
            <BrandTable
              data={brands || []}
              toggleDeleteOpen={setIsOpenDelete}
            />
            {!!isOpenDelete && (
              <Modal
                type="delete"
                isOpen={!!isOpenDelete}
                onClose={() => setIsOpenDelete(undefined)}
                onComplete={() => mutateAsync(isOpenDelete.id)}
                title="Delete Brand"
              >
                <Typography textAlign="center">
                  Are you sure you want to delete brand &quot;
                  {isOpenDelete.name}&quot;?
                </Typography>
              </Modal>
            )}
          </AdminWrapper>
        );
    }
  };

  return renderContent(
    isLoadingBrand
      ? EBrandStatus.LOADING
      : isErrorBrand
      ? EBrandStatus.ERROR
      : EBrandStatus.SUCCESS,
  );
};

export default BrandAdmin;
