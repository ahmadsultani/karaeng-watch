import { AuthContainerSingle, AuthWrapper } from "./styles";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayoutSingle: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <AuthWrapper>
      <AuthContainerSingle>{children}</AuthContainerSingle>
    </AuthWrapper>
  );
};
