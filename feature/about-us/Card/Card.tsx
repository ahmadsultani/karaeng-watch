import Image from "next/image";
import * as AboutCard from "./styles";

interface CardProps {
  name: string;
  image: string;
}

export const Card = ({ name, image }: CardProps) => {
  return (
    <AboutCard.Container>
      <AboutCard.Image>
        <Image src={image} alt={name} width={260} height={260} />
      </AboutCard.Image>
      <AboutCard.Name>{name}</AboutCard.Name>
    </AboutCard.Container>
  );
};
