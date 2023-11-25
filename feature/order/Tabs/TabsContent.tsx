// TabsContent.tsx

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Waiting } from "../Waiting";
import { Delivered } from "../Deliverd";
import { Done } from "../Done";
import { Canceled } from "../Canceled";

interface TabsContentProps {
  value: number;
  index: number;
}

const TabsContent: React.FC<TabsContentProps> = ({ value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`basic-tabs-${index}`}
      aria-labelledby={`basic-tabs-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>
            {index === 0 && <Waiting />}
            {index === 1 && <Delivered />}
            {index === 2 && <Done />}
            {index === 3 && <Canceled />}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default TabsContent;
