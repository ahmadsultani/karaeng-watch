import { getAllBrand } from "@/feature/brand";
import OrderAdmin from "@/feature/order/OrderAdmin";
import { Box, Typography } from "@mui/material";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";

const BrandAdmin = dynamic(() => import("@/feature/brand/BrandAdmin"));

export default async function AdminProductPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["brand"],
    queryFn: getAllBrand,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h4">Order</Typography>
        <OrderAdmin />
        <Typography variant="h4">Brand</Typography>
        <BrandAdmin />
      </Box>
    </HydrationBoundary>
  );
}
