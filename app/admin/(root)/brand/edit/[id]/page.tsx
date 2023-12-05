import { getOneBrand } from "@/feature/brand";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
const BrandEdit = dynamic(() => import("@/feature/brand/BrandEdit"));

export default async function BrandProductEditPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  const { id } = params;

  await queryClient.prefetchQuery({
    queryKey: ["brand", id],
    queryFn: () => getOneBrand(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BrandEdit />
    </HydrationBoundary>
  );
}
