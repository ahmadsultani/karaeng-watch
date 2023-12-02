import * as OrderCard from "./styles";
import { Typography } from "@mui/material";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { formatPrice } from "@/utils/formatter";

interface CardProps {
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

export const Card: React.FC<CardProps> = ({
  product,
  status,
  order,
  review,
}) => {
  const firstProduct = product[0];

  const products = product;
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

  const totalProducts = products.length;
  const remainingProducts = totalProducts > 1 ? totalProducts - 1 : 0;
  const moreProductsText =
    remainingProducts > 0 ? `+${remainingProducts} more products` : "";

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

      <OrderCard.Content>
        <OrderCard.Product>
          <OrderCard.ContentIcon>
            <ShoppingBasketIcon />
          </OrderCard.ContentIcon>
          <OrderCard.ContentProduct>
            <OrderCard.ContentProductDetails>
              <Typography className="productName">
                {firstProduct.name}
              </Typography>
              <Typography className="productBrand">
                {firstProduct.brand}
              </Typography>
            </OrderCard.ContentProductDetails>
            <OrderCard.ContentProductMore>
              <Typography className="productMore">
                {moreProductsText}
              </Typography>
            </OrderCard.ContentProductMore>
          </OrderCard.ContentProduct>
        </OrderCard.Product>

        <OrderCard.ContentProductPrice>
          <Typography>{formatPrice(firstProduct.price)}</Typography>
        </OrderCard.ContentProductPrice>
      </OrderCard.Content>

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
          {review && (
            <OrderCard.ButtonReview onClick={handleReviewClick}>
              Review
            </OrderCard.ButtonReview>
          )}
          {order && (
            <OrderCard.ButtonOrder
              variant="outlined"
              onClick={handleOrderAgainClick}
            >
              Order Again
            </OrderCard.ButtonOrder>
          )}
        </OrderCard.ButtonGroup>
      </OrderCard.Details>
    </OrderCard.Item>
  );
};