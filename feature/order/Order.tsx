import { useState } from "react";

import { OrderWrapper, OrderContainer, StyledTab } from "./styles";
import { Card } from "./Card";

import { order } from "./fakeOrderData";
import { Tabs } from "@mui/material";

export const Order = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const status = ["Waiting", "Delivered", "Done", "Canceled"];

  const orderFiltered = order.filter(
    (item) => item.status === status[activeTabIndex],
  );

  return (
    <OrderWrapper>
      <Tabs
        value={activeTabIndex}
        onChange={(_event, newValue) => setActiveTabIndex(newValue)}
        variant="scrollable"
      >
        <StyledTab label="Waiting" />
        <StyledTab label="Delivered" />
        <StyledTab label="Done" />
        <StyledTab label="Canceled" />
      </Tabs>
      <OrderContainer>
        {orderFiltered.map((item) => (
          <Card {...item} key={item.id} />
        ))}
      </OrderContainer>
    </OrderWrapper>
  );
};
