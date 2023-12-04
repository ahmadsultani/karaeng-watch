"use client";

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  Grid,
} from "@mui/material";

import * as InvoiceCard from "./styles";
import { formatPrice } from "@/utils/formatter";

export const Invoice = () => {
  const products = [
    {
      name: "ProGCGTKUVJ GCTKUKG VJGTULCYGHduct 1",
      brand: "Product Brand 1",
      price: 1000000000,
      quantity: 2,
    },
    {
      name: "Product 1",
      brand: "Product Brand 1",
      price: 1000000000,
      quantity: 2,
    },
  ];

  const user = {
    name: "Andi Farhan Sappewali",
    address1: "Lamandau Street",
    address2: "Makassar, South Sulawesi",
    address3: "Indonesia",
    postCode: 90234,
  };

  const cart = {
    id: "INV-000001",
    date: "29/09/2023",
  };

  const taxRate = 0.35;
  const shipmentCost = 0;

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  const tax = subtotal * taxRate;
  const total = subtotal + tax + shipmentCost;

  return (
    <InvoiceCard.Container>
      <Grid container justifyContent="space-between">
        <Grid>
          <InvoiceCard.DetailsUser>
            <InvoiceCard.DetailsUserTitle>
              <Typography>Billed To</Typography>
            </InvoiceCard.DetailsUserTitle>
            <InvoiceCard.DetailsUserContent>
              <Typography>{user.name}</Typography>
              <Typography>{user.address1}</Typography>
              <Typography>{user.address2}</Typography>
              <Typography>{user.address3}</Typography>
              <Typography>{user.postCode}</Typography>
            </InvoiceCard.DetailsUserContent>
          </InvoiceCard.DetailsUser>
        </Grid>
        <Grid>
          <InvoiceCard.DetailsUser>
            <InvoiceCard.DetailsUserWrapper>
              <InvoiceCard.DetailsUserTitle>
                <Typography>Invoice Number</Typography>
              </InvoiceCard.DetailsUserTitle>
              <InvoiceCard.DetailsUserContent>
                <Typography>{cart.id}</Typography>
              </InvoiceCard.DetailsUserContent>
            </InvoiceCard.DetailsUserWrapper>
            <InvoiceCard.DetailsUserWrapper>
              <InvoiceCard.DetailsUserTitle>
                <Typography>Date of Issue</Typography>
              </InvoiceCard.DetailsUserTitle>
              <InvoiceCard.DetailsUserContent>
                <Typography>{cart.date}</Typography>
              </InvoiceCard.DetailsUserContent>
            </InvoiceCard.DetailsUserWrapper>
          </InvoiceCard.DetailsUser>
        </Grid>
      </Grid>

      <Box
        component={Paper}
        boxShadow="none"
        width="100%"
        sx={{ overflowX: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <InvoiceCard.StyledTableCell>
                <InvoiceCard.ProductContent>Product</InvoiceCard.ProductContent>
              </InvoiceCard.StyledTableCell>
              <InvoiceCard.StyledTableCell align="right">
                <InvoiceCard.ProductContent>Price</InvoiceCard.ProductContent>
              </InvoiceCard.StyledTableCell>
              <InvoiceCard.StyledTableCell>
                <InvoiceCard.ProductContent>
                  Quantity
                </InvoiceCard.ProductContent>
              </InvoiceCard.StyledTableCell>
              <InvoiceCard.StyledTableCell align="right">
                <InvoiceCard.ProductContent>Total</InvoiceCard.ProductContent>
              </InvoiceCard.StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <InvoiceCard.StyledTableCell>
                  <InvoiceCard.ProductNameContent>
                    <Typography>{product.name}</Typography>
                    <Typography>{product.brand}</Typography>
                  </InvoiceCard.ProductNameContent>
                </InvoiceCard.StyledTableCell>
                <InvoiceCard.StyledTableCell align="right">
                  <InvoiceCard.ProductContent>
                    {formatPrice(product.price)}
                  </InvoiceCard.ProductContent>
                </InvoiceCard.StyledTableCell>
                <InvoiceCard.StyledTableCell>
                  <InvoiceCard.ProductContent>
                    {product.quantity}
                  </InvoiceCard.ProductContent>
                </InvoiceCard.StyledTableCell>
                <InvoiceCard.StyledTableCell align="right">
                  <InvoiceCard.ProductContent>
                    {formatPrice(product.price * product.quantity)}
                  </InvoiceCard.ProductContent>
                </InvoiceCard.StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <InvoiceCard.Total>
        {[
          { title: "Subtotal", value: subtotal },
          { title: "Tax (35%)", value: tax },
          { title: "Shipment", value: shipmentCost },
          { title: "Total", value: total },
        ].map((item, index) => (
          <InvoiceCard.TotalContent key={index}>
            <InvoiceCard.TotalContentTitle>
              <Typography>{item.title}</Typography>
            </InvoiceCard.TotalContentTitle>
            <InvoiceCard.TotalContentValue>
              <Typography>{formatPrice(item.value)}</Typography>
            </InvoiceCard.TotalContentValue>
          </InvoiceCard.TotalContent>
        ))}
      </InvoiceCard.Total>
    </InvoiceCard.Container>
  );
};
