"use client";

import React, { useEffect, useState } from "react";
import * as Styles from "./styles";
import Typography from "@mui/material/Typography/Typography";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import GridViewIcon from "@mui/icons-material/GridView";
import { SideBarItem } from "./SideBarItem";
import {
  Checklist,
  Inventory,
  Person,
  Sell,
  SupportAgent,
} from "@mui/icons-material";
import { usePathname, useSearchParams } from "next/navigation";
import { IUser } from "@/interfaces/user";
import Cookies from "js-cookie";
import Link from "next/link";

interface AdminSidebarProps {
  ignoreMedia?: boolean;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  ignoreMedia = false,
}) => {
  const [user, setUser] = useState<IUser>();

  const pathname = usePathname();
  const params = useSearchParams();

  const medium = useMediaQuery("(max-width:1024px)");

  useEffect(() => {
    const userCookies = Cookies.get("user");
    userCookies && setUser(JSON.parse(userCookies) as IUser);
  }, []);

  const SideBarMenuList = [
    {
      name: "Dashboard",
      icon: <GridViewIcon />,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      name: "User",
      icon: <Person />,
      href: "/admin/user",
      active: pathname.startsWith("/admin/user"),
    },
    {
      name: "Brand",
      icon: <Sell />,
      href: "/admin/brand",
      active: pathname.startsWith("/admin/brand"),
    },
    {
      name: "Product",
      icon: <Inventory />,
      href: "/admin/product",
      active: pathname.startsWith("/admin/product"),
    },
    {
      name: "Order",
      icon: <Checklist />,
      nested: true,
      option: [
        {
          optionhref: "/admin/order?status=waiting",
          optionlabel: "Waiting Confirmation",
          optionActive:
            pathname.startsWith("/admin/order") &&
            params.get("status") === "waiting",
        },
        {
          optionhref: "/admin/order?status=delivered",
          optionlabel: "Delivered",
          optionActive:
            pathname.startsWith("/admin/order") &&
            params.get("status") === "delivered",
        },
        {
          optionhref: "/admin/order?status=done",
          optionlabel: "Done",
          optionActive:
            pathname.startsWith("/admin/order") &&
            params.get("status") === "done",
        },
        {
          optionhref: "/admin/order?status=canceled",
          optionlabel: "Canceled",
          optionActive:
            pathname.startsWith("/admin/order") &&
            params.get("status") === "canceled",
        },
      ],
      active: pathname.startsWith("/admin/order"),
    },
    {
      name: "Customer Service",
      icon: <SupportAgent />,
      href: "/admin/customer-service",
      active: pathname.startsWith("/admin/customer-service"),
    },
  ];
  return (
    <Styles.SidebarContainer
      sx={{
        display: ignoreMedia ? "flex" : medium ? "none" : "flex",
      }}
      position={"sticky"}
      top={0}
    >
      <Link href={"/"}>
        <Styles.SidebarHead>
          <Box height={"36px"} width={"36px"} position={"relative"}>
            <Image
              draggable={false}
              src={"/logos/logo-white.svg"}
              alt="product-images"
              fill
              priority
              objectFit="contain"
            />
          </Box>
          <Box display={"flex"}>
            <Typography fontSize={"20px"} color={"white"} fontWeight={"300"}>
              KARAENG
            </Typography>
            <Typography fontSize={"20px"} color={"primary"} fontWeight={"300"}>
              WATCH
            </Typography>
          </Box>
        </Styles.SidebarHead>
      </Link>
      <Styles.SidebarMenus
        sx={{
          overflowY: "auto",
        }}
      >
        {SideBarMenuList.map((menus, index) => {
          if (user?.role !== "super-admin" && menus.name === "User") {
            return null;
          }
          return (
            <SideBarItem
              navigate={menus.href}
              nested={menus.nested ? true : false}
              icon={menus.icon}
              key={index}
              option={menus.option}
              isActive={menus.active}
            >
              {menus.name}
            </SideBarItem>
          );
        })}
      </Styles.SidebarMenus>
    </Styles.SidebarContainer>
  );
};
