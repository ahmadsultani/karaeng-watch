import { getAllProduct } from "@/feature/product";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";

const ProductAdmin = dynamic(() => import("@/feature/product/ProductAdmin"));

export default async function AdminProductPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductAdmin />
    </HydrationBoundary>
  );
}
