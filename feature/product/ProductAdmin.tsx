"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

import { Modal } from "@/components/Modal";
import { AdminWrapper, EmptyWrapper } from "@/components/Wrapper/styles";
import { Table } from "./components/Table";

import { deleteProduct, getAllProduct } from "./service";
import { IProduct } from "@/interfaces/product";

enum EProductStatus {
  LOADING,
  ERROR,
  SUCCESS,
}

interface ProductAdminProps {
  isDashboard?: boolean;
}

export const ProductAdmin: React.FC<ProductAdminProps> = ({
  isDashboard = false,
}) => {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["product"],
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success(`Product "${isOpenDelete?.name}" Deleted`);
      setIsOpenDelete(undefined);
    },
    onError: (error) => {
      toast.error(error?.message || "Unknown Error");
    },
  });

  const [isOpenDelete, setIsOpenDelete] = useState<IProduct>();

  const renderContent = (status: EProductStatus) => {
    switch (status) {
      case EProductStatus.LOADING:
        return (
          <EmptyWrapper>
            <CircularProgress />
          </EmptyWrapper>
        );
      case EProductStatus.ERROR:
        toast.error(error?.name || "Unknown Error");

        return (
          <EmptyWrapper>
            <p>{error?.message || "Error Occurred, try to refresh the page"}</p>
          </EmptyWrapper>
        );
      case EProductStatus.SUCCESS:
        return (
          <AdminWrapper>
            {isDashboard ? (
              ""
            ) : (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  href="/admin/product/create"
                  startIcon={<Add />}
                  size="large"
                >
                  <Typography ml={1} mr={2}>
                    Create
                  </Typography>
                </Button>
              </Box>
            )}
            <Table data={products || []} toggleDeleteOpen={setIsOpenDelete} />
            {!!isOpenDelete && (
              <Modal
                type="delete"
                isOpen={!!isOpenDelete}
                onClose={() => setIsOpenDelete(undefined)}
                onComplete={() => mutateAsync(isOpenDelete.id)}
                title="Delete Product"
              >
                <Typography textAlign="center">
                  Are you sure you want to delete product &quot;
                  {isOpenDelete.name}&quot;?
                </Typography>
              </Modal>
            )}
          </AdminWrapper>
        );
    }
  };

  return renderContent(
    isLoadingProducts
      ? EProductStatus.LOADING
      : isErrorProducts
      ? EProductStatus.ERROR
      : EProductStatus.SUCCESS,
  );
};

export default ProductAdmin;
