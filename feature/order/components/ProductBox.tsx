import React from "react";
import { Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import * as ProductBoxStyle from "./Card/styles";
import { formatPrice } from "@/utils/formatter";
import { IProduct } from "@/interfaces/product";

interface ProductBoxProps {
  products: IProduct[];
}

export const ProductBox: React.FC<ProductBoxProps> = ({ products }) => {
  return (
    <ProductBoxStyle.Content>
      <ProductBoxStyle.Product>
        <ProductBoxStyle.ContentImage>
          <ShoppingBasketIcon />
        </ProductBoxStyle.ContentImage>

        <ProductBoxStyle.ContentProduct>
          <ProductBoxStyle.ContentProductDetails>
            <Typography>{products[0].name}</Typography>
            <Typography className="productBrand">
              {products[0].brand.name}
            </Typography>
          </ProductBoxStyle.ContentProductDetails>

          {products.length > 1 && (
            <ProductBoxStyle.ContentProductMore>
              <Typography className="productMore">
                {products.length - 1} other product(s)
              </Typography>
            </ProductBoxStyle.ContentProductMore>
          )}
        </ProductBoxStyle.ContentProduct>

        <ProductBoxStyle.ContentProductPrice>
          <Typography>{formatPrice(products[0].price)}</Typography>
        </ProductBoxStyle.ContentProductPrice>
      </ProductBoxStyle.Product>
    </ProductBoxStyle.Content>
  );
};

export default ProductBox;
