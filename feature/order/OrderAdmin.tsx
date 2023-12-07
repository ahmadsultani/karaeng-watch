"use client";

import { AdminWrapper, EmptyWrapper } from "@/components/Wrapper/styles";
import { CircularProgress } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { OrderTable } from "./components/OrderTable";
import { getAllOrders, updateOrderStatus } from "./service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { TOrderStatus } from "@/interfaces/order";

enum EOrderStatus {
  LOADING,
  ERROR,
  SUCCESS,
}

export const OrderAdmin: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryClient = useQueryClient();

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

  const { mutateAsync } = useMutation<
    void,
    Error,
    { id: string; status: TOrderStatus }
  >({
    mutationKey: ["order"],
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onMutate: () => {
      toast.loading("Loading...");
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
      toast.success("Order status updated");
    },
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
              changeStatus={(id, status) => mutateAsync({ id, status })}
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
