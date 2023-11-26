"use client";

import { Button, Typography, useMediaQuery } from "@mui/material";

import { Hero } from "./Hero";

import { ProductCard } from "@/components/ProductCard";
import { ProductWrapper } from "@/components/ProductWrapper";

import { TitleBox } from "@/feature/product/styles";
import { HighlightWrapper } from "./styles";

export const Home: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <main>
      <Hero />
      <HighlightWrapper>
        <TitleBox>
          <Typography
            textAlign={"center"}
            fontSize={isMobile ? "18px" : "32px"}
            fontWeight={"700"}
          >
            KARAENG WATCH PRODUCTS
          </Typography>
          <Typography
            textAlign={"center"}
            fontSize={isMobile ? "14px" : "24px"}
          >
            Get Your Own KaraengWatch Now!
          </Typography>
        </TitleBox>
        <ProductWrapper>
          <ProductCard
            name="Centrix Automatic Diamonds"
            price={43460000}
            gender="Male"
            typesId="Automatic"
            braceletMaterial=""
            caseMaterial=""
            caseThickness={12}
            movementReference=""
            width={39.5}
            height={39.5}
            stock={234}
            thumbnail=""
            category={{ id: "123", name: "this is ctegory" }}
            imgGallery={["asdad"]}
            brand={{ id: "123", name: "this is brand" }}
          />{" "}
          <ProductCard
            name="Centrix Automatic Diamonds"
            price={43460000}
            gender="Male"
            typesId="Automatic"
            braceletMaterial=""
            caseMaterial=""
            caseThickness={12}
            movementReference=""
            width={39.5}
            height={39.5}
            stock={234}
            thumbnail=""
            category={{ id: "123", name: "this is ctegory" }}
            imgGallery={["asdad"]}
            brand={{ id: "123", name: "this is brand" }}
          />
          <ProductCard
            name="Centrix Automatic Diamonds"
            price={43460000}
            gender="Male"
            typesId="Automatic"
            braceletMaterial=""
            caseMaterial=""
            caseThickness={12}
            movementReference=""
            width={39.5}
            height={39.5}
            stock={234}
            thumbnail=""
            category={{ id: "123", name: "this is ctegory" }}
            imgGallery={["asdad"]}
            brand={{ id: "123", name: "this is brand" }}
          />
        </ProductWrapper>

        <Button href="/product" sx={{ paddingInline: "32px" }}>
          <Typography fontSize="24px" color="white" fontWeight={700}>
            See More
          </Typography>
        </Button>
      </HighlightWrapper>
    </main>
  );
};
