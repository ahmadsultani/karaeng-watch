import { getOneUser } from "@/feature/user";
import firebase from "firebase/compat/app";
import Cookies from "js-cookie";
import {
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { formatToDay } from "@/utils/formatter";
import { IUser } from "@/interfaces/user";
import { CircleBox } from "./styles";

interface ChatUserListItemProps {
  id: string;
  lastMessage: string;
  date: firebase.firestore.Timestamp;
  senderId: string;
  onClick: () => void;
}

export const ChatUserListItem: React.FC<ChatUserListItemProps> = ({
  id,
  lastMessage,
  date,
  senderId,
  onClick,
}) => {
  const user = JSON.parse(Cookies.get("user") || "{}") as IUser;

  const [customer, setCustomer] = useState<IUser>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getOneUser(id);
        setCustomer(user);
      } catch (error) {}
    };

    fetchUserData();
  }, [id]);

  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        borderRadius: "4px",
      }}
    >
      <ListItemAvatar>
        {customer ? (
          <Avatar src={customer.photoURL || ""}>
            {customer.firstName[0]}
            {customer.lastName[0]}
          </Avatar>
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        )}
      </ListItemAvatar>
      <Box display={"flex"} width={"100%"} flexDirection={"column"}>
        <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography fontSize={"14px"}>
              {customer ? (
                `${customer.firstName} ${customer.lastName}`
              ) : (
                <Skeleton width="160px" />
              )}
            </Typography>
            <Typography display={"flex"} fontSize={"12px"} fontWeight={300}>
              {user.uid === senderId && (
                <Typography fontSize={"12px"} fontWeight={500}>
                  You:&nbsp;
                </Typography>
              )}
              {lastMessage}
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
          >
            <Typography fontSize={"10px"}>
              {formatToDay(String(date.toDate()))}
            </Typography>
            {user.uid !== senderId && <CircleBox>&nbsp;</CircleBox>}
          </Box>
        </Box>
      </Box>
    </ListItemButton>
  );
};
