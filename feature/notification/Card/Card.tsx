import { useState } from "react";

import { Modal } from "@/components/Modal";

import * as NotificationCard from "../styles";
import { Typography } from "@mui/material";
import { formatDate, formatToHour } from "@/utils/formatter";

interface CardProps {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  onMarkAsRead: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  time,
  read,
  onMarkAsRead,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  return (
    <NotificationCard.Item
      isRead={read}
      onClick={() => setIsPopupVisible(true)}
    >
      <NotificationCard.Content>
        <NotificationCard.ItemDate>
          {formatToHour(time)} {formatDate(time, "full")}
        </NotificationCard.ItemDate>
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
          onComplete={() => {
            onMarkAsRead();
            setIsPopupVisible(false);
          }}
          onClose={() => setIsPopupVisible(false)}
        >
          <Typography fontSize="12px">{description}</Typography>
        </Modal>
      )}
    </NotificationCard.Item>
  );
};
