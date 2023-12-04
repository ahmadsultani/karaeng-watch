import { getAllUser } from "@/feature/user";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";

const UserAdmin = dynamic(() => import("@/feature/user/UserAdmin"));

export default async function AdminProductPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getAllUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserAdmin />
    </HydrationBoundary>
  );
}
