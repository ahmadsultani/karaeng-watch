"use client";

import { Skeleton, Typography } from "@mui/material";
import {
  ProfileButton,
  ProfileContent,
  ProfileItemContainer,
  ProfileItems,
  ProfileLabel,
  ProfileTextHeader,
  ProfileFormSection,
} from "./styles";
import toast from "react-hot-toast";
import { ProfileSectionProps } from "./Profile";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { CheckCircleOutline } from "@mui/icons-material";

export const EmailInformation: React.FC<ProfileSectionProps> = ({ user }) => {
  const router = useRouter();

  const verifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;
    try {
      await sendEmailVerification(user);
      toast.success(
        "Email verification sent! Please check your email and re-login after that.",
        { duration: 5000 },
      );
      Cookies.remove("user");
      await auth.signOut();
      router.push("login");
    } catch (error) {
      toast.error(
        error instanceof FirebaseError ? error.message : "Unknown Error",
      );
    }
  };

  return (
    <ProfileFormSection onSubmit={verifyEmail}>
      <ProfileTextHeader display={"flex"} justifyContent={"center"}>
        <Typography fontSize={"24px"} fontFamily={"700"}>
          Email Verification
        </Typography>
      </ProfileTextHeader>
      <ProfileItemContainer>
        <ProfileItems>
          <ProfileLabel color="secondary">Email</ProfileLabel>
          {user ? (
            <ProfileContent value={user.email} disabled />
          ) : (
            <Skeleton variant="text" width="100%" height={30} />
          )}
          <ProfileButton
            type="submit"
            disabled={user.emailVerified}
            startIcon={user.emailVerified ? <CheckCircleOutline /> : null}
            size="large"
          >
            <Typography color="white">
              {user.emailVerified ? "Verified" : "Verify"}
            </Typography>
          </ProfileButton>
        </ProfileItems>
      </ProfileItemContainer>
    </ProfileFormSection>
  );
};
