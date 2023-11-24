import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Waiting } from "./Waiting";
import { Delivered } from "./Deliverd";
import { Done } from "./Done";
import { Canceled } from "./Canceled";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`basic-tabs-${index}`}
      aria-labelledby={`basic-tabs-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          // variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Waiting"
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              textTransform: "none",
              color: "black",
            }}
          />
          <Tab
            label="Delivered"
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              textTransform: "none",
              color: "black",
            }}
          />
          <Tab
            label="Done"
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              textTransform: "none",
              color: "black",
            }}
          />
          <Tab
            label="Canceled"
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              textTransform: "none",
              color: "black",
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Waiting />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Delivered />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Done />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Canceled />
      </CustomTabPanel>
    </Box>
  );
}
