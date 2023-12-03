import * as OrderCard from "./styles";
import { Typography } from "@mui/material";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { formatPrice } from "@/utils/formatter";
import ProductBox from "../ProductBox";
import { IProduct } from "@/interfaces/product";

interface CardProps {
  id: string;
  status: string;
  isReviewed?: boolean | undefined;
  order?: boolean | undefined;
  products: IProduct[];
}

export const Card: React.FC<CardProps> = ({ products, status, isReviewed }) => {
  const total = products.reduce((acc, product) => acc + product.price, 0);

  const handleReviewClick = () => {
    // push to review page
  };

  const handleOrderAgainClick = () => {
    // push to order page
  };

  const handleViewDetailsClick = () => {
    // setPopupVisible(true);
  };

  status = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <OrderCard.Item>
      <OrderCard.ItemHeader>
        <OrderCard.ItemHeaderLogo>
          <ShoppingBasketIcon />
          <Typography className="logo">Belanja</Typography>
        </OrderCard.ItemHeaderLogo>
        <OrderCard.ItemHeaderStatus>
          <Typography className="status">{status}</Typography>
        </OrderCard.ItemHeaderStatus>
      </OrderCard.ItemHeader>

      <ProductBox products={products} />

      <OrderCard.Details>
        <OrderCard.Total>
          <Typography className="total">Total:</Typography>
          <Typography className="totalPrice">{formatPrice(total)}</Typography>
        </OrderCard.Total>

        <OrderCard.ButtonGroup>
          <OrderCard.ButtonDetail
            variant="text"
            onClick={handleViewDetailsClick}
          >
            View Details
          </OrderCard.ButtonDetail>
          {isReviewed && (
            <OrderCard.ButtonReview onClick={handleReviewClick}>
              Review
            </OrderCard.ButtonReview>
          )}
          <OrderCard.ButtonOrder
            variant="outlined"
            onClick={handleOrderAgainClick}
          >
            Order Again
          </OrderCard.ButtonOrder>
        </OrderCard.ButtonGroup>
      </OrderCard.Details>
    </OrderCard.Item>
  );
};
