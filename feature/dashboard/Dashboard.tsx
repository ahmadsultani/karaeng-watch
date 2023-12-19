"use client";

import { useEffect, useState } from "react";
import { DashboardWrapper, StatCardsWrapper, TableContainer } from "./styles";
import toast from "react-hot-toast";
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
import { getCollectionSize, getTotalRevenue } from "./service";
import { OrderChart } from "./components/OrderChart";

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
        const brandCount = await getCollectionSize("brand");
        const productCount = await getCollectionSize("product");
        const orderCount = await getCollectionSize("order");
        const orderTotalPrice = await getTotalRevenue();

        setCounts([
          {
            label: "Brand",
            value: brandCount,
            icon: <SellOutlined fontSize="inherit" />,
          },
          {
            label: "Product",
            value: productCount,
            icon: <InventoryOutlined fontSize="inherit" />,
          },
          {
            label: "Order",
            value: orderCount,
            icon: <ShoppingCartOutlined fontSize="inherit" />,
          },
          {
            label: "Total Earnings",
            value: `${formatNumber(orderTotalPrice)}`,
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
        <Box boxShadow={"0 0 1px 0 rgba(0,0,0,0.4)"} padding="12px">
          <Typography variant="h6">Daily Order Count</Typography>
          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <OrderChart />
          </Box>
        </Box>
        <Box
          boxShadow={"0 0 1px 0 rgba(0,0,0,0.4)"}
          padding="12px"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          overflow="hidden"
        >
          <Typography variant="h6">Product List</Typography>
          <ProductAdmin isDashboard />
        </Box>
      </TableContainer>
    </DashboardWrapper>
  );
};
