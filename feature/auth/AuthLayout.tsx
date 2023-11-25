import Image from "next/image";

import { ImageContainer } from "@/components/ImageContainer";

import { AuthContainer, AuthImageContainer, AuthWrapper } from "./styles";
import { Box } from "@mui/material";

interface AuthLayoutProps {
  children: React.ReactNode;
  formOnly?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  formOnly,
}) => {
  return (
    <AuthWrapper>
      <AuthContainer>
        {children}
        {!formOnly && (
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
        )}
      </AuthContainer>
    </AuthWrapper>
  );
};
