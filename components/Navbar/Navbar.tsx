"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { navLinks } from "@/constants/navLinks";

import {
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Wrapper, Menu, DrawerContainer, DrawerCloseButton } from "./styles";

import {
  ChatOutlined,
  Close,
  FavoriteBorder,
  Menu as MenuIcon,
  NotificationsOutlined,
  PersonOutline,
  ShoppingBasket,
} from "@mui/icons-material";
import Link from "next/link";
import { COLORS } from "@/constants/colors";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const [notOnHero, setNotOnHero] = useState(true);
  const onHome = pathname === "/";

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledY = window.scrollY;
      const heroSection = document.getElementById("hero")?.offsetHeight;

      heroSection && setNotOnHero(scrolledY > heroSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setNotOnHero(pathname !== "/");
  }, [pathname]);

  useEffect(() => {
    if (!isMobile) {
      setIsOpenDrawer(false);
    }
  }, [isMobile]);

  return (
    <Wrapper
      notonhero={JSON.stringify(notOnHero)}
      position={onHome ? "fixed" : "sticky"}
    >
      {isMobile ? (
        <div>
          <IconButton onClick={() => setIsOpenDrawer(true)}>
            <MenuIcon htmlColor="white" />
          </IconButton>
        </div>
      ) : (
        <Menu>
          {navLinks.map(({ href, name }) => (
            <Link key={href} href={href} shallow>
              <Typography
                fontSize="16px"
                color={pathname === href ? "primary.main" : "white"}
              >
                {name}
              </Typography>
            </Link>
          ))}
        </Menu>
      )}
      {!isTablet && (
        <Link href="/" shallow style={{ flex: 1 }}>
          <Typography
            fontWeight="bold"
            fontSize="28px"
            color="white"
            textAlign="center"
          >
            KARAENG WATCH
          </Typography>
        </Link>
      )}
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={() => router.push("/customer-service")}>
          <ChatOutlined
            htmlColor={`
                      ${
                        pathname.startsWith("/customer-service")
                          ? COLORS.primary
                          : "white"
                      }
                      `}
          />
        </IconButton>
        <IconButton onClick={() => router.push("/notification")}>
          <NotificationsOutlined
            htmlColor={`
            ${pathname.startsWith("/notification") ? COLORS.primary : "white"}
            `}
          />
        </IconButton>
        <IconButton onClick={() => router.push("/cart")}>
          <ShoppingBasket
            htmlColor={`
          ${pathname.startsWith("/cart") ? COLORS.primary : "white"}
          `}
          />
        </IconButton>
        <IconButton onClick={() => router.push("/favorite")}>
          <FavoriteBorder
            htmlColor={`
          ${pathname === "/favorite" ? COLORS.primary : "white"}
          `}
          />
        </IconButton>
        <IconButton onClick={() => router.push("/setting")}>
          <PersonOutline
            htmlColor={`
          ${pathname.startsWith("/setting") ? COLORS.primary : "white"}
          `}
          />
        </IconButton>
      </Box>

      {isOpenDrawer && (
        <Drawer
          anchor="left"
          open={isOpenDrawer}
          onClose={() => setIsOpenDrawer(false)}
        >
          <DrawerContainer>
            {navLinks.map(({ href, name }) => (
              <Button key={href} variant="text" fullWidth>
                <Link href={href} shallow>
                  <Typography
                    fontSize="20px"
                    color="white"
                    onClick={() => setIsOpenDrawer(false)}
                  >
                    {name}
                  </Typography>
                </Link>
              </Button>
            ))}
            <DrawerCloseButton onClick={() => setIsOpenDrawer(false)}>
              <Close htmlColor="white" />
            </DrawerCloseButton>
          </DrawerContainer>
        </Drawer>
      )}
    </Wrapper>
  );
};
