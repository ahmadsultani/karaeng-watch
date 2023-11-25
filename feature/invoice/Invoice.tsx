"use client";

import * as InvoiceCard from "./styles";

export const Invoice = () => {
  const products = [
    { name: "Product 1", brand: "Product Brand 1", price: 100, quantity: 2 },
    { name: "Product 1", brand: "Product Brand 1", price: 100, quantity: 2 },
  ];

  const taxRate = 0.35; // 35%
  const shipmentCost = 0; // Assuming no shipment cost

  // Calculate the total sum of all products
  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  // Calculate tax and total including tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shipmentCost;

  return (
    <InvoiceCard.Container>
      <InvoiceCard.Details>
        <InvoiceCard.DetailsUser>
          <InvoiceCard.DetailsUserTitle>
            <p>Billed To</p>
          </InvoiceCard.DetailsUserTitle>
          <InvoiceCard.DetailsUserContent>
            <p>Sappe</p>
            <p>Lamandau Street</p>
            <p>Makassar, South Sulawesi</p>
            <p>Indonesia</p>
            <p>90234</p>
          </InvoiceCard.DetailsUserContent>
        </InvoiceCard.DetailsUser>
        <InvoiceCard.DetailsCartWrapper>
          <InvoiceCard.DetailsCart>
            <InvoiceCard.DetailsCartTitle>
              <p>Invoice Number</p>
            </InvoiceCard.DetailsCartTitle>
            <InvoiceCard.DetailsCartContent>
              <p>INV/723187/KRW/8349284783</p>
            </InvoiceCard.DetailsCartContent>
          </InvoiceCard.DetailsCart>
          <InvoiceCard.DetailsCart>
            <InvoiceCard.DetailsCartTitle>
              <p>Date of Issue</p>
            </InvoiceCard.DetailsCartTitle>
            <InvoiceCard.DetailsCartContent>
              <p>11/08/2023</p>
            </InvoiceCard.DetailsCartContent>
          </InvoiceCard.DetailsCart>
        </InvoiceCard.DetailsCartWrapper>
      </InvoiceCard.Details>
      <InvoiceCard.Product>
        <InvoiceCard.ProductTitle>
          <InvoiceCard.ProductName>
            <p>Product</p>
          </InvoiceCard.ProductName>
          <InvoiceCard.ProductPrice>
            <p>Price</p>
          </InvoiceCard.ProductPrice>
          <InvoiceCard.ProductQty>
            <p>Quantity</p>
          </InvoiceCard.ProductQty>
          <InvoiceCard.ProductTotal>
            <p>Total</p>
          </InvoiceCard.ProductTotal>
        </InvoiceCard.ProductTitle>
        {products.map((product, index) => (
          <InvoiceCard.ProductContent key={index}>
            <InvoiceCard.ProductNameContent>
              <p>{product.name}</p>
              <p>{product.brand}</p>
            </InvoiceCard.ProductNameContent>
            <InvoiceCard.ProductPrice>
              <p>${product.price}</p>
            </InvoiceCard.ProductPrice>
            <InvoiceCard.ProductQty>
              <p>{product.quantity}</p>
            </InvoiceCard.ProductQty>
            <InvoiceCard.ProductTotal>
              <p>${product.price * product.quantity}</p>
            </InvoiceCard.ProductTotal>
          </InvoiceCard.ProductContent>
        ))}
      </InvoiceCard.Product>
      <InvoiceCard.Total>
        {[
          { title: "Subtotal", value: subtotal },
          { title: "Tax (35%)", value: tax },
          { title: "Shipment", value: shipmentCost },
          { title: "Total", value: total },
        ].map((item, index) => (
          <InvoiceCard.TotalContent key={index}>
            <InvoiceCard.TotalContentTitle>
              <p>{item.title}</p>
            </InvoiceCard.TotalContentTitle>
            <InvoiceCard.TotalContentValue>
              <p>${item.value}</p>
            </InvoiceCard.TotalContentValue>
          </InvoiceCard.TotalContent>
        ))}
      </InvoiceCard.Total>
    </InvoiceCard.Container>
  );
};
