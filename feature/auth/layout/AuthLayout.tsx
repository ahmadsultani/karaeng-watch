import Image from "next/image";

import { ImageContainer } from "@/components/ImageContainer";

import { Box } from "@mui/material";
import { AuthContainer, AuthImageContainer, AuthWrapper } from "./styles";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <AuthWrapper>
      <AuthContainer>
        {children}
        <AuthImageContainer>
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bgcolor="#00000099"
            zIndex={1}
          />
          <Image src="/images/auth-bg.webp" alt="background" fill priority />
          <ImageContainer size="240px">
            <Image src="/logos/logo-white.svg" alt="logo" fill />
          </ImageContainer>
        </AuthImageContainer>
      </AuthContainer>
    </AuthWrapper>
  );
};
