import React, { FormEvent, useState } from "react";
import {
  DropArea,
  ProfileFormSection,
  ProfileItemContainer,
  ProfileItems,
  ProfileLabel,
  ProfileTextHeader,
  ProfileButton,
} from "./styles";
import { Avatar, Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { ProfileSectionProps } from ".";
import toast from "react-hot-toast";
import { IUser } from "@/interfaces/user";
import { uploadAndGetImgUrl } from "@/utils/image";
import { updateUser } from "@/service/user";
import { FirebaseError } from "firebase/app";
import { UploadFile } from "@mui/icons-material";
import Cookies from "js-cookie";

export const ProfilePicture: React.FC<ProfileSectionProps> = ({ user }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      setFile(file);
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

  const mutateProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) return;

    try {
      const photoURL = await uploadAndGetImgUrl(file, "user", user.uid);
      const updatedUser: IUser = { ...user, photoURL };
      toast.loading("Saving...");
      await updateUser(updatedUser);
      Cookies.set("user", JSON.stringify(updatedUser));
      toast.dismiss();
      toast.success("Changes saved!");
    } catch (error) {
      toast.dismiss();
      toast.error(
        error instanceof FirebaseError ? error.message : "Unknown error",
      );
    }
  };

  return (
    <ProfileFormSection onSubmit={mutateProfileUpdate}>
      <ProfileTextHeader display={"flex"} justifyContent={"center"}>
        <Typography fontSize={"24px"} fontFamily={"700"}>
          Profile Picture
        </Typography>
      </ProfileTextHeader>
      <ProfileItemContainer>
        <ProfileItems>
          <ProfileLabel color="secondary">Change Profile Picture</ProfileLabel>
          <Box display="flex" gap="12px" width="100%" alignItems="center">
            <Avatar
              sx={{
                width: 100,
                height: 100,
              }}
              variant="square"
              src={file ? URL.createObjectURL(file) : user.photoURL ?? ""}
            >
              {user.firstName[0]}
              {user.lastName[0]}
            </Avatar>
            <DropArea {...getRootProps()}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  p="8px"
                  display="flex"
                  alignItems="center"
                  borderRadius="100%"
                >
                  <UploadFile />
                </Box>
                <Typography fontWeight={500} textAlign="center" color="gray">
                  <Typography component="span" color="black">
                    Click to Upload
                  </Typography>{" "}
                  or Drop your file here
                </Typography>
              </Box>
              <input {...getInputProps()} />
            </DropArea>
          </Box>
        </ProfileItems>
      </ProfileItemContainer>
      <Box display="flex" justifyContent="end" gap="12px" flexWrap="wrap">
        <ProfileButton type="submit" size="large" disabled={!file}>
          <Typography color="white">Save</Typography>
        </ProfileButton>
        {file && (
          <ProfileButton
            size="large"
            color="error"
            onClick={() => setFile(null)}
          >
            <Typography>Cancel</Typography>
          </ProfileButton>
        )}
      </Box>
    </ProfileFormSection>
  );
};
