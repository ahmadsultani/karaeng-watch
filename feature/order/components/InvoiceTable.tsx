import {
  Box,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import * as CartCard from "./styles";
import { IProduct } from "@/interfaces/product"; // Assuming IProduct is the correct type for the product
import InvoiceTableItem from "./InvoiceTableItem";

interface InvoiceTableProps {
  data: {
    product: IProduct;
    quantity: number;
  }[];
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({ data }) => {
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
            <CartCard.StyledTableCell>
              <CartCard.ProductContent>Price</CartCard.ProductContent>
            </CartCard.StyledTableCell>
            <CartCard.StyledTableCell>
              <CartCard.ProductContent>Quantity</CartCard.ProductContent>
            </CartCard.StyledTableCell>
            <CartCard.StyledTableCell>
              <CartCard.ProductContent>Total Price</CartCard.ProductContent>
            </CartCard.StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <InvoiceTableItem
                key={index}
                product={item.product}
                quantity={item.quantity}
              />
            ))
          ) : (
            <TableRow>
              <CartCard.TableBorderNone colSpan={4}></CartCard.TableBorderNone>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};
