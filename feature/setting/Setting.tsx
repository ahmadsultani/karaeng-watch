"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  List,
  ListItemText,
  Divider,
  ListItemIcon,
  ListItemButton,
  Box,
  Icon,
  Avatar,
  Typography,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import { Logout, Person, SupportAgent } from "@mui/icons-material";

import {
  SettingLabel,
  SettingProfile,
  SettingList,
  SettingWrapper,
} from "./styles";

import { IUser } from "@/interfaces/user";
import toast from "react-hot-toast";
import { auth } from "@/config/firebase";

export const Setting: React.FC = () => {
  const [user, setUser] = useState<IUser>();
  const router = useRouter();

  const small = useMediaQuery("(max-width:768px)");
  const medium = useMediaQuery("(max-width:1024px)");

  useEffect(() => {
    const userCookies = Cookies.get("user");
    userCookies && setUser(JSON.parse(userCookies) as IUser);
  }, []);

  return (
    <SettingWrapper>
      <SettingProfile>
        {user ? (
          <Avatar sx={{ width: 94, height: 94 }} src={user.photoURL || ""}>
            {user.firstName[0]}
            {user.lastName[0]}
          </Avatar>
        ) : (
          <Skeleton variant="circular" width={94} height={94} />
        )}
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography
            textAlign={"center"}
            fontSize={"18px"}
            color={"secondary.main"}
          >
            {user ? (
              `${user.firstName} ${user.lastName}`
            ) : (
              <Skeleton variant="text" width={100} />
            )}
          </Typography>
          <Typography
            textAlign={"center"}
            sx={{
              wordBreak: "break-word",
            }}
            fontSize={"14px"}
            color={"gray"}
          >
            {user ? user.email : <Skeleton variant="text" width={80} />}
          </Typography>
        </Box>
      </SettingProfile>
      <List>
        {settingLists.map((setting) => (
          <>
            <ListItemButton
              sx={{
                padding: small ? "0" : medium ? "4px 8px" : "",
              }}
              href={setting.href}
            >
              <SettingList>
                <ListItemIcon>
                  <Icon>{setting.icon}</Icon>
                </ListItemIcon>
                <ListItemText>
                  <SettingLabel>{setting.label}</SettingLabel>
                </ListItemText>
              </SettingList>
            </ListItemButton>
            <Divider />
          </>
        ))}
        <ListItemButton
          onClick={async () => {
            await auth.signOut();
            Cookies.remove("user");
            toast.success("Logout succeed, see you!");
            router.push("/login");
          }}
          sx={{
            padding: small ? "0" : medium ? "4px 8px" : "",
          }}
        >
          <SettingList>
            <ListItemIcon>
              <Icon>
                <Logout />
              </Icon>
            </ListItemIcon>
            <ListItemText>
              <SettingLabel>Logout</SettingLabel>
            </ListItemText>
          </SettingList>
        </ListItemButton>
        <Divider />
      </List>
    </SettingWrapper>
  );
};

const settingLists = [
  {
    label: "Profile",
    href: "/setting/profile",
    icon: <Person />,
  },
  {
    label: "Customer Service",
    href: "/customer-service",
    icon: <SupportAgent />,
  },
];
