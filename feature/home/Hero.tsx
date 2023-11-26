"use client";

import Image from "next/image";

import { HeroContent, HeroContentText, HeroImage, HeroWrapper } from "./styles";
import { Button, Typography, useMediaQuery } from "@mui/material";

import { ArrowForward } from "@mui/icons-material";

export const Hero: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <HeroWrapper id="hero">
      <HeroContent>
        <HeroContentText>
          <Typography variant="h1" color="white">
            Your Time, Your Style,{" "}
            <Typography
              component="span"
              fontSize="inherit"
              color="primary.main"
            >
              Our Watches
            </Typography>
          </Typography>
          <Typography color="white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatibus, voluptas, voluptatem, quae quos quia quibusdam
            voluptatum eum quas fugit consequatur? Quisquam voluptatibus,
            voluptas, voluptatem, quae quos quia quibusdam voluptatum eum quas
            fugit consequatur?
          </Typography>
        </HeroContentText>

        <Button
          href="/product"
          variant="text"
          endIcon={<ArrowForward fontSize="large" />}
          sx={{ fontSize: "1.2em" }}
        >
          See Products
        </Button>
      </HeroContent>

      {!isMobile && (
        <HeroImage>
          <Image src="/images/hero.png" alt="hero" fill priority />
        </HeroImage>
      )}
    </HeroWrapper>
  );
};
