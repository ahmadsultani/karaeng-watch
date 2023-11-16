"use client";

import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

import { Box, Button, Link, TextField, Typography } from "@mui/material";

import { AuthLayout } from "./AuthLayout";
import { ImageContainer } from "@/components/ImageContainer";
import {
  AuthButtonGroup,
  AuthForm,
  AuthInputGroup,
  DividerLine,
} from "./styles";

import { TLoginForm } from "./types";

export const Login = () => {
  const { control } = useForm<TLoginForm>();

  return (
    <AuthLayout>
      <AuthForm noValidate>
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
                defaultValue=""
                type="email"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={onChange}
                value={value}
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
                value={value}
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
            justifyContent="space-between"
            alignItems="center"
            gap="12px"
          >
            <Box display="flex" alignItems="center" gap="8px">
              <input type="checkbox" />
              <Typography fontSize="12px" color="grey">
                Remember me
              </Typography>
            </Box>
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

        <AuthButtonGroup>
          <Button variant="contained" color="secondary" type="submit" fullWidth>
            Sign In
          </Button>

          <Box display="flex" alignItems="center" width="100%" gap="8px">
            <DividerLine />
            <Typography fontSize="12px" color="grey">
              or enter with
            </Typography>
            <DividerLine />
          </Box>

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
