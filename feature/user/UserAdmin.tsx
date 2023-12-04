"use client";

import { Modal } from "@/components/Modal";
import { AdminWrapper, EmptyWrapper } from "@/components/Wrapper/styles";
import { CircularProgress, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { UserTable } from "./components/UserTable";
import { getAllUser, setUserToAdmin, setDemoteAdmin } from ".";
import { IUser } from "@/interfaces/user";

enum EUserStatus {
  LOADING,
  ERROR,
  SUCCESS,
}

export const UserAdmin: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    data: users,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getAllUser,
  });

  const { mutateAsync: mutateAsyncSignAsAdmin } = useMutation({
    mutationKey: ["user"],
    mutationFn: setUserToAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(`User "${isOpenSignAsAdmin?.firstName}" Signed As Admin`);
      setIsOpenSignAsAdmin(undefined);
    },
    onError: (error) => {
      toast.error(error?.message || "Unknown Error");
    },
  });
  const { mutateAsync: mutateAsyncDemoteAdmin } = useMutation({
    mutationKey: ["user"],
    mutationFn: setDemoteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(
        `User "${isOpenSignAsAdmin?.firstName}" Removed From Admin`,
      );
      setIsOpenDemoteAdmin(undefined);
    },
    onError: (error) => {
      toast.error(error?.message || "Unknown Error");
    },
  });

  const [isOpenSignAsAdmin, setIsOpenSignAsAdmin] = useState<IUser>();
  const [isOpenDemoteAdmin, setIsOpenDemoteAdmin] = useState<IUser>();

  const renderContent = (status: EUserStatus) => {
    switch (status) {
      case EUserStatus.LOADING:
        return (
          <EmptyWrapper>
            <CircularProgress />
          </EmptyWrapper>
        );
      case EUserStatus.ERROR:
        toast.error(error?.name || "Unknown Error");

        return (
          <EmptyWrapper>
            <p>{error?.message || "Error Occurred, try to refresh the page"}</p>
          </EmptyWrapper>
        );
      case EUserStatus.SUCCESS:
        return (
          <AdminWrapper>
            <UserTable
              data={users || []}
              toggleSignAsAdmin={setIsOpenSignAsAdmin}
              toggleDemoteAdmin={setIsOpenDemoteAdmin}
            />
            {!!isOpenSignAsAdmin && (
              <Modal
                type="edit"
                isOpen={!!isOpenSignAsAdmin}
                onClose={() => setIsOpenSignAsAdmin(undefined)}
                onComplete={() => {
                  const { uid, ...userData } = isOpenSignAsAdmin || {};
                  mutateAsyncSignAsAdmin({ uid: uid || "", user: userData });
                }}
                title="Sign As Admin"
              >
                <Typography textAlign="center">
                  Are You Sure You Want To Sign &quot;
                  {isOpenSignAsAdmin.firstName}&quot; as Admin?
                </Typography>
              </Modal>
            )}
            {!!isOpenDemoteAdmin && (
              <Modal
                type="edit"
                isOpen={!!isOpenDemoteAdmin}
                onClose={() => setIsOpenDemoteAdmin(undefined)}
                onComplete={() => {
                  const { uid, ...userData } = isOpenDemoteAdmin || {};
                  mutateAsyncDemoteAdmin({ uid: uid || "", user: userData });
                }}
                title="Remove From Admin"
              >
                <Typography textAlign="center">
                  Are You Sure You Want To Remove &quot;
                  {isOpenDemoteAdmin.firstName}&quot; from Admin?
                </Typography>
              </Modal>
            )}
          </AdminWrapper>
        );
    }
  };

  return renderContent(
    isLoadingUser
      ? EUserStatus.LOADING
      : isErrorUser
      ? EUserStatus.ERROR
      : EUserStatus.SUCCESS,
  );
};

export default UserAdmin;
