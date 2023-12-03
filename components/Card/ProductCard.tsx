import { IProduct } from "@/interfaces/product";
import { formatPrice } from "@/utils/formatter";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { FavIcon, ProductCardText, ProductCardsWrapper } from "./styles";

export const ProductCard: React.FC<Partial<IProduct>> = ({
  brand,
  id,
  name,
  price,
  gender,
  types,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const small = useMediaQuery("(max-width:768px)");

  const handleFavoriteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/product/${id}`} passHref>
      <ProductCardsWrapper title={name}>
        <Box
          position={"relative"}
          height={small ? "100px" : "240px"}
          width={"100%"}
        >
          <Image
            src={"/images/standup.png.transform 2.png"}
            alt="product-images"
            fill
            priority
            draggable={false}
            objectFit="contain"
          />
        </Box>
        <ProductCardText fontWeight={700}>{brand?.name}</ProductCardText>
        <ProductCardText fontWeight={700}>{name}</ProductCardText>
        <ProductCardText fontWeight={400}>
          {formatPrice(price || 0)}
        </ProductCardText>
        <Box
          display={"flex"}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Typography
            fontSize={small ? "10px" : "16px"}
            fontWeight={400}
            textTransform="capitalize"
          >
            {gender}, {types}
          </Typography>
          <FavIcon title="Favorite" onClick={handleFavoriteClick}>
            {isFavorite ? (
              <Favorite fontSize="inherit" color="primary" />
            ) : (
              <FavoriteBorder fontSize="inherit" color="primary" />
            )}
          </FavIcon>
        </Box>
      </ProductCardsWrapper>
    </Link>
  );
};
