import { Box, Skeleton, Typography } from "@mui/material";
import { StatsCardContainer } from "../styles";

interface StatsCardProps {
  value: number | string | undefined;
  label: string;
  icon: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ value, icon, label }) => {
  return (
    <StatsCardContainer>
      <Box flex={1} display={"flex"} flexDirection={"column"} width={"100%"}>
        <Typography fontSize={"20px"} lineHeight={"24px"} fontWeight={500}>
          {value ? value : <Skeleton height={"24px"} width={"100%"} />}
        </Typography>
        <Typography fontSize={"12px"} lineHeight={"14px"}>
          {value ? label : <Skeleton height={"14px"} width={"100%"} />}
        </Typography>
      </Box>
      <Box display={"flex"}>
        <Typography
          fontSize="32px"
          display={"flex"}
          alignItems={"center"}
          color={"primary"}
        >
          {value ? icon : <Skeleton height={"32px"} width={"32px"} />}
        </Typography>
      </Box>
    </StatsCardContainer>
  );
};
