"use client";

import { Control, Controller, UseFormSetValue } from "react-hook-form";

import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import {
  FormSection,
  FormSectionBody,
  FormSectionHeader,
  FormSectionRow,
} from "@/components/Section/styles";
import { AdminWrapper } from "@/components/Wrapper/styles";

import { useRouter } from "next/navigation";
import { TBrandForm } from "..";
import { BrandPictureSection } from "../styles";
import { UploadFile } from "@mui/icons-material";
import { DropArea } from "@/feature/setting/profile/styles";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { IBrand } from "@/interfaces/brand";

interface BrandFormProps {
  control: Control<TBrandForm>;
  setValue: UseFormSetValue<TBrandForm>;
  type?: "create" | "edit";
  brand?: IBrand;
}

export const BrandForm: React.FC<BrandFormProps> = ({
  control,
  setValue,
  brand,
  type = "create",
}) => {
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width:768px)");

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      setValue("image", file);
    } else {
      toast.error("Please upload only 1 file");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <AdminWrapper>
      <FormSection>
        <FormSectionHeader>Brand Picture</FormSectionHeader>
        <BrandPictureSection>
          <FormSectionRow>
            <Controller
              name="image"
              control={control}
              render={({ field: { value } }) => (
                <Box display="flex" gap="12px" width="100%" alignItems="center">
                  {value || (brand && brand?.imageURL) ? (
                    <Box position={"relative"}>
                      <Avatar
                        sx={{
                          width: 200,
                          height: 200,
                          "& .MuiAvatar-img": {
                            objectFit: "contain",
                          },
                        }}
                        variant="square"
                        src={
                          value
                            ? URL.createObjectURL(value)
                            : brand?.imageURL || ""
                        }
                      ></Avatar>
                      <Box
                        position={"absolute"}
                        height={"200px"}
                        width={"200px"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        top={0}
                        left={0}
                        sx={{
                          opacity: 0,
                          transition: "200ms",
                          backgroundColor: "rgba(0,0,0,0.8)",
                          "&:hover": {
                            transition: "200ms",
                            opacity: 1,
                          },
                        }}
                      >
                        <DropArea {...getRootProps()}>
                          <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                          >
                            <Box p="8px" display="flex" alignItems="center">
                              <UploadFile
                                sx={{
                                  color: "white",
                                }}
                              />
                              <Typography color={"white"}>
                                Change Picture
                              </Typography>
                            </Box>
                          </Box>
                          <input {...getInputProps()} />
                        </DropArea>
                      </Box>
                    </Box>
                  ) : (
                    <Box display={"flex"} width={"200px"} height={"200px"}>
                      <DropArea {...getRootProps()}>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Box
                            p="8px"
                            display="flex"
                            alignItems="center"
                            borderRadius="100%"
                          >
                            <UploadFile />
                          </Box>
                          <Typography
                            fontWeight={500}
                            textAlign="center"
                            color="gray"
                          >
                            <Typography component="span" color="black">
                              Click to Upload
                            </Typography>{" "}
                            or Drop your file here
                          </Typography>
                        </Box>
                        <input {...getInputProps()} />
                      </DropArea>
                    </Box>
                  )}
                </Box>
              )}
            />
          </FormSectionRow>
        </BrandPictureSection>
      </FormSection>
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

      <Box
        display="flex"
        justifyContent="end"
        width="100%"
        gap="16px"
        flexWrap="wrap"
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth={isMobile}
        >
          <Typography color="white" mx={4}>
            {type === "create" ? "Create" : "Save"}
          </Typography>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => router.push("/admin/brand")}
          fullWidth={isMobile}
        >
          <Typography color="white" mx={4}>
            Cancel
          </Typography>
        </Button>
      </Box>
    </AdminWrapper>
  );
};
