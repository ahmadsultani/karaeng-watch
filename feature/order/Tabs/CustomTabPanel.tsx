import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface CustomTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel: React.FC<CustomTabPanelProps> = ({
  children,
  value,
  index,
}) => {
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
};

export default CustomTabPanel;
