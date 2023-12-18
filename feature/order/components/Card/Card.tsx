import * as OrderCard from "./styles";
import { Typography } from "@mui/material";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { formatPrice } from "@/utils/formatter";
import ProductBox from "../ProductBox";
import { IOrder } from "@/interfaces/order";
import { useRouter } from "next/navigation";
import { useOrder } from "@/feature/order";

export const Card: React.FC<IOrder> = ({
  id,
  products,
  status,
  isReviewed,
  totalPrice,
  totalProduct,
  user,
}) => {
  const router = useRouter();
  const total = products.reduce((acc, p) => acc + p.product.price, 0);

  const { mutateCheckout } = useOrder();

  return (
    <OrderCard.Item>
      <OrderCard.ItemHeader>
        <OrderCard.ItemHeaderLogo>
          <ShoppingBasketIcon />
          <Typography className="logo">Belanja</Typography>
        </OrderCard.ItemHeaderLogo>
        <OrderCard.ItemHeaderStatus>
          <Typography className="status" textTransform="capitalize">
            {status}
          </Typography>
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
            onClick={() => router.push(`/order/${id}`)}
          >
            View Details
          </OrderCard.ButtonDetail>
          {status === "done" && (
            <>
              {isReviewed && (
                <OrderCard.ButtonReview>Review</OrderCard.ButtonReview>
              )}
              <OrderCard.ButtonOrder
                variant="outlined"
                onClick={() =>
                  mutateCheckout({
                    products,
                    totalPrice,
                    totalProduct,
                    user,
                  })
                }
              >
                Order Again
              </OrderCard.ButtonOrder>
            </>
          )}
        </OrderCard.ButtonGroup>
      </OrderCard.Details>
    </OrderCard.Item>
  );
};
