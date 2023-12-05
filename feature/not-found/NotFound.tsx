"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import * as NotFoundStyles from "./styles";
import Picture from "@/public/images/not-found.svg";

export const NotFound = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <NotFoundStyles.Container>
      <NotFoundStyles.Image>
        <NotFoundStyles.Wrapper>
          <Image
            src={Picture}
            alt="NotFound"
            className="image"
            layout="fill"
            objectFit="contain"
          />
        </NotFoundStyles.Wrapper>
      </NotFoundStyles.Image>
      <NotFoundStyles.Text>
        <NotFoundStyles.TextHeading>
          Oops, This Page Could Not Be Found
        </NotFoundStyles.TextHeading>
        <NotFoundStyles.TextContent>
          We apologize, we cannot find the page you are looking for. Please
          contact our Client Services or navigate to another page. Thank you...
        </NotFoundStyles.TextContent>
      </NotFoundStyles.Text>
      <NotFoundStyles.Buttons>
        <NotFoundStyles.HomeButton onClick={goHome}>
          Take Me Home
        </NotFoundStyles.HomeButton>
      </NotFoundStyles.Buttons>
    </NotFoundStyles.Container>
  );
};
