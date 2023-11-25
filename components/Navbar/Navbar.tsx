"use client";

import { Link } from "@mui/material";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/navLinks";
import { Wrappper, Menu } from "./styles";
import { useEffect, useState } from "react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();

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
    </Wrappper>
  );
};
