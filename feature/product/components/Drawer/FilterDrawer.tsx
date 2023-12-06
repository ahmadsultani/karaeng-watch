import {
  Box,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import {
  DrawerContent,
  FilterCheckboxes,
  FilterLabel,
  FilterSection,
} from "./styles";
import { TProductParams } from "../..";
import { MovementType } from "@/interfaces/product";
import { IBrand } from "@/interfaces/brand";

interface FilterDrawerProps {
  filter: TProductParams;
  setFilter: React.Dispatch<React.SetStateAction<TProductParams>>;
  open: boolean;
  brands: IBrand[];
  onClose: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  brands,
  filter,
  setFilter,
  open,
  onClose,
}) => {
  const small = useMediaQuery("(max-width:768px)");
  const medium = useMediaQuery("(max-width:1024px)");

  let FilterText: number;

  if (small) {
    FilterText = 12;
  } else if (medium) {
    FilterText = 16;
  } else {
    FilterText = 18;
  }

  const handleTypeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFilter({ ...filter, type: e.target.value as MovementType });
    } else {
      setFilter({ ...filter, type: undefined });
    }
  };

  const handleGenderCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFilter({ ...filter, gender: e.target.value as "male" | "female" });
    } else {
      setFilter({ ...filter, gender: undefined });
    }
  };

  const handleBrandCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFilter({ ...filter, brandId: e.target.value });
    } else {
      setFilter({ ...filter, brandId: undefined });
    }
  };

  return (
    <Drawer variant="temporary" anchor="left" open={open} onClose={onClose}>
      <Box my="16px">
        <DrawerContent>
          <FilterLabel>Filter</FilterLabel>
          <FilterSection>
            <FilterLabel>Based By Gender</FilterLabel>
            <FilterCheckboxes>
              <FormGroup>
                <FormControlLabel
                  value={"Male"}
                  control={
                    <Checkbox
                      value="male"
                      checked={filter.gender === "male"}
                      onChange={handleGenderCheckbox}
                    />
                  }
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: FilterText },
                    "& .MuiFormControlLabel-label": { fontSize: FilterText },
                  }}
                  label="Male"
                />{" "}
                <FormControlLabel
                  value={"Female"}
                  control={
                    <Checkbox
                      value="female"
                      checked={filter.gender === "female"}
                      onChange={handleGenderCheckbox}
                    />
                  }
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
                  control={
                    <Checkbox
                      value="automatic"
                      checked={filter.type === "automatic"}
                      onChange={handleTypeCheckbox}
                    />
                  }
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: FilterText },
                    "& .MuiFormControlLabel-label": { fontSize: FilterText },
                  }}
                  label="Automatic"
                />
                <FormControlLabel
                  value={"Manual"}
                  control={
                    <Checkbox
                      value="manual"
                      checked={filter.type === "manual"}
                      onChange={handleTypeCheckbox}
                    />
                  }
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: FilterText },
                    "& .MuiFormControlLabel-label": { fontSize: FilterText },
                  }}
                  label="Manual"
                />
                <FormControlLabel
                  value={"Quartz"}
                  control={
                    <Checkbox
                      value="quartz"
                      checked={filter.type === "quartz"}
                      onChange={handleTypeCheckbox}
                    />
                  }
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
                {brands.map((brand) => (
                  <FormControlLabel
                    key={brand.id}
                    value={brand.name}
                    control={
                      <Checkbox
                        value={brand.id}
                        checked={filter.brandId === brand.id}
                        onChange={handleBrandCheckbox}
                      />
                    }
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: FilterText },
                      "& .MuiFormControlLabel-label": { fontSize: FilterText },
                    }}
                    label={brand.name}
                  />
                ))}
              </FormGroup>
            </FilterCheckboxes>
          </FilterSection>
          <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
            <FilterLabel>Based By Price</FilterLabel>
            <Box display={"flex"} gap={"4px"} alignItems={"center"}>
              <TextField
                type="number"
                placeholder="Min Price"
                value={filter.price_gte}
                onChange={(e) =>
                  setFilter({ ...filter, price_gte: Number(e.target.value) })
                }
                variant="outlined"
                InputProps={{
                  style: { fontSize: small ? 10 : 14 },
                }}
              />
              -
              <TextField
                type="number"
                placeholder="Max Price"
                value={filter.price_lte}
                onChange={(e) =>
                  setFilter({ ...filter, price_lte: Number(e.target.value) })
                }
                variant="outlined"
                InputProps={{
                  style: { fontSize: small ? 10 : 14 },
                }}
              />
            </Box>
          </Box>
        </DrawerContent>
      </Box>
    </Drawer>
  );
};
