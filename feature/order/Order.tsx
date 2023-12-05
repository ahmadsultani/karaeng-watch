"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { OrderWrapper, OrderContainer, StyledTab } from "./styles";
import { Card } from "./components/Card";

import { order } from "./fakeOrderData";
import { Tabs, Typography } from "@mui/material";
import { EmptyWrapper } from "@/components/Wrapper/styles";

enum OrderStatus {
  WAITING = "waiting",
  DELIVERED = "delivered",
  DONE = "done",
  CANCELED = "canceled",
}

export const Order = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderFiltered = order.filter(
    (item) => item.status === searchParams.get("status"),
  );

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
        {orderFiltered.length > 0 ? (
          orderFiltered.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              status={item.status}
              isReviewed={item.isReviewed}
              products={item.products}
            />
          ))
        ) : (
          <EmptyWrapper>
            <Typography variant="h4" color="secondary">
              No order found
            </Typography>
          </EmptyWrapper>
        )}
      </OrderContainer>
    </OrderWrapper>
  );
};

export default Order;
