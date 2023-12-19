"use client";

import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { ImageContainer } from "@/components/ImageContainer";
import { AuthLayout } from "./layout";
import { AuthButtonGroup, AuthForm, AuthInputGroup } from "./styles";

import { TLoginForm } from "./types";
import { useAuth } from "./useAuth";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

export const Login = () => {
  const { control, handleSubmit, setValue, formState } = useForm<TLoginForm>({
    mode: "onChange",
  });
  const { login, handleSigninWithGoogle } = useAuth();

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleCaptchaChange = (token: string | null) => {
    setValue("captcha", token || "");
    setIsCaptchaVerified(!!token);
  };

  return (
    <AuthLayout>
      <AuthForm
        onSubmit={handleSubmit((values) => login.mutateAsync(values))}
        noValidate
      >
        <ImageContainer size="80px">
          <Image src="/logos/logo-primary.svg" alt="logo" fill />
        </ImageContainer>

        <div>
          <Typography fontSize="22px" color="secondary" textAlign="center">
            Sign In To Your Account
          </Typography>
          <Typography fontSize="12px" color="grey" textAlign="center">
            Welcome Back! Choose your login method
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
                type="email"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={onChange}
                value={value || ""}
                fullWidth
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
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <TextField
                label="Password"
                placeholder="Enter your password"
                variant="standard"
                type="password"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={onChange}
                value={value || ""}
                required
                fullWidth
              />
            )}
            rules={{
              required: "Please input your password",
            }}
          />
          <Box
            display="flex"
            justifyContent="end"
            alignItems="center"
            gap="12px"
          >
            <Link
              underline="hover"
              fontSize="12px"
              color="info.main"
              href="/forgot-password"
            >
              Forgot password?
            </Link>
          </Box>
        </AuthInputGroup>

        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={handleCaptchaChange}
        />

        <AuthButtonGroup>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={
              !formState.isValid || login.isLoading || !isCaptchaVerified
            }
            fullWidth
          >
            Sign In
          </Button>

          <Divider>
            <Typography fontSize="12px" color="grey">
              or enter with
            </Typography>
          </Divider>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={
              <Image
                src="/icons/google.svg"
                alt="google"
                width={14}
                height={14}
              />
            }
            type="button"
            onClick={handleSigninWithGoogle}
            fullWidth
          >
            Google
          </Button>
        </AuthButtonGroup>

        <Typography fontSize="12px" color="secondary" textAlign="center">
          Don&apos;t have an account?{" "}
          <Link underline="hover" color="info.main" href="/signup">
            Sign Up
          </Link>
        </Typography>
      </AuthForm>
    </AuthLayout>
  );
};
