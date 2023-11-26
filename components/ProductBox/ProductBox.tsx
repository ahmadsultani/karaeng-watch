"use client";

import { ProductCard } from "../ProductCard/ProductCard";
import { ProductBoxWrapper } from "./styles";

interface ProductBoxProps {}

export const ProductBox: React.FC<ProductBoxProps> = () => {
  return (
    <>
      <ProductBoxWrapper>
        <ProductCard
          name="Centrix Automatic Diamonds"
          price={43460000}
          gender="Male"
          typesId="Automatic"
          braceletMaterial=""
          caseMaterial=""
          caseThickness={12}
          movementReference=""
          width={39.5}
          height={39.5}
          stock={234}
          thumbnail=""
          category={{ id: "123", name: "this is ctegory" }}
          imgGallery={["asdad"]}
          brand={{ id: "123", name: "this is brand" }}
        />
      </ProductBoxWrapper>
    </>
  );
};
