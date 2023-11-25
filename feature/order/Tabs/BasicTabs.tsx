import React from "react";
import Box from "@mui/material/Box";
import TabsNavigation from "./TabsNavigation";
import TabsContent from "./TabsContent";
import CustomTabPanel from "./CustomTabPanel";

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TabsNavigation value={value} onChange={handleChange} />
      <CustomTabPanel value={value} index={0}>
        <TabsContent value={value} index={0} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TabsContent value={value} index={1} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TabsContent value={value} index={2} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <TabsContent value={value} index={3} />
      </CustomTabPanel>
    </Box>
  );
}
