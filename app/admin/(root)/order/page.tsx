import { getAllOrders } from "@/feature/order/service";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";

const OrderAdmin = dynamic(() => import("@/feature/order/OrderAdmin"));

export default async function AdminOrderPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["order"],
    queryFn: getAllOrders,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrderAdmin />
    </HydrationBoundary>
  );
}
