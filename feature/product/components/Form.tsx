import { useQuery } from "@tanstack/react-query";
import { Control, Controller } from "react-hook-form";

import { getAllBrand } from "@/service/brand";

import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";

import {
  FormSection,
  FormSectionBody,
  FormSectionHeader,
  FormSectionRow,
} from "@/components/Section/styles";
import { AdminWrapper } from "@/components/Wrapper/styles";

import { TProductForm } from "..";
import { useRouter } from "next/navigation";

interface FormProps {
  control: Control<TProductForm>;
  type?: "create" | "edit";
}

export const Form: React.FC<FormProps> = ({ control, type = "create" }) => {
  const { data: brands, isLoading: isLoadingBrands } = useQuery({
    queryKey: ["brand"],
    queryFn: getAllBrand,
  });

  const router = useRouter();

  return (
    <AdminWrapper>
      <FormSection>
        <FormSectionHeader>General</FormSectionHeader>
        <FormSectionBody>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Product name is required",
            }}
            render={({ field: { value, onChange }, fieldState }) => (
              <TextField
                color="secondary"
                label="Product Name"
                placeholder="Enter product name"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={onChange}
                value={value}
                required
              />
            )}
          />

          <FormSectionRow>
            <Controller
              name="brandId"
              control={control}
              rules={{
                required: "Brand is required",
              }}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  color="secondary"
                  select
                  sx={{ width: "70%" }}
                  label="Brand"
                  placeholder="Select brand"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={onChange}
                  value={value}
                  required
                >
                  {isLoadingBrands ? (
                    <MenuItem>Loading...</MenuItem>
                  ) : (
                    brands?.map((brand) => (
                      <MenuItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              )}
            />

            <Controller
              name="gender"
              control={control}
              rules={{
                required: "Gender is Required",
              }}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  select
                  color="secondary"
                  sx={{ flex: 1 }}
                  label="Gender"
                  placeholder="Select gender*"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={onChange}
                  value={value}
                  required
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </TextField>
              )}
            />
          </FormSectionRow>

          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
              min: {
                value: 1,
                message: "Price must be greater than 0",
              },
            }}
            render={({ field: { value, onChange }, fieldState }) => (
              <TextField
                color="secondary"
                label="Price"
                type="number"
                placeholder="IDR 999,999,999.00"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={onChange}
                value={value}
                required
              />
            )}
          />

          <FormSectionRow>
            <Controller
              name="braceletMaterial"
              control={control}
              rules={{
                required: "Bracelet Material is required",
              }}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  color="secondary"
                  label="Bracelet Material"
                  sx={{ width: "70%" }}
                  placeholder="Material"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={onChange}
                  value={value}
                  required
                />
              )}
            />

            <Controller
              name="stock"
              control={control}
              rules={{
                required: "Stock is Required",
                min: {
                  value: 1,
                  message: "Stock must be greater than 0",
                },
              }}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  color="secondary"
                  label="Stock"
                  placeholder="100"
                  type="number"
                  sx={{ flex: 1 }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={onChange}
                  value={value}
                  required
                />
              )}
            />
          </FormSectionRow>
        </FormSectionBody>
      </FormSection>

      <FormSection>
        <FormSectionHeader>Movement</FormSectionHeader>
        <FormSectionBody>
          <FormSectionRow>
            <Controller
              name="types"
              control={control}
              rules={{
                required: "Movement type is required",
              }}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  color="secondary"
                  select
                  sx={{ flex: 1 }}
                  label="Type"
                  placeholder="Select Movement Type"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={onChange}
                  value={value}
                  required
                >
                  <MenuItem value="quartz">Quartz</MenuItem>
                  <MenuItem value="manual">Manual</MenuItem>
                  <MenuItem value="automatic">Automatic</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="powerReserve"
              control={control}
              rules={{
                required: "Power reserve is required",
                min: {
                  value: 1,
                  message: "Power reserve must be greater than 0",
                },
              }}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  color="secondary"
                  sx={{ flex: 1 }}
                  label="Power Reserve"
                  type="number"
                  placeholder="100 hours"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={onChange}
                  value={value}
                  required
                />
              )}
            />
            <Controller
              name="movementReference"
              control={control}
              rules={{
                required: "Movement reference is required",
              }}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  color="secondary"
                  sx={{ flex: 1 }}
                  label="Reference"
                  placeholder="1327831.982391731"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={onChange}
                  value={value}
                  required
                />
              )}
            />
          </FormSectionRow>
        </FormSectionBody>
      </FormSection>

      <FormSection>
        <FormSectionHeader>Case</FormSectionHeader>
        <FormSectionBody>
          <Controller
            name="caseMaterial"
            control={control}
            rules={{
              required: "Case Material is required",
            }}
            render={({ field: { value, onChange }, fieldState }) => (
              <TextField
                color="secondary"
                label="Material"
                placeholder="Case Material"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={onChange}
                value={value}
                required
              />
            )}
          />
          <FormSectionRow>
            <Controller
              name="caseThickness"
              control={control}
              rules={{
                required: "Case Thickness is required",
                min: {
                  value: 1,
                  message: "Case Thickness must be greater than 0",
                },
              }}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  color="secondary"
                  sx={{ flex: 1 }}
                  label="Case Thickness"
                  type="number"
                  placeholder="5 cm"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={onChange}
                  value={value}
                  required
                />
              )}
            />

            <Controller
              name="height"
              control={control}
              rules={{
                required: "Height is required",
                min: {
                  value: 1,
                  message: "Height must be greater than 0",
                },
              }}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  color="secondary"
                  sx={{ flex: 1 }}
                  label="Height"
                  type="number"
                  placeholder="5 cm"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={onChange}
                  value={value}
                  required
                />
              )}
            />

            <Controller
              name="width"
              control={control}
              rules={{
                required: "Width is required",
                min: {
                  value: 1,
                  message: "Width must be greater than 0",
                },
              }}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  color="secondary"
                  sx={{ flex: 1 }}
                  label="Width"
                  type="number"
                  placeholder="10 cm"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={onChange}
                  value={value}
                  required
                />
              )}
            />

            <Controller
              name="waterResistance"
              control={control}
              rules={{
                required: "Water resistance is required",
              }}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  color="secondary"
                  sx={{ flex: 1 }}
                  label="Water Resistance"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={onChange}
                  value={value}
                  required
                />
              )}
            />
          </FormSectionRow>
        </FormSectionBody>
      </FormSection>

      <Box display="flex" justifyContent="end" width="100%" gap="16px">
        <Button type="submit" variant="contained" color="primary">
          <Typography color="white" mx={4}>
            {type === "create" ? "Create" : "Save"}
          </Typography>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.back()}
        >
          <Typography color="white" mx={4}>
            Cancel
          </Typography>
        </Button>
      </Box>
    </AdminWrapper>
  );
};
