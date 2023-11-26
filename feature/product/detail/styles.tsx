import { styled, Box, IconButton, Button } from "@mui/material";

//Product Overviews
export const ProductOverviewsWrapper = styled(Box)({
  padding: "64px",
  display: "flex",
  gap: "64px",
  width: "100%",
  height: "100%",
  flexDirection: "row",
  ["@media (max-width: 1024px)"]: {
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  ["@media (max-width: 768px)"]: {
    flexDirection: "column-reverse",
    alignItems: "center",
  },
});

export const ProductName = styled(Box)({
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  height: "min-content",
});

export const ProductOverviews = styled(Box)({
  display: "flex",
  padding: "32px 0px ",
  flexDirection: "column",
  gap: "64px",
  width: "100%",
});

export const Gallery = styled(Box)({
  width: "520px",
  height: "520px",
  border: "2px solid var(--Light-Grey, #F5F5F5)",
  display: "flex",
  gap: "0",
  userSelect: "none",
  padding: "60px 0px",
  alignItems: "center",
  transition: "transform 0.5s ease",
  ["@media (max-width: 1024px)"]: {
    width: "100%",
    height: "300px",
  },
  ["@media (max-width: 768px)"]: {
    width: "100%",
    height: "300px",
  },
});

export const GalleryContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "min-content",
  gap: "24px",
});

export const MiniGallery = styled(Box)({
  minWidth: "112px",
  height: "112px",
  border: "2px solid var(--Light-Grey, #F5F5F5)",
  display: "flex",
  padding: "8px",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  userSelect: "none",
  cursor: "pointer",
  transition: "200ms",
  "&:hover": {
    boxShadow: "0px 0px 3px 0px rgba(100, 100, 100, 0.5)",
  },
});

export const MiniGalleryContainer = styled(Box)({
  width: "520px",
  display: "flex",
  gap: "24px",
  alignSelf: "center",
});

export const ImgCont = styled(Box)({
  width: "100%",
  transition: "200ms",
  height: "100%",
  position: "relative",
  "&:hover": {
    scale: "120%",
    transition: "200ms",
  },
});

export const ArrowButton = styled(IconButton)({
  width: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60px",
  borderRadius: "0",
});

export const RatingContainer = styled(Box)({
  display: "flex",
  gap: "8px",
});

export const ProductButtonGroup = styled(Box)({
  display: "flex",
  width: "100%",
  gap: "36px",
});

export const ProductButtons = styled(Button)({
  padding: "16px",
  maxWidth: "346px",
  width: "100%",
  fontWeight: "300",
  display: "flex",
  gap: "12px",
});

//ProductSpecs
export const ProductSpecsWrapper = styled(Box)({
  padding: "32px 64px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "black",
});

export const DividerLine = styled(Box)({
  width: "100%",
  height: "1px",
});

export const SpecsGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  color: "white",
});

export const SpecsSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "8px",
  gap: "12px",
});

export const SpecsDetail = styled(Box)({
  display: "flex",
  flexDirection: "column",
  fontWeight: "300",
});

export const ReviewsWrapper = styled(Box)({
  padding: "32px 64px",
  gap: "24px",
  display: "flex",
  flexDirection: "column",
});

export const UsersReviewsWrapper = styled(Box)({
  display: "flex",
  padding: "12px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "24px",
});

export const UserReviewInputLabel = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
});

export const OtherReviewGroup = styled(Box)({
  display: "flex",
  gap: "24px",
});

//reviewCard
export const ReviewCardWrapper = styled(Box)({
  padding: "12px",
  gap: "24px",
  display: "flex",
  flexDirection: "column",
});
