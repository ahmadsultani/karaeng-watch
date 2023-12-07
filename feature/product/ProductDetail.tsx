"use client";

import { ShoppingCartOutlined } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  CircularProgress,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ReviewCard } from "./components/Card/ReviewCard";
import * as Styles from "./styles";
import { useParams } from "next/navigation";
import { getOneProduct } from ".";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatPrice } from "@/utils/formatter";
import { EmptyWrapper } from "@/components/Wrapper/styles";
import { toast } from "react-hot-toast";
import { createOrderFromDetail } from "../order/service";
import { IUser } from "@/interfaces/user";
import { addToCart } from "../cart/service";
import { useRouter } from "next/navigation";
import { NotFound } from "../not-found";

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const userCookies = Cookies.get("user");
  const user = useMemo(() => {
    return JSON.parse(userCookies || "{}") as IUser;
  }, [userCookies]);
  const router = useRouter();

  const handleBuyNow = async () => {
    if (product && user) {
      try {
        if (!user.emailVerified) {
          router.push("/setting/profile");
          toast.error("You need to verify email first");
          return;
        }
        const id = (await createOrderFromDetail(user, product)) || ""; // Swapped arguments: user first, then product
        router.push(`/order/${id}`);
        toast.success("Order created successfully!"); // Notify user about successful order creation
      } catch (error) {
        toast.error("Error creating order");
      }
    } else {
      toast.error("User or product information is missing");
    }
  };

  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getOneProduct(id as string),
  });

  const { mutateAsync: mutateCart } = useMutation({
    mutationKey: ["cart"],
    mutationFn: addToCart,
    onMutate: () => {
      toast.loading("Adding to cart...");
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      toast.success("Added to cart");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  enum EProductStatus {
    LOADING,
    ERROR,
    SUCCESS,
  }

  const small = useMediaQuery("(max-width:768px)");

  const [carrousel, setCarrousel] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(0);
  const [isPurchased] = useState(false);
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

  const handleAddToCart = () => {
    if (!product) return;
    mutateCart({ productId: product.id, quantity: 1 });
  };

  const renderContent = (status: EProductStatus) => {
    switch (status) {
      case EProductStatus.ERROR:
        toast.error(error?.name || "Unknown Error");
        return <NotFound />;
      case EProductStatus.LOADING:
        return (
          <EmptyWrapper>
            <CircularProgress />
          </EmptyWrapper>
        );
      case EProductStatus.SUCCESS:
        return (
          <Styles.ProductDetailWrapper>
            <Styles.ProductOverviewsWrapper>
              <Styles.GalleryContainer>
                <Styles.Gallery>
                  <Styles.ArrowButton
                    disabled={carrousel === 0}
                    title="Previous"
                    onClick={handlePrevButton}
                  >
                    <ArrowForwardIosIcon
                      style={{ transform: "rotate(180deg)" }}
                    ></ArrowForwardIosIcon>
                  </Styles.ArrowButton>
                  {carrouselList.map(
                    (map, index) =>
                      index === carrousel && (
                        <Styles.ImgCont key={index} title={map.title}>
                          <Image
                            draggable={false}
                            src={map.source}
                            alt="product-images"
                            fill
                            priority
                            objectFit="contain"
                          />
                        </Styles.ImgCont>
                      ),
                  )}
                  <Styles.ArrowButton
                    disabled={carrousel === carrouselList.length - 1}
                    title="Next"
                    onClick={handleNextButton}
                  >
                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                  </Styles.ArrowButton>
                </Styles.Gallery>
                <Styles.MiniGalleryContainer>
                  {carrouselList.map(
                    (map, index) =>
                      index !== carrousel && (
                        <Styles.MiniGallery
                          onClick={() => setCarrousel(index)}
                          key={index}
                          title={map.title}
                        >
                          <Styles.ImgCont>
                            <Image
                              src={map.source}
                              alt="product-images"
                              fill
                              priority
                              objectFit="contain"
                            />
                          </Styles.ImgCont>
                        </Styles.MiniGallery>
                      ),
                  )}
                </Styles.MiniGalleryContainer>
              </Styles.GalleryContainer>
              <Styles.ProductOverviews>
                <Box display="flex" flexDirection={"column"} gap="16px">
                  <Styles.ProductName
                    fontSize={small ? "36px" : "44px"}
                    color={"black"}
                  >
                    {product?.name}
                  </Styles.ProductName>
                  <Typography
                    fontSize={small ? "24px" : "32px"}
                    color={"black"}
                  >
                    {formatPrice(product?.price || 0)}
                  </Typography>
                  <Styles.RatingContainer>
                    <Styles.RatingContainer>
                      <Rating name="Rating" readOnly value={userRating} />
                    </Styles.RatingContainer>
                    <Typography color={"primary"} fontSize={"18px"}>
                      {userRating}
                    </Typography>
                    <Typography color={"primary"} fontSize={"18px"}>
                      (4582)
                    </Typography>
                  </Styles.RatingContainer>
                  <Typography color={"gray"} fontSize={"18px"}>
                    {product?.stock
                      ? `${product?.stock} Product Left`
                      : "Out of Stock"}
                  </Typography>
                </Box>
                <Styles.ProductButtonGroup>
                  <Styles.ProductButtons
                    color="secondary"
                    onClick={handleAddToCart}
                  >
                    <Typography fontSize={"18px"}>Add To Cart</Typography>
                    <ShoppingCartOutlined />
                  </Styles.ProductButtons>
                  <Styles.ProductButtons
                    onClick={() => handleBuyNow()}
                    color="primary"
                  >
                    <Typography fontSize={"18px"}>Buy Now</Typography>
                  </Styles.ProductButtons>
                </Styles.ProductButtonGroup>
              </Styles.ProductOverviews>
            </Styles.ProductOverviewsWrapper>
            <Styles.ProductSpecsWrapper>
              <Box display="flex" alignItems="center" width="100%" gap="8px">
                <Styles.DividerLine bgcolor={"white"} />
                <Typography fontSize="14px" color="white">
                  Spesification
                </Typography>
                <Styles.DividerLine bgcolor={"white"} />
              </Box>
              <Styles.SpecsGrid>
                <Styles.SpecsSection>
                  <Typography fontWeight={"700"}>General</Typography>
                  <Styles.SpecsDetail>
                    <Typography fontSize={"16px"} fontWeight={"300"}>
                      <strong>Product Name</strong>: {product?.name}
                    </Typography>
                    <Typography fontSize={"16px"} fontWeight={"300"}>
                      <strong>Brand</strong>: {product?.brand?.name}
                    </Typography>
                    <Typography
                      textTransform={"capitalize"}
                      fontSize={"16px"}
                      fontWeight={"300"}
                    >
                      <strong>Gender</strong>: {product?.gender}
                    </Typography>
                    <Typography fontSize={"16px"} fontWeight={"300"}>
                      <strong>Bracelet Materials</strong>:{" "}
                      {product?.braceletMaterial}
                    </Typography>
                    <Typography fontSize={"16px"} fontWeight={"300"}>
                      <strong>Stock</strong>: {product?.stock || "Out of Stock"}
                    </Typography>
                  </Styles.SpecsDetail>
                </Styles.SpecsSection>
                <Styles.SpecsSection>
                  <Typography>Movement</Typography>
                  <Styles.SpecsDetail>
                    <Typography
                      textTransform={"capitalize"}
                      fontSize={"16px"}
                      fontWeight={"300"}
                    >
                      <strong>Type</strong>: {product?.types}
                    </Typography>

                    <Typography fontSize={"16px"} fontWeight={"300"}>
                      <strong>Power Reserve</strong>:{" "}
                      {product?.types === "quartz"
                        ? "-"
                        : `${product?.powerReserve} hours`}
                    </Typography>
                    <Typography fontSize={"16px"} fontWeight={"300"}>
                      <strong>Movement Reference</strong>:{" "}
                      {product?.movementReference}
                    </Typography>
                  </Styles.SpecsDetail>
                </Styles.SpecsSection>
                <Styles.SpecsSection>
                  <Typography>Case</Typography>
                  <Styles.SpecsDetail>
                    <Typography fontSize={"16px"} fontWeight={"300"}>
                      <strong>Case Material</strong>: {product?.caseMaterial}
                    </Typography>

                    <Typography fontSize={"16px"} fontWeight={"300"}>
                      <strong>Case Thickness</strong>:{" "}
                      {product?.caseThickness
                        ? `${product.caseThickness}`
                        : "-"}
                    </Typography>
                    <Typography fontSize={"16px"} fontWeight={"300"}>
                      <strong>Water Resistance</strong>:{" "}
                      {product?.waterResistance === 0 || undefined
                        ? "No"
                        : "Yes"}
                    </Typography>
                    <Typography fontSize={"16px"} fontWeight={"300"}>
                      <strong>Case Water Resistance</strong>:
                      {product?.waterResistance === 0 ||
                      product?.waterResistance === undefined
                        ? "-"
                        : ` (${
                            product.waterResistance / 10
                          } bar) ${product?.waterResistance} m`}
                    </Typography>
                    <Typography fontSize={"16px"} fontWeight={"300"}>
                      <strong>Case Dimension</strong>:{" "}
                      {product?.width !== product?.height
                        ? `${product?.height} mm x ${product?.width} mm`
                        : `${product?.width} mm`}
                    </Typography>
                  </Styles.SpecsDetail>
                </Styles.SpecsSection>
              </Styles.SpecsGrid>
            </Styles.ProductSpecsWrapper>
            <Styles.ReviewsWrapper>
              <Box display="flex" alignItems="center" width="100%" gap="8px">
                <Styles.DividerLine bgcolor={"secondary.main"} />
                <Typography
                  minWidth={"max-content"}
                  fontSize="14px"
                  color="secondary.main"
                >
                  Your Review
                </Typography>
                <Styles.DividerLine bgcolor={"secondary.main"} />
              </Box>
              {/* Current User Review */}
              {isPurchased ? (
                <Styles.UsersReviewsWrapper>
                  {isReviewing ? (
                    <>
                      <Styles.UserReviewInputLabel>
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
                      </Styles.UserReviewInputLabel>
                      <Styles.UserReviewInputLabel>
                        <Typography fontSize={"18px"}>Comments :</Typography>
                        <TextField
                          fullWidth
                          id="filled-multiline-static"
                          label="Leave Your Review Here (Optional)"
                          multiline
                          rows={4}
                          variant={small ? "outlined" : "filled"}
                          defaultValue={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                        />
                      </Styles.UserReviewInputLabel>
                    </>
                  ) : (
                    <ReviewCard
                      avatar="/images/auth-bg.webp"
                      comment={reviewComment}
                      rating={userRating}
                    />
                  )}
                  <Button
                    onClick={() => setIsReviewing(!isReviewing)}
                    variant="text"
                  >
                    <Typography fontSize={"18px"} fontWeight={"300"}>
                      {isReviewing ? "Submit" : "Edit Your Review"}
                    </Typography>
                  </Button>
                </Styles.UsersReviewsWrapper>
              ) : (
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  padding={"12px"}
                >
                  <Typography
                    textAlign={"center"}
                    color={"gray"}
                    fontWeight={"300"}
                    fontSize={"18px"}
                  >
                    Purchase the product to make a review
                  </Typography>
                </Box>
              )}

              <Box display="flex" alignItems="center" width="100%" gap="8px">
                <Styles.DividerLine bgcolor={"secondary.main"} />
                <Typography
                  minWidth={"max-content"}
                  fontSize="14px"
                  color="secondary.main"
                >
                  Other Review
                </Typography>
                <Styles.DividerLine bgcolor={"secondary.main"} />
              </Box>
              <Styles.UsersReviewsWrapper>
                <ReviewCard
                  avatar="/images/auth-bg.webp"
                  rating={4}
                  comment="adukasdjaksd asdnasd"
                />
                <ReviewCard
                  avatar="/images/auth-bg.webp"
                  rating={4}
                  comment="adukasdjaksd asdnasd"
                />
              </Styles.UsersReviewsWrapper>
            </Styles.ReviewsWrapper>
          </Styles.ProductDetailWrapper>
        );
    }
  };

  return renderContent(
    isLoadingProduct
      ? EProductStatus.LOADING
      : isErrorProduct
      ? EProductStatus.ERROR
      : EProductStatus.SUCCESS,
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

export default ProductDetail;
