"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { Controller, useForm } from "react-hook-form";

import { Button, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

import { auth } from "@/config/firebase";
import { getFirebaseErrorMessage } from "@/utils/getFirebaseErrorMessage";
import { ImageContainer } from "@/components/ImageContainer";

import { checkAccountExists } from "./service";

import { TForgotPasswordForm } from "./types";

import { AuthLayoutSingle } from "./layout";
import { AuthForm, AuthInputGroup } from "./styles";

export const ForgotPassword = () => {
  const { control, handleSubmit } = useForm<TForgotPasswordForm>();
  const router = useRouter();

  const handleSendResetPassword = async ({ email }: TForgotPasswordForm) => {
    const isEmailExist = await checkAccountExists(email);

    if (!isEmailExist) {
      toast.error("Sorry, we couldn't find your account");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent, thank you!");
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof FirebaseError
          ? getFirebaseErrorMessage(error.code)
          : "Unkonwn Error",
      );
    }
  };

  return (
    <AuthLayoutSingle>
      <AuthForm noValidate onSubmit={handleSubmit(handleSendResetPassword)}>
        <ImageContainer size="80px">
          <Image src="/logos/logo-primary.svg" alt="logo" fill />
        </ImageContainer>

        <div>
          <Typography fontSize="22px" color="secondary" textAlign="center">
            Reset Password
          </Typography>
          <Typography fontSize="12px" color="grey" textAlign="center">
            Enter your email to reset your password
          </Typography>
        </div>

        <AuthInputGroup>
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <TextField
                label="Email"
                placeholder="Enter your email"
                defaultValue=""
                type="email"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={onChange}
                value={value || ""}
                fullWidth
                focused
                required
              />
            )}
            rules={{
              required: "Please input your email",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Please input a valid email",
              },
            }}
          />
        </AuthInputGroup>

        <Button variant="contained" color="secondary" type="submit" fullWidth>
          Send Reset Password Link
        </Button>
      </AuthForm>
    </AuthLayoutSingle>
  );
};
