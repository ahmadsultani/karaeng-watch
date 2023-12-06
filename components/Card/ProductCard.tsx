import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Box, Typography, useMediaQuery } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

import { addFavorite, deleteFavorite } from "@/feature/favorite/services";

import { formatPrice } from "@/utils/formatter";
import { IProduct } from "@/interfaces/product";

import { FavIcon, ProductCardText, ProductCardsWrapper } from "./styles";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IUser } from "@/interfaces/user";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const ProductCard: React.FC<Partial<IProduct>> = ({
  brand,
  id,
  name,
  price,
  gender,
  types,
  isFavorite,
}) => {
  const [user, setUser] = useState<IUser>();

  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const small = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    const userCookies = Cookies.get("user");
    userCookies && setUser(JSON.parse(userCookies) as IUser);
  }, []);

  const handleFavoriteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    toast.loading("Adding...");
    if (isFavorite) {
      await deleteFavorite(id as string);
      toast.dismiss();
      toast.success("Removed from favorite");
    } else {
      await addFavorite(id as string);
      toast.dismiss();
      toast.success("Added to favorite");
    }
    queryClient.invalidateQueries({
      queryKey: ["favorite"],
    });

    queryClient.invalidateQueries({
      queryKey: ["product", {}],
    });
  };

  return (
    <ProductCardsWrapper
      onClick={() => router.push(`/product/${id}`)}
      title={name}
    >
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
        {user && pathname !== "/" && (
          <FavIcon title="Favorite" onClick={handleFavoriteClick}>
            {isFavorite ? (
              <Favorite fontSize="inherit" color="primary" />
            ) : (
              <FavoriteBorder fontSize="inherit" color="primary" />
            )}
          </FavIcon>
        )}
      </Box>
    </ProductCardsWrapper>
  );
};
