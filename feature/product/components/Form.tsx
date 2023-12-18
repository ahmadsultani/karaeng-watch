import { useQuery } from "@tanstack/react-query";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

import { getAllBrand } from "@/service/brand";

import {
  Avatar,
  Box,
  Button,
  MenuItem,
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

import { TProductForm } from "..";
import { useRouter } from "next/navigation";
import { IProduct } from "@/interfaces/product";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { UploadFile } from "@mui/icons-material";
import { DropArea } from "@/feature/setting/profile/styles";

interface FormProps {
  control: Control<TProductForm>;
  setValue: UseFormSetValue<TProductForm>;
  type?: "create" | "edit";
  product?: IProduct;
}

export const Form: React.FC<FormProps> = ({
  control,
  setValue,
  product,
  type = "create",
}) => {
  const { data: brands, isLoading: isLoadingBrands } = useQuery({
    queryKey: ["brand"],
    queryFn: getAllBrand,
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      setValue(`imgGallery.0`, file);
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
      "image/webp": [],
    },
    maxFiles: 1,
    multiple: false,
  });

  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 768px");

  const handleGalleryInput = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;

    if (event.target.files.length > 1) {
      toast.error("Please upload only 1 file");
      return;
    }

    const file = event.target.files[0];
    setValue(`imgGallery.${index}`, file);
  };

  return (
    <AdminWrapper>
      <FormSection>
        <FormSectionHeader>Thumbnail</FormSectionHeader>
        <FormSectionRow>
          <Controller
            name="imgGallery.0"
            control={control}
            render={({ field: { value } }) => (
              <Box display="flex" gap="12px" width="100%" alignItems="center">
                {value || (product && product?.imgGallery[0]) ? (
                  <Box position={"relative"} height={"200px"} width={"200px"}>
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
                          : product?.imgGallery[0] || ""
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
      </FormSection>
      <FormSection>
        <FormSectionHeader>Gallery</FormSectionHeader>
        <FormSectionRow>
          <Controller
            name="imgGallery.1"
            control={control}
            render={({ field: { value } }) => (
              <Box display="flex" gap="12px" width="100%" alignItems="center">
                {value || (product && product?.imgGallery[1]) ? (
                  <Box position={"relative"} height={"200px"} width={"200px"}>
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
                          : product?.imgGallery[1] || ""
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
                      <input type="file" title="gallery" accept="image/*" />
                    </Box>
                  </Box>
                ) : (
                  <Box display={"flex"} width={"200px"} height={"200px"}>
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
                        Click to Upload
                      </Typography>
                    </Box>
                    <input
                      type="file"
                      title="haha"
                      onChange={(e) => handleGalleryInput(1, e)}
                    />
                  </Box>
                )}
              </Box>
            )}
          />
        </FormSectionRow>
      </FormSection>
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
                  <MenuItem value="unisex">Unisex</MenuItem>
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
                  placeholder="5 mm"
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
                  placeholder="5 mm"
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
                  placeholder="10 mm"
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
                  placeholder="40 m"
                  type="number"
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
          onClick={() => router.push("/admin/product")}
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
