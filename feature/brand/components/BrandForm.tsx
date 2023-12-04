"use client";

import { Control, Controller } from "react-hook-form";

import { Box, Button, TextField, Typography } from "@mui/material";

import {
  FormSection,
  FormSectionBody,
  FormSectionHeader,
} from "@/components/Section/styles";
import { AdminWrapper } from "@/components/Wrapper/styles";

import { useRouter } from "next/navigation";
import { TBrandForm } from "..";

interface BrandFormProps {
  control: Control<TBrandForm>;
  type?: "create" | "edit";
}

export const BrandForm: React.FC<BrandFormProps> = ({
  control,
  type = "create",
}) => {
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
              required: "Brand name is required",
            }}
            render={({ field: { value, onChange }, fieldState }) => (
              <TextField
                color="secondary"
                label="Brand Name"
                placeholder="Enter brand name"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={onChange}
                value={value}
                required
              />
            )}
          />
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
