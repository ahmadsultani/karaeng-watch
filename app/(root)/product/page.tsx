import { getAllProduct } from "@/feature/product";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
const Product = dynamic(() => import("@/feature/product/Product"));

export default async function ProductPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Product />
    </HydrationBoundary>
  );
}
