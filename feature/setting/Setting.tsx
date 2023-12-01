"use client";

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
} from "@mui/material";
import { Logout, Person, SupportAgent } from "@mui/icons-material";
import {
  SettingLabel,
  SettingProfile,
  SettingList,
  SettingWrapper,
} from "./styles";
interface SettingProps {}

export const Setting: React.FC<SettingProps> = () => {
  const small = useMediaQuery("(max-width:768px)");
  const medium = useMediaQuery("(max-width:1024px)");

  return (
    <SettingWrapper>
      <SettingProfile>
        <Avatar sx={{ width: 94, height: 94 }} />
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography
            textAlign={"center"}
            fontSize={"18px"}
            color={"secondary.main"}
          >
            andi m. fadhilul asyam hafid{" "}
          </Typography>
          <Typography
            textAlign={"center"}
            sx={{
              wordBreak: "break-word",
            }}
            fontSize={"14px"}
            color={"gray"}
          >
            JohnDoe@gmail.comhvsdjhhjsghojofhtdyguhijokp[l]
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
