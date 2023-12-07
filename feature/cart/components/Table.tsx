import {
  Box,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import * as CartCard from "./Card/styles";
import { EmptyCart } from "./EmptyCart/EmptyCart";
import { CartItem } from "./Card/CardItem";
import { ICart } from "@/interfaces/cart";
import { updateCartQuantity } from "../service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FirebaseError } from "firebase/app";

interface CartProps {
  data?: ICart[];
}

export const CartTable: React.FC<CartProps> = ({ data }) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation<
    void,
    FirebaseError,
    { id: string; type: "increase" | "decrease" | "delete" }
  >({
    mutationFn: ({ id, type }) => updateCartQuantity(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const handleIncrease = async (id: string) => {
    if (!data) return;
    await mutateAsync({ id, type: "increase" });
  };

  const handleDecrease = async (id: string, quantity: number) => {
    if (!data) return;
    await mutateAsync({ id, type: quantity <= 1 ? "delete" : "decrease" });
  };

  return (
    <Box
      component={Paper}
      boxShadow="none"
      width="100%"
      sx={{ overflowX: "auto" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <CartCard.StyledTableCell>
              <CartCard.ProductContent>Product</CartCard.ProductContent>
            </CartCard.StyledTableCell>
            <CartCard.StyledTableCell align="right">
              <CartCard.ProductContent>Price</CartCard.ProductContent>
            </CartCard.StyledTableCell>
            <CartCard.StyledTableCell>
              <CartCard.ProductContent>Quantity</CartCard.ProductContent>
            </CartCard.StyledTableCell>
            <CartCard.StyledTableCell align="right">
              <CartCard.ProductContent>Total</CartCard.ProductContent>
            </CartCard.StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((cart) => (
              <CartItem
                key={cart.id}
                product={cart.product}
                quantity={cart.quantity}
                onIncrease={() => handleIncrease(cart.id)}
                onDecrease={() => handleDecrease(cart.id, cart.quantity)}
              />
            ))
          ) : (
            <TableRow>
              <CartCard.TableBorderNone colSpan={4}>
                <EmptyCart />
              </CartCard.TableBorderNone>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};
