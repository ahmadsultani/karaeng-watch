import { Avatar, Box, Rating, Typography } from "@mui/material";
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
  return (
    <ReviewCardWrapper>
      <Box display={"flex"} gap={"12px"}>
        <Avatar alt="Remy Sharp" src={avatar} sx={{ width: 80, height: 80 }} />
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          padding={"8px"}
        >
          <Typography fontSize={"18px"}>NPC</Typography>
          <Box display={"flex"} gap="24px" alignItems={"center"}>
            <Rating readOnly value={rating} />
            <Typography fontSize={"12px"}>7 Days Ago</Typography>
          </Box>
        </Box>
      </Box>
      <Typography fontSize={"16px"}>{comment}</Typography>
    </ReviewCardWrapper>
  );
};
