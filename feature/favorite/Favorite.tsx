"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { ProductCard } from "@/components/Card/ProductCard";
import { EmptyWrapper, ProductWrapper } from "@/components/Wrapper/styles";
import { TitleSection } from "@/components/Section/styles";

import { ProductPageWrapper } from "./styles";

import SearchIcon from "@mui/icons-material/Search";
import { getAllFavoriteProduct } from "./services";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "@/hooks/useDebounce";

interface FavoriteProps {}

export const Favorite: React.FC<FavoriteProps> = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error,
  } = useQuery({
    queryKey: ["favorite"],
    queryFn: () => getAllFavoriteProduct(),
  });

  const filteredProducts = useMemo(
    () =>
      products?.filter(
        (product) =>
          product.name.toLowerCase().includes(debouncedSearch) ||
          product.description?.toLowerCase().includes(debouncedSearch),
      ),
    [products, debouncedSearch],
  );

  const handleFocus = () => {
    setOpen(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };
  const small = useMediaQuery("(max-width:768px)");
  const medium = useMediaQuery("(max-width:1024px)");

  useEffect(() => {
    if (!medium) {
      setOpen(false);
    }
  }, [medium]);

  return (
    <>
      <ProductPageWrapper>
        <TitleSection>
          <Typography
            textAlign={"center"}
            fontSize={small ? "18px" : "32px"}
            fontWeight={"700"}
          >
            YOUR FAVORITE
          </Typography>
          <Typography textAlign={"center"} fontSize={small ? "14px" : "24px"}>
            Explore Your Exquisite Choice
          </Typography>
        </TitleSection>
        <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
          {medium ? (
            <IconButton onClick={handleFocus}>
              <SearchIcon />
            </IconButton>
          ) : (
            <TextField
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          )}
        </Box>
        {/* Product Card List Here */}
        <ProductWrapper>
          {isLoadingProducts ? (
            <EmptyWrapper>
              <CircularProgress />
            </EmptyWrapper>
          ) : isErrorProducts ? (
            <EmptyWrapper>
              <Typography>{error.message}</Typography>
            </EmptyWrapper>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <EmptyWrapper>
              <Typography>No Product Found</Typography>
            </EmptyWrapper>
          )}
        </ProductWrapper>
      </ProductPageWrapper>
      <Drawer open={open && medium} anchor="top" onClose={() => setOpen(false)}>
        <TextField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search"
          type="search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Drawer>
    </>
  );
};
