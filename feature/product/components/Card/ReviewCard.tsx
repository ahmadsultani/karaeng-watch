import { Avatar, Box, Rating, Typography, useMediaQuery } from "@mui/material";
import { ReviewCardWrapper } from "./styles";

interface ReviewCardProps {
  avatar: string;
  comment: string;
  rating: number | null;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  avatar,
  comment,
  rating,
}) => {
  const small = useMediaQuery("(max-width:768px)");
  return (
    <ReviewCardWrapper>
      <Box display={"flex"} gap={"12px"} alignItems={"center"}>
        <Avatar
          alt="Remy Sharp"
          src={avatar}
          sx={{ width: small ? 60 : 80, height: small ? 60 : 80 }}
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          padding={small ? "4px" : "8px"}
        >
          <Typography fontSize={small ? "14px" : "18px"}>NPC</Typography>
          <Box display={"flex"} gap="24px" alignItems={"center"}>
            <Rating readOnly value={rating} />
            <Typography hidden={small} fontSize={"12px"}>
              {/* date */}7 Days Ago
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography fontSize={"16px"}>{comment}</Typography>{" "}
      <Typography alignSelf={"flex-end"} hidden={!small} fontSize={"10px"}>
        {/* date */}7 Days Ago
      </Typography>
    </ReviewCardWrapper>
  );
};
