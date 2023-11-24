// Import the necessary libraries
import React from "react";
import {
  CartItem,
  CartItemHeader,
  CartItemHeaderLogo,
  CartItemHeaderStatus,
  CartContent,
  CartContentIcon,
  CartContentProduct,
  CartContentProductDetails,
  CartContentProductQty,
  CartContentProductPrice,
  CartProduct,
  CartDetails,
  CartTotal,
  CartButton,
  CartButtonReview,
  CartButtonOrder,
} from "./styles";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

interface Product {
  name: string;
  brand: string;
  qty: number;
  price: number;
  status: string;
  review?: boolean;
  order?: boolean;
}

interface CartProps {
  product: Product;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export const Cart: React.FC<CartProps> = ({ product }) => {
  const totalPrice = product.qty * product.price;

  const handleReviewClick = () => {
    // push to review page
  };

  const handleOrderAgainClick = () => {
    // push to order page
  };

  return (
    <CartItem>
      <CartItemHeader>
        <CartItemHeaderLogo>
          <ShoppingBasketIcon />
          <p>Belanja</p>
        </CartItemHeaderLogo>
        <CartItemHeaderStatus>
          <p>{product.status}</p>
        </CartItemHeaderStatus>
      </CartItemHeader>
      <CartContent>
        <CartProduct>
          <CartContentIcon>
            <ShoppingBasketIcon />
          </CartContentIcon>
          <CartContentProduct>
            <CartContentProductDetails>
              <p className="productName">{product.name}</p>
              <p className="productBrand">{product.brand}</p>
            </CartContentProductDetails>
            <CartContentProductQty>
              <p className="productQty">Qty: {product.qty}</p>
            </CartContentProductQty>
          </CartContentProduct>
        </CartProduct>
        <CartContentProductPrice>
          <p>{formatPrice(product.price)}</p>
        </CartContentProductPrice>
      </CartContent>
      <CartDetails>
        <CartTotal>
          <p>Total:</p>
          <h3>{formatPrice(totalPrice)}</h3>
        </CartTotal>
        <CartButton>
          {product.review && (
            <CartButtonReview onClick={handleReviewClick}>
              Review
            </CartButtonReview>
          )}
          {product.order && (
            <CartButtonOrder onClick={handleOrderAgainClick}>
              Order Again
            </CartButtonOrder>
          )}
        </CartButton>
      </CartDetails>
    </CartItem>
  );
};
