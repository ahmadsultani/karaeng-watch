"use client";

import * as AboutUsStyled from "./styles";
import { Card } from "./Card/Card";
import { Typography } from "@mui/material";

export const AboutUs = () => {
  return (
    <AboutUsStyled.Container>
      <AboutUsStyled.Title>
        <AboutUsStyled.TitleText>
          The People Behind This{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ textDecoration: "underline" }}
          >
            Dogshit
          </Typography>{" "}
          And Make it{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ textDecoration: "underline" }}
          >
            Possible
          </Typography>
        </AboutUsStyled.TitleText>
        <AboutUsStyled.Subtitle>
          Our philosophy is simple; Kerja sampe mampus yang penting selesai baru
          healing
        </AboutUsStyled.Subtitle>
      </AboutUsStyled.Title>
      <AboutUsStyled.Frames>
        <Card image="/images/sappe.png" name="Sappe" />
        <Card image="/images/sappe.png" name="Sappe" />
        <Card image="/images/sappe.png" name="Sappe" />
        <Card image="/images/sappe.png" name="Sappe" />
        <Card image="/images/sappe.png" name="Sappe" />
        <Card image="/images/sappe.png" name="Sappe" />
      </AboutUsStyled.Frames>
      <AboutUsStyled.Divider />
      <AboutUsStyled.Content>
        <AboutUsStyled.ContentText>
          Bismillah, besok kaya
        </AboutUsStyled.ContentText>
        <AboutUsStyled.Subtitle>
          Selesai ini bisa main GoW, Spider Man, Miles Morales, Hogwarts Legacy,
          cari cewe baru ajak makan. Moka jg terapkan tidur 8 jam sehari sm
          rajin olahraga biar sehat
        </AboutUsStyled.Subtitle>
      </AboutUsStyled.Content>
    </AboutUsStyled.Container>
  );
};

export default AboutUs;
