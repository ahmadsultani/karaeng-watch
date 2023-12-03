"use client";

import { ProductWrapper } from "@/components/ProductWrapper/ProductWrapper";
import {
  DrawerContent,
  FilterCheckboxes,
  FilterLabel,
  FilterSection,
  ProductPageWrapper,
  TitleBox,
} from "./styles";
import {
  Box,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";

interface ProductProps {}

export const Product: React.FC<ProductProps> = () => {
  const [open, setOpen] = useState(false);
  const small = useMediaQuery("(max-width:768px)");
  const medium = useMediaQuery("(max-width:1024px)");
  let FilterText;
  if (small) {
    FilterText = 12;
  } else if (medium) {
    FilterText = 16;
  } else {
    FilterText = 18;
  }

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

  return (
    <>
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
          <ProductCard
            name="Centrix Automatic Diamonds"
            price={43460000}
            gender="Male"
            types="automatic"
          />
          <ProductCard
            name="Centrix Automatic Diamonds"
            price={43460000}
            gender="Male"
            types="automatic"
          />
        </ProductWrapper>
      </ProductPageWrapper>

      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DrawerContent>
          <FilterLabel>Filter</FilterLabel>
          <FilterSection>
            <FilterLabel>Based By Gender</FilterLabel>
            <FilterCheckboxes>
              <FormGroup>
                <FormControlLabel
                  value={"Male"}
                  control={<Checkbox />}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: FilterText },
                    "& .MuiFormControlLabel-label": { fontSize: FilterText },
                  }}
                  label="Male"
                />{" "}
                <FormControlLabel
                  value={"Female"}
                  control={<Checkbox />}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: FilterText },
                    "& .MuiFormControlLabel-label": { fontSize: FilterText },
                  }}
                  label="Female"
                />
              </FormGroup>
            </FilterCheckboxes>
          </FilterSection>
          <FilterSection>
            <FilterLabel>Based By Type</FilterLabel>
            <FilterCheckboxes>
              <FormGroup>
                <FormControlLabel
                  value={"Automatic"}
                  control={<Checkbox />}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: FilterText },
                    "& .MuiFormControlLabel-label": { fontSize: FilterText },
                  }}
                  label="Automatic"
                />
                <FormControlLabel
                  value={"Manual"}
                  control={<Checkbox />}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: FilterText },
                    "& .MuiFormControlLabel-label": { fontSize: FilterText },
                  }}
                  label="Manual"
                />
                <FormControlLabel
                  value={"Quartz"}
                  control={<Checkbox />}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: FilterText },
                    "& .MuiFormControlLabel-label": { fontSize: FilterText },
                  }}
                  label="Quartz"
                />
              </FormGroup>
            </FilterCheckboxes>
          </FilterSection>{" "}
          <FilterSection>
            <FilterLabel fontSize={"18px"}>Based By Brand</FilterLabel>
            <FilterCheckboxes>
              <FormGroup>
                <FormControlLabel
                  value={"Vanna"}
                  control={<Checkbox />}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: FilterText },
                    "& .MuiFormControlLabel-label": { fontSize: FilterText },
                  }}
                  label="Vanna"
                />{" "}
                <FormControlLabel
                  value={"Hamilton"}
                  control={<Checkbox />}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: FilterText },
                    "& .MuiFormControlLabel-label": { fontSize: FilterText },
                  }}
                  label="Hamilton"
                />
                <FormControlLabel
                  value={"Rado"}
                  control={<Checkbox />}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: FilterText },
                    "& .MuiFormControlLabel-label": { fontSize: FilterText },
                  }}
                  label="Rado"
                />
              </FormGroup>
            </FilterCheckboxes>
          </FilterSection>
          <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
            <FilterLabel>Based By Price</FilterLabel>
            <Box display={"flex"} gap={"4px"} alignItems={"center"}>
              <TextField
                type="number"
                placeholder="Min Price"
                variant="outlined"
                InputProps={{
                  style: { fontSize: small ? 10 : 14 },
                }}
              ></TextField>
              -
              <TextField
                type="number"
                placeholder="Max Price"
                variant="outlined"
                InputProps={{
                  style: { fontSize: small ? 10 : 14 },
                }}
              ></TextField>
            </Box>
          </Box>
        </DrawerContent>
      </Drawer>
      {/* Search Drawer */}
      <Drawer
        open={openSearch && medium}
        anchor="top"
        onClose={() => setOpenSearch(false)}
      >
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

export default Product;
