"use client";

import { IconButton, Link } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/constants/navLinks";
import { Wrappper, Menu } from "./styles";
import { useEffect, useState } from "react";
import {
  FavoriteBorder,
  PersonOutline,
  Search,
  ShoppingBasket,
} from "@mui/icons-material";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [notOnHero, setNotOnHero] = useState(true);

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

  return (
    <Wrappper notOnHero={notOnHero}>
      <Menu>
        {navLinks.map(({ href, name }) => (
          <Link
            key={href}
            fontSize="14px"
            color={pathname === href ? "primary.main" : "white"}
            href={href}
          >
            {name}
          </Link>
        ))}
      </Menu>
      <Link
        href="/"
        fontWeight="bold"
        fontSize="28px"
        color="white"
        underline="none"
      >
        KARAENG WATCH
      </Link>
      <Menu>
        <IconButton onClick={() => {}}>
          <Search htmlColor="white" />
        </IconButton>
        <IconButton onClick={() => router.push("/cart")}>
          <ShoppingBasket htmlColor="white" />
        </IconButton>
        <IconButton onClick={() => router.push("/favorite")}>
          <FavoriteBorder htmlColor="white" />
        </IconButton>
        <IconButton onClick={() => router.push("/setting")}>
          <PersonOutline htmlColor="white" />
        </IconButton>
      </Menu>
    </Wrappper>
  );
};
