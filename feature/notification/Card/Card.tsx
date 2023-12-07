import { useState } from "react";

import { Modal } from "@/components/Modal";

import * as NotificationCard from "../styles";
import { Typography } from "@mui/material";

interface CardProps {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  onMarkAsRead: (id: number) => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  time,
  read,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <NotificationCard.Item
      isRead={read}
      onClick={() => setIsPopupVisible(true)}
    >
      <NotificationCard.Content>
        <NotificationCard.ItemDate>{time}</NotificationCard.ItemDate>
        <NotificationCard.ItemTitle>{title}</NotificationCard.ItemTitle>
        <NotificationCard.ItemDescription>
          {description}
        </NotificationCard.ItemDescription>
      </NotificationCard.Content>
      <NotificationCard.Circle isRead={read}></NotificationCard.Circle>

      {isPopupVisible && (
        <Modal
          isOpen={isPopupVisible}
          title={title}
          type="ok"
          onComplete={() => setIsPopupVisible(false)}
          onClose={() => setIsPopupVisible(false)}
        >
          <Typography fontSize="12px">{description}</Typography>
        </Modal>
      )}
    </NotificationCard.Item>
  );
};
