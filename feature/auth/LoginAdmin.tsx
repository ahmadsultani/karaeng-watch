"use client";

import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

import { Button, TextField, Typography } from "@mui/material";

import { AuthLayout } from "./AuthLayout";
import { ImageContainer } from "@/components/ImageContainer";
import { AuthForm, AuthInputGroup } from "./styles";

import { TLoginForm } from "./types";
import { useAuth } from "./useAuth";

export const LoginAdmin = () => {
  const { control, handleSubmit } = useForm<TLoginForm>({
    defaultValues: {
      role: "admin",
    },
  });
  const { login } = useAuth();

  return (
    <AuthLayout formOnly>
      <AuthForm
        onSubmit={handleSubmit((values) => login.mutateAsync(values))}
        noValidate
      >
        <ImageContainer size="80px">
          <Image src="/logos/logo-primary.svg" alt="logo" fill />
        </ImageContainer>

        <div>
          <Typography fontSize="22px" color="secondary" textAlign="center">
            Login As Admin
          </Typography>
          <Typography fontSize="12px" color="grey" textAlign="center">
            Welcome To Admin Panel
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
        </AuthInputGroup>

        <Button variant="contained" color="secondary" type="submit" fullWidth>
          Sign In
        </Button>
      </AuthForm>
    </AuthLayout>
  );
};
