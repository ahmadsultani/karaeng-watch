"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ProductCard } from "@/components/Card";
import { EmptyWrapper, ProductWrapper } from "@/components/Wrapper/styles";
import { TitleSection } from "@/components/Section/styles";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";

import { getAllProductByParams } from "./service";

import { FilterDrawer, SearchDrawer } from "./components/Drawer";
import { ProductPageWrapper } from "./styles";
import useDebounce from "@/hooks/useDebounce";
import { TProductParams } from ".";
import { Close } from "@mui/icons-material";
import { getAllBrand } from "../brand";

export const Product: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const [filter, setFilter] = useState<TProductParams>({});

  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error,
  } = useQuery({
    queryKey: ["product", filter],
    queryFn: () => getAllProductByParams(filter),
  });

  const { data: brands, isLoading: isLoadingBrands } = useQuery({
    queryKey: ["brand"],
    queryFn: getAllBrand,
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
      <TitleSection>
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
      </TitleSection>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display="flex" alignItems="center" gap="8px">
          <IconButton
            onClick={() => setOpen(true)}
            disabled={!brands || isLoadingBrands}
          >
            <TuneIcon />
          </IconButton>
          {Object.keys(filter).length > 0 && (
            <Button
              variant="text"
              onClick={() => setFilter({})}
              endIcon={<Close />}
            >
              Clear Filter
            </Button>
          )}
        </Box>
        {medium ? (
          <IconButton onClick={handleFocus}>
            <SearchIcon />
          </IconButton>
        ) : (
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

      {brands && (
        <FilterDrawer
          brands={brands}
          filter={filter}
          setFilter={setFilter}
          open={open}
          onClose={() => setOpen(false)}
        />
      )}

      <SearchDrawer
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        inputRef={inputRef}
      />
    </ProductPageWrapper>
  );
};

export default Product;
