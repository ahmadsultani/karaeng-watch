"use client";

import React from "react";
import * as Styles from "./styles";
import Typography from "@mui/material/Typography/Typography";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";
import GridViewIcon from "@mui/icons-material/GridView";
import { SideBarItem } from "./SideBarItem";
import { Inventory, Person, Sell } from "@mui/icons-material";
import { usePathname, useSearchParams } from "next/navigation";

interface AdminSidebarProps {
  ignoreMedia?: boolean;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  ignoreMedia = false,
}) => {
  const pathname = usePathname();
  const params = useSearchParams();

  const medium = useMediaQuery("(max-width:1024px)");

  const SideBarMenuList = [
    {
      name: "Dashboard",
      icon: <GridViewIcon />,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      name: "Product",
      icon: <Inventory />,
      href: "/admin/product",
      active: pathname === "/admin/product",
    },
    {
      name: "User",
      icon: <Person />,
      href: "/admin/user",
      active: pathname === "/admin/user",
    },
    {
      name: "Order",
      icon: <Sell />,
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
  ];
  return (
    <Styles.SidebarContainer
      sx={{
        display: ignoreMedia ? "flex" : medium ? "none" : "flex",
      }}
      position={"sticky"}
      top={0}
    >
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
        <Typography fontSize={"24px"} color={"white"} fontWeight={"300"}>
          KARAENGWATCH
        </Typography>
      </Styles.SidebarHead>
      <Styles.SidebarMenus
        sx={{
          overflowY: "auto",
        }}
      >
        {SideBarMenuList.map((menus, index) => (
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
        ))}
      </Styles.SidebarMenus>
    </Styles.SidebarContainer>
  );
};
