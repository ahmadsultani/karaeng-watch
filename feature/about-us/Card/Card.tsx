import Image from "next/image";
import * as AboutCard from "./styles";
import { Typography, useMediaQuery } from "@mui/material";

interface CardProps {
  name: string;
  image: string;
}

export const Card = ({ name, image }: CardProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <AboutCard.Container>
      <AboutCard.Image>
        <Image src={image} alt={name} width={260} height={260} />
      </AboutCard.Image>
      <AboutCard.Name>
        <Typography fontSize={isMobile ? "18px" : "24px"} color="secondary">
          {name}
        </Typography>
      </AboutCard.Name>
    </AboutCard.Container>
  );
};
