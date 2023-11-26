import React, { useState } from "react";
import Image from "next/image";
import {
  ArrowButton,
  DividerLine,
  Gallery,
  GalleryContainer,
  ImgCont,
  MiniGallery,
  MiniGalleryContainer,
  ProductButtonGroup,
  ProductButtons,
  ProductName,
  ProductOverviews,
  ProductOverviewsWrapper,
  ProductSpecsWrapper,
  RatingContainer,
  ReviewsWrapper,
  SpecsDetail,
  SpecsGrid,
  SpecsSection,
  UserReviewInputLabel,
  UsersReviewsWrapper,
} from "./styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Box, Rating, Typography, TextField, Button } from "@mui/material";
import { ReviewCard } from "./ReviewCard";

interface ProductDetailProps {}

export const ProductDetail: React.FC<ProductDetailProps> = () => {
  const testStock: number = 0;

  const [carrousel, setCarrousel] = useState(0);
  const [userRating, setUserRating] = React.useState<number | null>(0);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isReviewing, setIsReviewing] = useState(true);
  const [reviewComment, setReviewComment] = useState("");
  const handleNextButton = () => {
    if (carrousel < carrouselList.length - 1) {
      setCarrousel(carrousel + 1);
    } else {
      return;
    }
  };
  const handlePrevButton = () => {
    if (carrousel > 0) {
      setCarrousel(carrousel - 1);
    } else {
      return;
    }
  };

  return (
    <>
      <ProductOverviewsWrapper>
        <GalleryContainer>
          <Gallery>
            <ArrowButton
              disabled={carrousel === 0}
              title="Previous"
              onClick={handlePrevButton}
            >
              <ArrowForwardIosIcon
                style={{ transform: "rotate(180deg)" }}
              ></ArrowForwardIosIcon>
            </ArrowButton>
            {carrouselList.map(
              (map, index) =>
                index === carrousel && (
                  <ImgCont key={index} title={map.title}>
                    <Image
                      draggable={false}
                      src={map.source}
                      alt="product-images"
                      fill
                      priority
                      objectFit="contain"
                    />
                  </ImgCont>
                ),
            )}
            <ArrowButton
              disabled={carrousel === carrouselList.length - 1}
              title="Next"
              onClick={handleNextButton}
            >
              <ArrowForwardIosIcon></ArrowForwardIosIcon>
            </ArrowButton>
          </Gallery>
          <MiniGalleryContainer>
            {carrouselList.map(
              (map, index) =>
                index !== carrousel && (
                  <MiniGallery
                    onClick={() => setCarrousel(index)}
                    key={index}
                    title={map.title}
                  >
                    <ImgCont>
                      <Image
                        src={map.source}
                        alt="product-images"
                        fill
                        priority
                        objectFit="contain"
                      />
                    </ImgCont>
                  </MiniGallery>
                ),
            )}
          </MiniGalleryContainer>
        </GalleryContainer>
        <ProductOverviews>
          <Box display="flex" flexDirection={"column"} gap="16px">
            <ProductName fontSize={"44px"} color={"black"}>
              Centrix Automatic Diamonds
            </ProductName>
            <Typography fontSize={"32px"} color={"black"}>
              IDR 43,460,000.00
            </Typography>
            <RatingContainer>
              <RatingContainer>
                <Rating name="Rating" readOnly value={userRating} />
              </RatingContainer>
              <Typography color={"primary"} fontSize={"18px"}>
                {userRating}
              </Typography>
              <Typography color={"primary"} fontSize={"18px"}>
                (4582)
              </Typography>
            </RatingContainer>
            <Typography color={"gray"} fontSize={"18px"}>
              {testStock === 0 ? "Out Of Stock" : `Stock : ${testStock}`}
            </Typography>
          </Box>
          <ProductButtonGroup>
            <ProductButtons color="secondary">
              <Typography fontSize={"18px"}>Add To Cart</Typography>
              <ShoppingCartOutlined />
            </ProductButtons>
            <ProductButtons
              onClick={() => setIsPurchased(!isPurchased)}
              color="primary"
            >
              <Typography fontSize={"18px"}>Buy Now</Typography>
            </ProductButtons>
          </ProductButtonGroup>
        </ProductOverviews>
      </ProductOverviewsWrapper>
      <ProductSpecsWrapper>
        <Box display="flex" alignItems="center" width="100%" gap="8px">
          <DividerLine bgcolor={"white"} />
          <Typography fontSize="14px" color="white">
            Spesification
          </Typography>
          <DividerLine bgcolor={"white"} />
        </Box>
        <SpecsGrid>
          <SpecsSection>
            <Typography fontWeight={"700"}>General</Typography>
            <SpecsDetail>
              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Product Name</strong>: Centrix Automatic Diamonds
              </Typography>
              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Brand</strong>: Rado
              </Typography>
              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Gender</strong>: Unisex
              </Typography>
              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Bracelet Materials</strong>: High-Tech Ceramic
              </Typography>
              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Stock</strong>:{" "}
                {testStock <= 0 ? "Out Of Stock" : testStock}
              </Typography>
            </SpecsDetail>
          </SpecsSection>
          <SpecsSection>
            <Typography>Movement</Typography>
            <SpecsDetail>
              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Type</strong>: Automatic
              </Typography>

              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Power Reserve</strong>: 80 hours
              </Typography>
              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Movement Reference</strong>: 03.763.242
              </Typography>
            </SpecsDetail>
          </SpecsSection>
          <SpecsSection>
            <Typography>Case</Typography>
            <SpecsDetail>
              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Case Material</strong>: Stainless Steel,Stainless Steel
                / PVD
              </Typography>

              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Case Thickness</strong>: 11.3 mm
              </Typography>
              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Water Resistance</strong>: Yes
              </Typography>
              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Case Water Resistance</strong>: 5 bar (50m)
              </Typography>
              <Typography fontSize={"16px"} fontWeight={"300"}>
                <strong>Case Dimension</strong>: 39.5 mm
              </Typography>
            </SpecsDetail>
          </SpecsSection>
        </SpecsGrid>
      </ProductSpecsWrapper>
      <ReviewsWrapper>
        <Box display="flex" alignItems="center" width="100%" gap="8px">
          <DividerLine bgcolor={"secondary.main"} />
          <Typography
            minWidth={"max-content"}
            fontSize="14px"
            color="secondary.main"
          >
            Your Review
          </Typography>
          <DividerLine bgcolor={"secondary.main"} />
        </Box>
        {/* Current User Review */}
        {isPurchased ? (
          <UsersReviewsWrapper>
            {isReviewing ? (
              <>
                <UserReviewInputLabel>
                  <Typography fontSize={"18px"}>Rating :</Typography>
                  <Box display={"flex"} gap={"8px"} alignItems={"center"}>
                    <Box display={"flex"} flexDirection={"row"}>
                      <Rating
                        name="simple-controlled"
                        value={userRating}
                        readOnly={!isReviewing}
                        onChange={(event, newValue) => {
                          setUserRating(newValue);
                        }}
                      />
                    </Box>
                    <Typography
                      color={userRating !== 0 ? "primary" : "disabled"}
                    >
                      {userRating ? `${userRating}.00` : "0.00"}
                    </Typography>
                  </Box>
                </UserReviewInputLabel>
                <UserReviewInputLabel>
                  <Typography fontSize={"18px"}>Comments :</Typography>
                  <TextField
                    fullWidth
                    id="filled-multiline-static"
                    label="Leave Your Review Here (Optional)"
                    multiline
                    rows={4}
                    variant="filled"
                    defaultValue={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                  />
                </UserReviewInputLabel>
              </>
            ) : (
              <ReviewCard
                avatar="/images/auth-bg.webp"
                comment={reviewComment}
                rating={userRating}
              />
            )}
            <Button onClick={() => setIsReviewing(!isReviewing)} variant="text">
              <Typography fontSize={"18px"} fontWeight={"300"}>
                {isReviewing ? "Submit" : "Edit Your Review"}
              </Typography>
            </Button>
          </UsersReviewsWrapper>
        ) : (
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            padding={"12px"}
          >
            <Typography color={"gray"} fontWeight={"300"} fontSize={"18px"}>
              Purchase the product to make a review
            </Typography>
          </Box>
        )}

        <Box display="flex" alignItems="center" width="100%" gap="8px">
          <DividerLine bgcolor={"secondary.main"} />
          <Typography
            minWidth={"max-content"}
            fontSize="14px"
            color="secondary.main"
          >
            Other Review
          </Typography>
          <DividerLine bgcolor={"secondary.main"} />
        </Box>
        <UsersReviewsWrapper>
          <ReviewCard
            avatar="/images/auth-bg.webp"
            rating={4}
            comment="adukasdjaksd asdnasd"
          />
        </UsersReviewsWrapper>
      </ReviewsWrapper>
    </>
  );
};

const carrouselList = [
  {
    source: "/images/Perspective main.png",
    title: "Main Perspective",
  },
  {
    source: "/images/Perspective 2.png",
    title: "Perspective 2",
  },
  {
    source: "/images/Perspective 3.png",
    title: "Perspective 3",
  },
  {
    source: "/images/Perspective 4.png",
    title: "Perspective 4",
  },
  {
    source: "/images/Perspective 5.png",
    title: "Perspective 5",
  },
];
