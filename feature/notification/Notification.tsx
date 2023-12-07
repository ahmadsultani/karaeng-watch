"use client";

import * as React from "react";
import { Container, Wrapper } from "./styles";
import { Card } from "./Card/Card";
import { CircularProgress, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllNotification, markNotificationAsViewed } from "./service";
import { EmptyWrapper } from "@/components/Wrapper/styles";
import Cookies from "js-cookie";
import { IUser } from "@/interfaces/user";

export const Notification = () => {
  const queryClient = useQueryClient();
  const userCookie = Cookies.get("user");
  const user = userCookie ? (JSON.parse(userCookie) as IUser) : undefined;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notification", user?.uid],
    queryFn: getAllNotification,
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["notification"],
    mutationFn: markNotificationAsViewed,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification"],
      });
    },
  });

  const handleMarkAsRead = async (id: string) => {
    await mutateAsync(id);
  };

  return (
    <Container>
      <Typography ml="16px" textAlign="left" fontSize="32px">
        Recent Updates
      </Typography>
      <Wrapper>
        {isLoading ? (
          <EmptyWrapper>
            <CircularProgress />
          </EmptyWrapper>
        ) : isError ? (
          <EmptyWrapper>
            <Typography>{error.message}</Typography>
          </EmptyWrapper>
        ) : data && data.length > 0 ? (
          data.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              time={item.createdAt}
              read={item.isViewed}
              onMarkAsRead={() => handleMarkAsRead(item.id)}
            />
          ))
        ) : (
          <EmptyWrapper>
            <Typography>No Notifications at the moment! </Typography>
          </EmptyWrapper>
        )}
      </Wrapper>
    </Container>
  );
};
