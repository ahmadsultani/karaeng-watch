"use client";

import { Box, Skeleton, Typography } from "@mui/material";
import {
  ProfileButton,
  ProfileContent,
  ProfileItemContainer,
  ProfileItems,
  ProfileLabel,
  ProfileTextHeader,
  ProfileFormSection,
} from "./styles";
import { Controller, useForm } from "react-hook-form";
import { IUser } from "@/interfaces/user";
import Cookies from "js-cookie";
import { updateUser } from "@/service/user";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { ProfileSectionProps } from "./Profile";

export const UserInformation: React.FC<ProfileSectionProps> = ({ user }) => {
  const { control, handleSubmit, reset, formState } = useForm<Partial<IUser>>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      uid: user.uid,
      birthDate: user.birthDate,
      address: user.address,
      phoneNumber: user.phoneNumber,
    },
  });

  const mutateUser = async (data: Partial<IUser>) => {
    try {
      const updatedUser = { ...user, ...data };
      toast.loading("Saving...");
      await updateUser(updatedUser);
      Cookies.set("user", JSON.stringify(updatedUser));
      toast.dismiss();
      toast.success("Changes saved!");
      reset();
    } catch (error) {
      toast.dismiss();
      toast.error(
        error instanceof FirebaseError ? error.message : "Unknown Error",
      );
    }
  };

  return (
    <ProfileFormSection onSubmit={handleSubmit(mutateUser)}>
      <ProfileTextHeader display={"flex"} justifyContent={"center"}>
        <Typography fontSize={"24px"} fontFamily={"700"}>
          User Information
        </Typography>
      </ProfileTextHeader>
      <ProfileItemContainer>
        {/* <ProfileItems>
          <ProfileLabel color="secondary">Account ID</ProfileLabel>
          {user ? (
            <Controller
              name="uid"
              control={control}
              render={({ field }) => <ProfileContent {...field} disabled />}
            />
          ) : (
            <Skeleton variant="text" width="100%" height={30} />
          )}
        </ProfileItems> */}

        <ProfileItems>
          <ProfileLabel color="secondary">First Name</ProfileLabel>
          {user ? (
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => <ProfileContent {...field} />}
            />
          ) : (
            <Skeleton variant="text" width="100%" height={30} />
          )}
        </ProfileItems>

        <ProfileItems>
          <ProfileLabel color="secondary">Last Name</ProfileLabel>
          {user ? (
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <ProfileContent {...field} />}
            />
          ) : (
            <Skeleton variant="text" width="100%" height={30} />
          )}
        </ProfileItems>

        <ProfileItems>
          <ProfileLabel color="secondary">Birthdate</ProfileLabel>
          {user ? (
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => <ProfileContent {...field} type="date" />}
            />
          ) : (
            <Skeleton variant="text" width="100%" height={30} />
          )}
        </ProfileItems>

        <ProfileItems>
          <ProfileLabel color="secondary">Address</ProfileLabel>
          {user ? (
            <Controller
              name="address"
              control={control}
              render={({ field }) => <ProfileContent {...field} />}
            />
          ) : (
            <Skeleton variant="text" width="100%" height={30} />
          )}
        </ProfileItems>

        <ProfileItems>
          <ProfileLabel color="secondary">Phone Number</ProfileLabel>
          {user ? (
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <ProfileContent
                  {...field}
                  inputProps={{
                    pattern: /^[0-9-+]+$/,
                    minLength: 12,
                  }}
                />
              )}
            />
          ) : (
            <Skeleton variant="text" width="100%" height={30} />
          )}
        </ProfileItems>
      </ProfileItemContainer>
      <Box display="flex" justifyContent="end" gap="12px" flexWrap="wrap">
        <ProfileButton type="submit" disabled={!formState.isDirty} size="large">
          <Typography color="white">Save</Typography>
        </ProfileButton>
        {formState.isDirty && (
          <ProfileButton color="error" size="large" onClick={() => reset()}>
            <Typography>Cancel</Typography>
          </ProfileButton>
        )}
      </Box>
    </ProfileFormSection>
  );
};
