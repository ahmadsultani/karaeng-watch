"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { CircularProgress } from "@mui/material";
import { AdminWrapper, EmptyWrapper } from "@/components/Wrapper/styles";
import { OrderTable } from "./components/OrderTable";

import { getAllOrders } from "./service";
import { TOrderStatus } from "@/interfaces/order";

import toast from "react-hot-toast";
import { useOrder } from ".";

enum EOrderStatus {
  LOADING,
  ERROR,
  SUCCESS,
}

export const OrderAdmin: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { mutateUpdateOrderStatus } = useOrder();

  useEffect(() => {
    if (!searchParams.has("status")) {
      router.push(`?status=waiting`, {
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
    queryKey: ["order", searchParams.get("status")],
    queryFn: () => getAllOrders(searchParams.get("status") as TOrderStatus),
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
              data={
                Orders
                  ? Orders.filter(
                      (order) => order.status === searchParams.get("status"),
                    )
                  : []
              }
              changeStatus={(id, status) =>
                mutateUpdateOrderStatus({ id, status })
              }
            />
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
