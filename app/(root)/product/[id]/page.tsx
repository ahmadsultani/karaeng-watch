import { getOneProduct } from "@/feature/product";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";

const ProductDetail = dynamic(() => import("@/feature/product/ProductDetail"));

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  const { id } = params;

  await queryClient.prefetchQuery({
    queryKey: ["product", id],
    queryFn: () => getOneProduct(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail />
    </HydrationBoundary>
  );
}
