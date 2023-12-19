"use client";

import * as AboutUsStyled from "./styles";
import { Card } from "./Card/Card";
import { Typography } from "@mui/material";

export const AboutUs = () => {
  return (
    <AboutUsStyled.Container>
      <AboutUsStyled.Title>
        <AboutUsStyled.TitleText>
          Meet the Visionaries{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ textDecoration: "underline" }}
          >
            Behind the Magic
          </Typography>{" "}
          Turning Challenges into Triumphs
        </AboutUsStyled.TitleText>
        <AboutUsStyled.Subtitle>
          Our ethos is straightforward; Work until it&apos;s done, then revel in
          the success.
        </AboutUsStyled.Subtitle>
      </AboutUsStyled.Title>
      <AboutUsStyled.Frames>
        <Card image="/images/Sultani.png" name="Sultani" />
        <Card image="/images/Dilul.png" name="Dilul" />
        <Card image="/images/Sappe.png" name="Sappe" />
        <Card image="/images/Dayat.png" name="Dayat" />
        <Card image="/images/Hera.png" name="Hera" />
        <Card image="/images/Richal.png" name="Richal" />
      </AboutUsStyled.Frames>
      <AboutUsStyled.Divider />
      <AboutUsStyled.Content>
        <AboutUsStyled.ContentText>
          In the spirit of progress, we begin each day with determination.
        </AboutUsStyled.ContentText>
        <AboutUsStyled.Subtitle>
          After conquering tasks, we indulge in gaming - GoW, Spider-Man, Miles
          Morales, Hogwarts Legacy - and seek new challenges over meals.
          Prioritizing 8 hours of sleep and regular exercise is our secret to a
          healthy life.
        </AboutUsStyled.Subtitle>
      </AboutUsStyled.Content>
    </AboutUsStyled.Container>
  );
};

export default AboutUs;
