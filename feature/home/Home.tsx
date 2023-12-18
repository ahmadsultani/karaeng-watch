"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { getAllProduct } from "@/feature/product/service";

import { ProductCard } from "@/components/Card";
import { EmptyWrapper, ProductWrapper } from "@/components/Wrapper/styles";
import { TitleSection } from "@/components/Section/styles";

import { Hero } from "./Hero";

import { HighlightWrapper } from "./styles";

export const Home: React.FC = () => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
  });

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <main>
      <Hero />
      <HighlightWrapper>
        <TitleSection>
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
        </TitleSection>

        <ProductWrapper>
          {isLoadingProducts ? (
            <EmptyWrapper>
              <CircularProgress />
            </EmptyWrapper>
          ) : isErrorProducts ? (
            <EmptyWrapper>
              <Typography>{error.message}</Typography>
            </EmptyWrapper>
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <EmptyWrapper>
              <Typography>No Product Found</Typography>
            </EmptyWrapper>
          )}
        </ProductWrapper>

        <Button
          href="/product"
          sx={{ paddingInline: "32px" }}
          size={isMobile ? "small" : "medium"}
        >
          <Typography color="white" fontWeight={700}>
            See More
          </Typography>
        </Button>
      </HighlightWrapper>
    </main>
  );
};

export default Home;
