import { Box } from "@mui/material";

interface ImageContainerProps {
  children: React.ReactNode;
  size: string;
}

export const ImageContainer: React.FC<ImageContainerProps> = ({
  children,
  size,
}) => {
  return (
    <Box
      position="relative"
      zIndex={10}
      width={size}
      height={size}
      sx={{
        aspectRatio: "auto",
      }}
    >
      {children}
    </Box>
  );
};
