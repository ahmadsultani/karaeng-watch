"use client";

import Image from "next/image";

import { HeroContent, HeroContentText, HeroImage, HeroWrapper } from "./styles";
import { Button, Typography } from "@mui/material";

import { ArrowForward } from "@mui/icons-material";

export const Hero: React.FC = () => {
  return (
    <HeroWrapper id="hero">
      <HeroContent>
        <HeroContentText>
          <Typography fontSize="64px" color="white">
            Your Time, Your Style,{" "}
            <Typography component="span" fontSize="64px" color="primary.main">
              Our Watches
            </Typography>
          </Typography>
          <Typography fontSize="20" color="white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatibus, voluptas, voluptatem, quae quos quia quibusdam
            voluptatum eum quas fugit consequatur? Quisquam voluptatibus,
            voluptas, voluptatem, quae quos quia quibusdam voluptatum eum quas
            fugit consequatur?
          </Typography>
        </HeroContentText>

        <Button variant="text" endIcon={<ArrowForward />}>
          <Typography fontSize="18px">See Products</Typography>
        </Button>
      </HeroContent>
      <HeroImage>
        <Image src="/images/hero.png" alt="hero" fill priority />
      </HeroImage>
    </HeroWrapper>
  );
};
