"use client";

import {
  ChargingStationOutlined,
  FemaleOutlined,
  MaleOutlined,
  QueryBuilderOutlined,
  SettingsEthernetOutlined,
  ShoppingCartOutlined,
  WaterDropOutlined,
} from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Cookies from "js-cookie";
import {
  Box,
  // Button,
  CircularProgress,
  // Rating,
  // TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { useMemo, useState } from "react";
// import { ReviewCard } from "./components/Card/ReviewCard";
import * as Styles from "./styles";
import { useParams } from "next/navigation";
import { getOneProduct } from "./service";
import { useQuery } from "@tanstack/react-query";
import { formatPrice } from "@/utils/formatter";
import { EmptyWrapper } from "@/components/Wrapper/styles";
import { toast } from "react-hot-toast";
import { IUser } from "@/interfaces/user";
import { NotFound } from "@/feature/not-found";
import { useOrder } from "@/feature/order";
import { useCart } from "@/feature/cart";

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const userCookies = Cookies.get("user");

  const user = useMemo(() => {
    return JSON.parse(userCookies || "{}") as IUser;
  }, [userCookies]);

  const { mutateCheckout } = useOrder();
  const { mutateCart } = useCart();

  const {
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getOneProduct(id as string),
  });

  const handleBuyNow = async () => {
    if (!user || !product) return;

    await mutateCheckout({
      user,
      totalProduct: 1,
      totalPrice: product.price,
      products: [
        {
          product,
          quantity: 1,
          price: product?.price || 0,
        },
      ],
    });
  };

  enum EProductStatus {
    LOADING,
    ERROR,
    SUCCESS,
  }

  const small = useMediaQuery("(max-width:768px)");

  const medium = useMediaQuery("(max-width:1240px)");

  const [carrousel, setCarrousel] = useState(0);
  // const [userRating, setUserRating] = useState<number | null>(0);
  // const [isPurchased] = useState(false);
  // const [isReviewing, setIsReviewing] = useState(true);
  // const [reviewComment, setReviewComment] = useState("");

  const handleNextButton = () => {
    if (product && carrousel >= product?.imgGallery.length - 1) return;
    setCarrousel(carrousel + 1);
  };
  const handlePrevButton = () => {
    if (product && carrousel <= 0) return;
    setCarrousel(carrousel - 1);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    await mutateCart({ productId: product.id, quantity: 1 });
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
                {product &&
                product.imgGallery &&
                product.imgGallery.length > 0 ? (
                  <Styles.Gallery>
                    <Styles.ArrowButton
                      disabled={carrousel === 0}
                      title="Previous"
                      onClick={handlePrevButton}
                    >
                      <ArrowForwardIosIcon
                        style={{ transform: "rotate(180deg)" }}
                      />
                    </Styles.ArrowButton>
                    {product.imgGallery.map(
                      (gallery, index) =>
                        index === carrousel && (
                          <Styles.ImgCont key={index}>
                            <Image
                              loader={() => gallery}
                              draggable={false}
                              src={gallery}
                              alt="product-images"
                              title={
                                index === 0
                                  ? "Main Perspective"
                                  : `Perspective ${index + 1}`
                              }
                              fill
                              priority
                              objectFit="contain"
                            />
                          </Styles.ImgCont>
                        ),
                    )}
                    <Styles.ArrowButton
                      disabled={
                        carrousel ===
                        (product.imgGallery.length
                          ? product.imgGallery.length - 1
                          : 0)
                      }
                      title="Next"
                      onClick={handleNextButton}
                    >
                      <ArrowForwardIosIcon />
                    </Styles.ArrowButton>
                  </Styles.Gallery>
                ) : (
                  <Styles.Gallery>
                    <Styles.ImgCont>
                      <Image
                        src="/logos/logo-primary.svg"
                        alt="default-image"
                        fill
                        priority
                        objectFit="contain"
                      />
                    </Styles.ImgCont>
                  </Styles.Gallery>
                )}

                <Styles.MiniGalleryContainer>
                  {product && product.imgGallery ? (
                    product.imgGallery.map(
                      (map, index) =>
                        index !== carrousel && (
                          <Styles.MiniGallery
                            onClick={() => setCarrousel(index)}
                            key={index}
                          >
                            <Styles.ImgCont>
                              <Image
                                loader={() => map}
                                src={map}
                                alt="product-images"
                                fill
                                title={
                                  index === 0
                                    ? "Main Perspective"
                                    : `Perspective ${index + 1}`
                                }
                                priority
                                objectFit="contain"
                              />
                            </Styles.ImgCont>
                          </Styles.MiniGallery>
                        ),
                    )
                  ) : (
                    <Styles.MiniGallery>
                      <Styles.ImgCont>
                        <Image
                          src="/logos/logo-primary.svg"
                          alt="default-image"
                          fill
                          priority
                          objectFit="contain"
                        />
                      </Styles.ImgCont>
                    </Styles.MiniGallery>
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
                  {/* <Styles.RatingContainer>
                    <Styles.RatingContainer>
                      <Rating name="Rating" readOnly value={userRating} />
                    </Styles.RatingContainer>
                    <Typography color={"primary"} fontSize={"18px"}>
                      {userRating}
                    </Typography>
                    <Typography color={"primary"} fontSize={"18px"}>
                      (4582)
                    </Typography>
                  </Styles.RatingContainer> */}
                  <Typography color={"gray"} fontSize={"18px"}>
                    {product?.stock
                      ? `${product?.stock} Product Left`
                      : "Out of Stock"}
                  </Typography>
                  <Typography color={"gray"} fontSize={"18px"}>
                    {product?.sold ? `Sold : ${product?.sold} ` : "Sold : -"}
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
                <Styles.FeatureGroup>
                  <Styles.FeatureBox title="Brand">
                    <Box position={"relative"} flex={1} width={"100%"}>
                      {product && product?.brand.imageURL ? (
                        <Image
                          alt="Brand"
                          loader={() => product?.brand.imageURL}
                          src={product?.brand.imageURL}
                          fill
                          objectFit="contain"
                        />
                      ) : (
                        <Image
                          alt="Default Brand"
                          src="/logos/logo-primary.svg"
                          fill
                          objectFit="contain"
                        />
                      )}
                    </Box>
                    <Typography
                      width={"100%"}
                      fontSize={"14px"}
                      fontWeight={300}
                      textAlign={"center"}
                    >
                      {product?.brand.name}
                    </Typography>
                  </Styles.FeatureBox>
                  <Styles.FeatureBox justifyContent={"space-evenly"}>
                    <Box width={"100%"} fontSize={medium ? "32px" : "48px"}>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignContent={"center"}
                        height={"100%"}
                      >
                        {product && product?.gender ? (
                          product.gender === "female" ? (
                            <FemaleOutlined fontSize="inherit" />
                          ) : product.gender === "male" ? (
                            <MaleOutlined fontSize="inherit" />
                          ) : (
                            <Box display={"flex"}>
                              <Box>
                                <FemaleOutlined fontSize="inherit" />
                              </Box>
                              <Box>
                                <MaleOutlined fontSize="inherit" />
                              </Box>
                            </Box>
                          )
                        ) : (
                          ""
                        )}
                      </Box>
                    </Box>
                    <Typography
                      width={"100%"}
                      fontSize={"14px"}
                      fontWeight={300}
                      textAlign={"center"}
                      textTransform={"capitalize"}
                    >
                      {product?.gender}
                    </Typography>
                  </Styles.FeatureBox>
                  <Styles.FeatureBox
                    justifyContent={"space-evenly"}
                    title="Movement Type"
                  >
                    <Box width={"100%"} fontSize={medium ? "32px" : "48px"}>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignContent={"center"}
                        height={"100%"}
                      >
                        <QueryBuilderOutlined fontSize="inherit" />
                      </Box>
                    </Box>
                    <Typography
                      width={"100%"}
                      fontSize={"14px"}
                      fontWeight={300}
                      textAlign={"center"}
                      textTransform={"capitalize"}
                    >
                      {product?.types}
                    </Typography>
                  </Styles.FeatureBox>

                  {product?.types !== "quartz" ? (
                    <Styles.FeatureBox
                      justifyContent={"space-evenly"}
                      title="Power Reserve"
                    >
                      <Box width={"100%"} fontSize={medium ? "32px" : "48px"}>
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignContent={"center"}
                          height={"100%"}
                        >
                          <ChargingStationOutlined fontSize="inherit" />
                        </Box>
                      </Box>
                      <Typography
                        width={"100%"}
                        fontSize={"14px"}
                        fontWeight={300}
                        textAlign={"center"}
                        textTransform={"capitalize"}
                      >
                        {product?.powerReserve} Hours
                      </Typography>
                    </Styles.FeatureBox>
                  ) : (
                    ""
                  )}
                  <Styles.FeatureBox
                    justifyContent={"space-evenly"}
                    title="Water Resistance"
                  >
                    <Box width={"100%"} fontSize={medium ? "32px" : "48px"}>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignContent={"center"}
                        height={"100%"}
                      >
                        <WaterDropOutlined fontSize="inherit" />
                      </Box>
                    </Box>
                    <Typography
                      width={"100%"}
                      fontSize={"14px"}
                      fontWeight={300}
                      textAlign={"center"}
                      textTransform={"capitalize"}
                    >
                      {product?.waterResistance ||
                      product?.waterResistance === 0
                        ? `${product.waterResistance}m`
                        : "No"}
                    </Typography>
                  </Styles.FeatureBox>
                  <Styles.FeatureBox
                    justifyContent={"space-evenly"}
                    title="Case Dimension"
                  >
                    <Box width={"100%"} fontSize={medium ? "32px" : "48px"}>
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignContent={"center"}
                        height={"100%"}
                      >
                        <SettingsEthernetOutlined fontSize="inherit" />
                      </Box>
                    </Box>
                    <Typography
                      width={"100%"}
                      fontSize={"14px"}
                      fontWeight={300}
                      textAlign={"center"}
                    >
                      {product?.width !== product?.height
                        ? `${product?.width} mm x ${product?.height} mm`
                        : `${product?.width} mm`}
                    </Typography>
                  </Styles.FeatureBox>
                </Styles.FeatureGroup>
              </Styles.ProductOverviews>
            </Styles.ProductOverviewsWrapper>
            <Styles.ProductSpecsWrapper>
              <Box display="flex" alignItems="center" width="100%" gap="8px">
                <Styles.DividerLine bgcolor={"white"} />
                <Typography fontSize="14px" color="white">
                  Specification
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

            {/* <Styles.ReviewsWrapper display={"none"}>
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
            </Styles.ReviewsWrapper> */}
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

export default ProductDetail;
