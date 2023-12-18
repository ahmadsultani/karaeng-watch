import { getOneProduct } from "@/feature/product/service";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";

const ProductEdit = dynamic(() => import("@/feature/product/ProductEdit"));

export default async function AdminProductEditPage({
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
      <ProductEdit />
    </HydrationBoundary>
  );
}
