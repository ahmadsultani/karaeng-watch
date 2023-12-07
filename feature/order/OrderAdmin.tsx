"use client";

import { AdminWrapper, EmptyWrapper } from "@/components/Wrapper/styles";
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { OrderTable } from "./components/OrderTable";
import { getAllOrders } from "./service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IOrder } from "@/interfaces/order";
import style from "styled-jsx/style";

enum EOrderStatus {
  LOADING,
  ERROR,
  SUCCESS,
}

export const OrderAdmin: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpenDetail, setIsOpenDetail] = useState<IOrder>();

  useEffect(() => {
    if (!searchParams.has("status")) {
      router.push(`?status=delivered`, {
        shallow: true,
      });
    }
  }, [searchParams, router]);

  const {
    data: Orders,
    isLoading: isLoadingOrder,
    isError: isErrorOrder,
    error,
  } = useQuery({
    queryKey: ["order"],
    queryFn: getAllOrders,
  });

  const renderContent = (status: EOrderStatus) => {
    switch (status) {
      case EOrderStatus.LOADING:
        return (
          <EmptyWrapper>
            <CircularProgress />
          </EmptyWrapper>
        );
      case EOrderStatus.ERROR:
        toast.error(error?.name || "Unknown Error");

        return (
          <EmptyWrapper>
            <p>{error?.message || "Error Occurred, try to refresh the page"}</p>
          </EmptyWrapper>
        );
      case EOrderStatus.SUCCESS:
        return (
          <AdminWrapper>
            <OrderTable
              data={Orders || []}
              // toggleDetailOpen={(order) => setIsOpenDetail(order)}
            />
            {!!isOpenDetail && (
              <Modal
                open={!!isOpenDetail}
                onClose={() => setIsOpenDetail(undefined)}
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Modal>
            )}
          </AdminWrapper>
        );
    }
  };

  return renderContent(
    isLoadingOrder
      ? EOrderStatus.LOADING
      : isErrorOrder
      ? EOrderStatus.ERROR
      : EOrderStatus.SUCCESS,
  );
};

export default OrderAdmin;
