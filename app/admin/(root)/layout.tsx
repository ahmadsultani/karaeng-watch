"use client";

import { AdminSidebar } from "@/components/AdminSidebar";
import { IUser } from "@/interfaces/user";
import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const userCookies = Cookies.get("user");
    userCookies && setUser(JSON.parse(userCookies) as IUser);
  }, []);

  const small = useMediaQuery("(max-width:768px)");
  const medium = useMediaQuery("(max-width:1024px)");

  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen && medium}
        onClose={() => setDrawerOpen(false)}
      >
        <AdminSidebar ignoreMedia />
      </Drawer>
      <Box display={"flex"} width="100vw">
        <AdminSidebar />
        <Box
          display={"flex"}
          position={"relative"}
          flexDirection={"column"}
          width={medium ? "100%" : "calc(100% - 248px)"}
        >
          <AppBar
            position="sticky"
            sx={{
              width: "100%",
              top: "0",
              backgroundColor: "white",
            }}
          >
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: medium ? "space-between" : "flex-end",
              }}
            >
              <IconButton
                sx={{ display: medium ? "flex" : "none" }}
                size="large"
                edge="start"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu />
              </IconButton>
              <Box
                sx={{
                  justifySelf: "center",
                }}
              >
                <Box display={"flex"} alignItems={"center"} gap={"12px"}>
                  <Typography>
                    {user?.role === "admin" ? "Hi Admin!" : "Hi Super Admin!"}
                  </Typography>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            width={"100%"}
            padding={small ? "16px" : medium ? "24px" : "32px"}
            overflow={"hidden"}
            sx={{
              flex: 1,
              overflow: "auto",
              wordBreak: "break-word",
              wordWrap: "break-word",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
