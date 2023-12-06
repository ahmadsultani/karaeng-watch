"use client";
import { useRouter } from "next/navigation";
import { BackButton, CSHeader, Wrapper } from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface CSNavbarProps {
  prevUrl?: string;
}

export const CSNavbar: React.FC<CSNavbarProps> = ({ prevUrl }) => {
  const router = useRouter();

  const goBack = () => {
    if (prevUrl) router.push(prevUrl);
    else router.back();
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
