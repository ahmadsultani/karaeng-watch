"use client";

import { CartTable } from "./components/Table";
import { CheckoutButton, Container } from "./components/Card/styles";
import { Box, CircularProgress, Typography } from "@mui/material";
import { CartTotal } from "./components/Card/CardTotal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllCart } from "./service";
import { EmptyWrapper } from "@/components/Wrapper/styles";
import { useState } from "react";
import toast from "react-hot-toast";
import { checkout } from "../order/service";
import { IUser } from "@/interfaces/user";
import Cookies from "js-cookie";
import { Modal } from "@/components/Modal";
import { useRouter } from "next/navigation";

export const Cart = () => {
  const userCookies = Cookies.get("user");
  const user = userCookies ? (JSON.parse(userCookies) as IUser) : undefined;

  const [isOpenModalCheckout, setIsOpenModalCheckout] = useState(false);
  const router = useRouter();

  const {
    data: cart,
    isLoading: isLoadingCart,
    isError: isErrorCart,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getAllCart,
  });

  const { mutateAsync } = useMutation({
    mutationKey: ["order"],
    mutationFn: checkout,
    onMutate: () => {
      toast.loading("Loading...");
    },
    onSuccess: (id) => {
      toast.dismiss();
      toast.success("Thanks for your order!");
      router.push(`order/${id}`);
    },
  });

  const handleCheckout = async () => {
    if (!user || !cart) return;

    if (!user.emailVerified) {
      router.push("/setting/profile");
      toast.error("You need to verify email first");
      return;
    }

    const orderProducts = cart.cart.map((item) => {
      return {
        product: item.product,
        price: item.product.price,
        quantity: item.quantity,
      };
    });

    await mutateAsync({
      products: orderProducts,
      totalPrice: cart.totalPrice || 0,
      isReviewed: false,
      status: "waiting",
      userID: user.uid,
      user,
    });
  };

  return (
    <Container>
      {isLoadingCart ? (
        <EmptyWrapper>
          <CircularProgress />
        </EmptyWrapper>
      ) : isErrorCart ? (
        <EmptyWrapper>
          <Typography>{error.message}</Typography>
        </EmptyWrapper>
      ) : (
        <>
          <CartTable data={cart?.cart} />
          {cart?.cart && cart.cart.length > 0 && (
            <Box width="100%" display="flex" justifyContent="flex-end">
              <Box display="grid">
                <CartTotal totalSum={cart?.totalPrice || 0} />
                <CheckoutButton
                  onClick={() => setIsOpenModalCheckout(true)}
                  disabled={!user || !cart}
                >
                  Checkout
                </CheckoutButton>
              </Box>

              <Modal
                onComplete={handleCheckout}
                type="ok"
                isOpen={isOpenModalCheckout}
                onClose={() => setIsOpenModalCheckout(false)}
                title="Checkout"
              >
                <Typography width="400px">
                  Are you sure to checkout all of your cart?
                </Typography>
              </Modal>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};
