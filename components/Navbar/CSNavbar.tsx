"use client";
import { useRouter } from "next/navigation";
import { BackButton, CSHeader, Wrapper } from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface CSNavbarProps {}

export const CSNavbar: React.FC<CSNavbarProps> = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <Wrapper display="flex !important" position={"sticky"}>
      <BackButton onClick={() => goBack()}>
        <ArrowBackIcon />
      </BackButton>
      <CSHeader color="white">Customer Service</CSHeader>
    </Wrapper>
  );
};
