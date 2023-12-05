import { getAllBrand } from "@/feature/brand";
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
      <BrandAdmin />
    </HydrationBoundary>
  );
}
