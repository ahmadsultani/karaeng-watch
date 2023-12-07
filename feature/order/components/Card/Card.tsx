import * as OrderCard from "./styles";
import { Typography } from "@mui/material";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import { formatPrice } from "@/utils/formatter";
import ProductBox from "../ProductBox";
import { useMutation } from "@tanstack/react-query";
import { orderAgain } from "../../service";
import { IOrder } from "@/interfaces/order";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Card: React.FC<IOrder> = ({
  products,
  status,
  isReviewed,
  ...rest
}) => {
  const router = useRouter();
  const total = products.reduce((acc, p) => acc + p.product.price, 0);

  const { mutateAsync: mutateOrderAgain } = useMutation({
    mutationKey: ["order"],
    mutationFn: () =>
      orderAgain({
        products,
        status,
        isReviewed,
        ...rest,
      }),
    onMutate: () => {
      toast.loading("Ordering again...");
    },
    onSuccess: (id) => {
      toast.dismiss();
      toast.success("Succeed order again!");
      router.push(`/order/${id}`);
    },
  });

  const handleReviewClick = () => {};

  const handleViewDetailsClick = () => {
    // setPopupVisible(true);
  };

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
            onClick={handleViewDetailsClick}
          >
            View Details
          </OrderCard.ButtonDetail>
          {status === "done" && (
            <>
              {isReviewed && (
                <OrderCard.ButtonReview onClick={handleReviewClick}>
                  Review
                </OrderCard.ButtonReview>
              )}
              <OrderCard.ButtonOrder
                variant="outlined"
                onClick={() => mutateOrderAgain()}
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
