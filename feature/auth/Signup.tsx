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

import { TSignupForm } from "./types";
import { useAuth } from "./useAuth";

export const Signup = () => {
  const { control, handleSubmit, getValues } = useForm<TSignupForm>();

  const { signup, handleSigninWithGoogle } = useAuth();

  return (
    <AuthLayout>
      <AuthForm
        onSubmit={handleSubmit((values) => signup.mutateAsync(values))}
        noValidate
      >
        <ImageContainer size="80px">
          <Image src="/logos/logo-primary.svg" alt="logo" fill />
        </ImageContainer>

        <div>
          <Typography fontSize="22px" color="secondary" textAlign="center">
            Sign Up for Your Account
          </Typography>
          <Typography fontSize="12px" color="grey" textAlign="center">
            Welcome! Create a new account
          </Typography>
        </div>

        <AuthInputGroup>
          <Box display="flex" gap="8px">
            <Controller
              name="firstName"
              control={control}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  label="First Name"
                  placeholder="Enter your first name"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={onChange}
                  value={value || ""}
                  fullWidth
                  required
                />
              )}
              rules={{
                required: "Please input your first name",
              }}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field: { value, onChange }, fieldState }) => (
                <TextField
                  label="Last Name"
                  placeholder="Enter your last name"
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
                required: "Please input your last name",
              }}
            />
          </Box>
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
            name="phoneNumber"
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <TextField
                label="Phone Number"
                placeholder="Enter your phone number"
                type="tel"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={onChange}
                value={value || ""}
                fullWidth
                required
              />
            )}
            rules={{
              required: "Please input your phone number",
              pattern: {
                // value: /^(\+?)[0-9-]+$/,
                // the minus can only written after number
                value: /^(\+?)[0-9]+(-[0-9]+)*$/,
                message: "Please input a valid phone number",
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
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <TextField
                label="Confirm Password"
                placeholder="Enter your password again"
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
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            }}
          />
        </AuthInputGroup>

        <AuthButtonGroup>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={signup.isLoading}
            fullWidth
          >
            Sign Up
          </Button>

          <Divider>
            <Typography fontSize="12px" color="grey">
              or create account with
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
          Already have an account?{" "}
          <Link underline="hover" color="info.main" href="/login">
            Sign In
          </Link>
        </Typography>
      </AuthForm>
    </AuthLayout>
  );
};
