"use client";

import { ProductWrapper } from "@/components/ProductWrapper/ProductWrapper";
import { ProductPageWrapper, TitleBox } from "./styles";
import {
  Box,
  IconButton,
  Drawer,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useRef, useState } from "react";

interface FavoriteProps {}

export const Favorite: React.FC<FavoriteProps> = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);

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
        <TitleBox>
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
        </TitleBox>
        <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
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
        {/* Product Card List Here */}
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
          />
        </ProductWrapper>
      </ProductPageWrapper>
      <Drawer open={open && medium} anchor="top" onClose={() => setOpen(false)}>
        <TextField
          placeholder="Search"
          type="search"
          inputRef={inputRef}
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