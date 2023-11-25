"use client";

import Image from "next/image";

import {
  Bottom,
  Header,
  HeaderContainer,
  Main,
  MainSection,
  StyledTextField,
} from "./styles";
import { Button, Link, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <footer>
      <Header>
        <HeaderContainer>
          <StyledTextField
            variant="outlined"
            color="primary"
            placeholder="Email Address"
          />
          <Button variant="text">
            <Typography component="span" fontSize="14px" color="white">
              Subscribe to our newsletter
            </Typography>
          </Button>
        </HeaderContainer>
        <HeaderContainer></HeaderContainer>
      </Header>
      <Main>
        <MainSection>
          <Typography fontSize={20} fontWeight="bold" color="primary.main">
            Top Brands{" "}
          </Typography>

          <Link color="white" fontSize={14}>
            KaraengPiece
          </Link>
          <Link color="white" fontSize={14}>
            Rolex
          </Link>
          <Link color="white" fontSize={14}>
            Luminor Panerai
          </Link>
          <Link color="white" fontSize={14}>
            Vanna
          </Link>
        </MainSection>

        <MainSection>
          <Typography fontSize={20} fontWeight="bold" color="primary.main">
            Services{" "}
          </Typography>

          <Link color="white" fontSize={14}>
            Care instructions
          </Link>
          <Link color="white" fontSize={14}>
            After sales services
          </Link>
          <Link color="white" fontSize={14}>
            FAQ
          </Link>
        </MainSection>

        <MainSection>
          <Typography fontSize={20} fontWeight="bold" color="primary.main">
            About Us
          </Typography>

          <Link color="white" fontSize={14}>
            Karaeng Watch
          </Link>
        </MainSection>

        <MainSection>
          <Typography fontSize={20} fontWeight="bold" color="primary.main">
            Our Company
          </Typography>

          <Link color="white" fontSize={14}>
            PT Karaeng Teknologi, Poros Malino Avanue 17, Gowa
          </Link>
        </MainSection>
      </Main>
      <Bottom>
        <Image src="/logos/logo-white.svg" alt="logo" width={36} height={36} />
        <Typography fontSize="16px" color="white">
          KARAENG
          <Typography component="span" fontSize="16px" color="primary.main">
            WATCH
          </Typography>
        </Typography>
      </Bottom>
    </footer>
  );
};
