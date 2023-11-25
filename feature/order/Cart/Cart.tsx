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
  CartContentProductMore,
  CartContentProductPrice,
  CartProduct,
  CartDetails,
  CartTotal,
  CartButton,
  CartButtonDetails,
  CartButtonReview,
  CartButtonOrder,
} from "../styles";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

interface Cart {
  id: number;
  status: string;
  review?: boolean | undefined;
  order?: boolean | undefined;
  product: {
    name: string;
    brand: string;
    price: number;
  }[];
}

interface CartProps {
  cart: Cart;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export const Cart: React.FC<CartProps> = ({ cart }) => {
  const [isPopupVisible, setPopupVisible] = React.useState(false);

  const firstProduct = cart.product[0];

  const products = cart.product;
  const total = products.reduce((acc, product) => acc + product.price, 0);

  const handleReviewClick = () => {
    // push to review page
  };

  const handleOrderAgainClick = () => {
    // push to order page
  };

  const handleViewDetailsClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const totalProducts = products.length;
  const remainingProducts = totalProducts > 1 ? totalProducts - 1 : 0;
  const moreProductsText =
    remainingProducts > 0 ? `+${remainingProducts} more products` : "";

  return (
    <CartItem>
      <CartItemHeader>
        <CartItemHeaderLogo>
          <ShoppingBasketIcon />
          <p>Belanja</p>
        </CartItemHeaderLogo>
        <CartItemHeaderStatus>
          <p>{cart.status}</p>
        </CartItemHeaderStatus>
      </CartItemHeader>
      <CartContent>
        <CartProduct>
          <CartContentIcon>
            <ShoppingBasketIcon />
          </CartContentIcon>
          <CartContentProduct>
            <CartContentProductDetails>
              <p className="productName">{firstProduct.name}</p>
              <p className="productBrand">{firstProduct.brand}</p>
            </CartContentProductDetails>
            <CartContentProductMore>
              <p className="productMore">{moreProductsText}</p>
            </CartContentProductMore>
          </CartContentProduct>
        </CartProduct>
        <CartContentProductPrice>
          <p>{formatPrice(firstProduct.price)}</p>
        </CartContentProductPrice>
      </CartContent>
      <CartDetails>
        <CartTotal>
          <p>Total:</p>
          <p>{formatPrice(total)}</p>
        </CartTotal>
        <CartButton>
          <CartButtonDetails onClick={handleViewDetailsClick}>
            View Details
          </CartButtonDetails>
          {cart.review && (
            <CartButtonReview onClick={handleReviewClick}>
              Review
            </CartButtonReview>
          )}
          {cart.order && (
            <CartButtonOrder onClick={handleOrderAgainClick}>
              Order Again
            </CartButtonOrder>
          )}
        </CartButton>
      </CartDetails>
      {/* Popup */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            {/* Add content for your pop-up */}
            <p>This is the pop-up content</p>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </CartItem>
  );
};
