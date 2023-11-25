import React from "react";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import { CustomTab } from "../styles";

interface TabsNavigationProps {
  value: number;
  onChange: (_event: React.SyntheticEvent, newValue: number) => void;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ value, onChange }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={value} onChange={onChange} aria-label="basic tabs example">
        <CustomTab label="Waiting" />
        <CustomTab label="Delivered" />
        <CustomTab label="Done" />
        <CustomTab label="Canceled" />
      </Tabs>
    </Box>
  );
};

export default TabsNavigation;
