"use client";

import { useEffect, useRef, useState } from "react";
import { ProductPageWrapper, TitleBox } from "./styles";
import { useQuery } from "@tanstack/react-query";

import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ProductWrapper } from "@/components/ProductWrapper/ProductWrapper";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { EmptyWrapper } from "@/components/Wrapper/styles";
import toast from "react-hot-toast";

import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

import { getAllProduct } from "./service";

import { FilterDrawer, SearchDrawer } from "./components/Drawer";

export const Product: React.FC = () => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
  });

  const [open, setOpen] = useState(false);

  const small = useMediaQuery("(max-width:768px)");
  const medium = useMediaQuery("(max-width:1024px)");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [openSearch, setOpenSearch] = useState(false);

  const handleFocus = () => {
    setOpenSearch(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  useEffect(() => {
    if (!medium) {
      setOpenSearch(false);
    }
  }, [medium]);

  useEffect(() => {
    if (isErrorProducts) {
      toast.error(error?.message || "Unknown Error");
    }
  }, [isErrorProducts, error]);

  return (
    <ProductPageWrapper>
      <TitleBox>
        <Typography
          textAlign={"center"}
          fontSize={small ? "18px" : "32px"}
          fontWeight={"700"}
        >
          KARAENG WATCH PRODUCTS
        </Typography>
        <Typography textAlign={"center"} fontSize={small ? "14px" : "24px"}>
          Get Your Own KaraengWatch Now!
        </Typography>
      </TitleBox>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <IconButton onClick={() => setOpen(true)}>
          <TuneIcon />
        </IconButton>
        {medium ? (
          <IconButton onClick={handleFocus}>
            <SearchIcon />
          </IconButton>
        ) : (
          <TextField
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
        )}
      </Box>

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

      <FilterDrawer open={open} onClose={() => setOpen(false)} />

      <SearchDrawer
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        inputRef={inputRef}
      />
    </ProductPageWrapper>
  );
};

export default Product;
