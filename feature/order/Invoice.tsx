"use client";

import {
  Box,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  IconButton,
} from "@mui/material";
import * as InvoiceCard from "./styles";
import { formatDate, formatPrice, formatToHour } from "@/utils/formatter";
import LogoBCA from "@/public/icons/logo-bca.svg";
import { useParams, useRouter } from "next/navigation";
import { getOrderById } from "./service";
import { getOneUser } from "../user";
import { InvoiceTable } from "./components/InvoiceTable";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { EmptyWrapper } from "@/components/Wrapper/styles";
import { NotFound } from "../not-found";
import { ArrowBack } from "@mui/icons-material";

export const Invoice = () => {
  const { id } = useParams();
  const router = useRouter();

  const {
    data: order,
    isLoading: isLoadingOrder,
    isError: isErrorOrder,
  } = useQuery({
    queryKey: ["order", id as string],
    queryFn: () => getOrderById(id as string),
  });

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery({
    queryKey: ["user", order?.user.uid],
    queryFn: () => getOneUser(order?.user.uid || ""),
    enabled: !!order,
  });

  if (isLoadingOrder || isLoadingUser) {
    return (
      <EmptyWrapper>
        <CircularProgress size="32px" />
      </EmptyWrapper>
    );
  }

  if (!order || !user || isErrorOrder || isErrorUser) {
    return <NotFound />;
  }

  const tax = order.totalPrice ? order.totalPrice * 0.15 : 0;
  const shipmentCost = 0;
  const grandTotal = order.totalPrice
    ? order.totalPrice + tax + shipmentCost
    : 0;

  return (
    <InvoiceCard.Container>
      <IconButton
        onClick={() => router.back()}
        sx={{
          width: "max-content",
        }}
      >
        <ArrowBack />
      </IconButton>
      {/* Head Invoice */}
      <Grid container justifyContent="space-between">
        <Grid>
          <InvoiceCard.DetailsUser>
            <InvoiceCard.DetailsUserTitle>
              <Typography>Billed To</Typography>
            </InvoiceCard.DetailsUserTitle>
            <InvoiceCard.DetailsUserContent>
              <Typography>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography>{user.address}</Typography>
            </InvoiceCard.DetailsUserContent>
          </InvoiceCard.DetailsUser>
        </Grid>
        <Grid>
          <InvoiceCard.DetailsUser>
            <InvoiceCard.DetailsUserWrapper>
              <InvoiceCard.DetailsUserTitle>
                <Typography>Invoice Number</Typography>
              </InvoiceCard.DetailsUserTitle>
              <InvoiceCard.DetailsUserContent>
                <Typography>{order.id}</Typography>
              </InvoiceCard.DetailsUserContent>
            </InvoiceCard.DetailsUserWrapper>
            <InvoiceCard.DetailsUserWrapper>
              <InvoiceCard.DetailsUserTitle>
                <Typography>Date of Issue</Typography>
              </InvoiceCard.DetailsUserTitle>
              <InvoiceCard.DetailsUserContent>
                <Typography>
                  {order.createdAt
                    ? `${formatToHour(
                        order.createdAt.toString(),
                      )} - ${formatDate(order.createdAt.toString(), "short")}`
                    : "invalid date"}
                </Typography>
              </InvoiceCard.DetailsUserContent>
            </InvoiceCard.DetailsUserWrapper>
          </InvoiceCard.DetailsUser>
        </Grid>
      </Grid>

      {/* Table Here */}
      <Box
        component={Paper}
        boxShadow="none"
        width="100%"
        sx={{ overflowX: "auto" }}
      >
        <InvoiceTable data={order.products || []} />
      </Box>
      <InvoiceCard.TotalPayment>
        <InvoiceCard.MethodPayment>
          <Typography fontWeight="600">Virtual Account Billing</Typography>
          <InvoiceCard.Payment>
            <Image src={LogoBCA} width={64} alt="logo" />
            <InvoiceCard.PaymentText>
              <Typography>Bank BCA</Typography>
              <Typography>
                {Math.floor(
                  Math.random() * (999999999999 - 123456789012) + 123456789012,
                )}
              </Typography>
            </InvoiceCard.PaymentText>
          </InvoiceCard.Payment>
        </InvoiceCard.MethodPayment>
        <InvoiceCard.Total>
          {[
            { title: "Subtotal", value: order.totalPrice },
            { title: "Tax (15%)", value: tax },
            { title: "Shipment", value: shipmentCost },
            { title: "Grand Total", value: grandTotal ?? 0 },
          ].map((item, index) => (
            <Grid
              container
              justifyContent="space-between"
              gap="16px"
              key={index}
            >
              <Grid>
                <Typography fontWeight="600">{item.title}</Typography>
              </Grid>
              <Grid>
                <Typography>{formatPrice(item.value || 0)}</Typography>
              </Grid>
            </Grid>
          ))}
        </InvoiceCard.Total>
      </InvoiceCard.TotalPayment>
    </InvoiceCard.Container>
  );
};
