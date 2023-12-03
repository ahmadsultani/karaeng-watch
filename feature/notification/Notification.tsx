"use client";

import * as React from "react";
import { Container, Wrapper } from "./styles";
import { Card } from "./Card/Card";
import { notification as fakeNotificationData } from "./fakeNotificationData";
import { Typography } from "@mui/material";

export const Notification = () => {
  const [notifications, setNotifications] =
    React.useState(fakeNotificationData);

  const handleMarkAsRead = (id: number) => {
    const updatedNotifications = notifications.map((item) =>
      item.id === id ? { ...item, read: true } : item,
    );
    setNotifications(updatedNotifications);
  };

  return (
    <Container>
      <Typography ml="16px" textAlign="left" variant="h4">
        Recent Updates
      </Typography>
      <Wrapper>
        {notifications.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.notification.title}
            description={item.notification.description}
            time={item.notification.time}
            read={item.notification.read}
            onMarkAsRead={handleMarkAsRead}
          />
        ))}
      </Wrapper>
    </Container>
  );
};
