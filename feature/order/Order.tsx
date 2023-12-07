"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { OrderWrapper, OrderContainer, StyledTab } from "./styles";
import { Card } from "./components/Card";

import { CircularProgress, Tabs, Typography } from "@mui/material";
import { EmptyWrapper } from "@/components/Wrapper/styles";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "./service";
import { TOrderStatus } from "@/interfaces/order";
import Cookies from "js-cookie";
import { IUser } from "@/interfaces/user";

enum OrderStatus {
  WAITING = "waiting",
  DELIVERED = "delivered",
  DONE = "done",
  CANCELED = "canceled",
}

export const Order = () => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as IUser) : undefined;
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    data: orders,
    isLoading: isLoadingOrders,
    isError: isErrorOrders,
    error,
  } = useQuery({
    queryKey: ["order", searchParams.get("status"), user?.uid],
    queryFn: () =>
      getAllOrders(searchParams.get("status") as TOrderStatus, user?.uid),
  });

  useEffect(() => {
    if (!searchParams.has("status")) {
      router.push(`?status=delivered`, {
        shallow: true,
      });
    }
  }, [searchParams, router]);

  return (
    <OrderWrapper>
      <Tabs
        value={searchParams.get("status")}
        onChange={(_event, newValue) => router.push(`?status=${newValue}`)}
        variant="scrollable"
      >
        <StyledTab value={OrderStatus.WAITING} label="Waiting" />
        <StyledTab value={OrderStatus.DELIVERED} label="Delivered" />
        <StyledTab value={OrderStatus.DONE} label="Done" />
        <StyledTab value={OrderStatus.CANCELED} label="Canceled" />
      </Tabs>

      <OrderContainer>
        {isLoadingOrders ? (
          <EmptyWrapper>
            <CircularProgress />
          </EmptyWrapper>
        ) : isErrorOrders ? (
          <EmptyWrapper>
            <Typography>{error.message}</Typography>
          </EmptyWrapper>
        ) : orders && orders.length > 0 ? (
          orders.map((item) => <Card key={item.id} {...item} />)
        ) : (
          <EmptyWrapper>
            <Typography>No order found</Typography>
          </EmptyWrapper>
        )}
      </OrderContainer>
    </OrderWrapper>
  );
};

export default Order;
