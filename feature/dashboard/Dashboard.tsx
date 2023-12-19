"use client";

import { useEffect, useState } from "react";
import { DashboardWrapper, StatCardsWrapper, TableContainer } from "./styles";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "@/config/firebase";
import { StatsCard } from "./components/StatsCard";
import {
  InventoryOutlined,
  PaidOutlined,
  SellOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { formatNumber } from "@/utils/formatter";
import { Box, Typography } from "@mui/material";
import ProductAdmin from "../product/ProductAdmin";

interface DashboardProps {}

interface Count {
  label: string;
  value: number | undefined | string;
  icon: React.ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = () => {
  const [counts, setCounts] = useState<Count[]>([
    {
      label: "Brand",
      value: undefined,
      icon: <SellOutlined fontSize="inherit" />,
    },
    {
      label: "Product",
      value: undefined,
      icon: <InventoryOutlined fontSize="inherit" />,
    },
    {
      label: "Order",
      value: undefined,
      icon: <ShoppingCartOutlined fontSize="inherit" />,
    },
    {
      label: "Total Earnings",
      value: undefined,
      icon: <PaidOutlined fontSize="inherit" />,
    },
  ]);

  useEffect(() => {
    const fetchCollectionCount = async () => {
      try {
        const BrandRef = collection(db, "brand");
        const ProductRef = collection(db, "product");
        const OrderRef = collection(db, "order");

        const BrandSnapshot = await getDocs(BrandRef);
        const BrandDoccount = BrandSnapshot.size;
        const ProductSnapshot = await getDocs(ProductRef);
        const ProductDoccount = ProductSnapshot.size;
        const OrderSnapshot = await getDocs(OrderRef);
        const OrderDocs = OrderSnapshot.docs;

        let orderTotalPrice = 0;

        OrderDocs.forEach((doc) => {
          const orderData = doc.data();
          if (orderData.status === "done" || orderData.status === "delivered") {
            orderTotalPrice += orderData.totalPrice;
          }
        });

        setCounts([
          {
            label: "Brand",
            value: BrandDoccount,
            icon: <SellOutlined fontSize="inherit" />,
          },
          {
            label: "Product",
            value: ProductDoccount,
            icon: <InventoryOutlined fontSize="inherit" />,
          },
          {
            label: "Order",
            value: OrderDocs.length,
            icon: <ShoppingCartOutlined fontSize="inherit" />,
          },
          {
            label: "Total Earnings",
            value: `IDR ${formatNumber(orderTotalPrice)}`,
            icon: <PaidOutlined fontSize="inherit" />,
          },
        ]);
      } catch (error) {
        toast.error("Error Fetching Data");
      }
    };

    fetchCollectionCount();
  }, []);

  return (
    <DashboardWrapper>
      <StatCardsWrapper>
        {counts.map((count) => (
          <StatsCard
            key={count.label}
            value={count.value}
            label={count.label}
            icon={count.icon}
          />
        ))}
      </StatCardsWrapper>
      <TableContainer>
        <Box boxShadow={"0 0 1px 0 rgba(0,0,0,0.4)"}>Graphic Here</Box>
        <Box
          boxShadow={"0 0 1px 0 rgba(0,0,0,0.4)"}
          overflow={"hidden"}
          position={"relative"}
        >
          <Typography
            position={"absolute"}
            top={"20px"}
            left={"12px"}
            fontSize={"12px"}
            fontWeight={"300"}
            zIndex={1000000}
          >
            Product Table
          </Typography>
          <ProductAdmin isDashboard />
        </Box>
      </TableContainer>
    </DashboardWrapper>
  );
};
