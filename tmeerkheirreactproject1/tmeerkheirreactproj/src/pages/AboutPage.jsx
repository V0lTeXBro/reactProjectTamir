import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import PageHeader from "../components/PageHeader";

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        title="About Us"
        subtitle="Welcome to our card business"
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} alignSelf="center">
          <Typography variant="body1">
            Welcome to our card business, where we strive to provide unique and innovative business card solutions for professionals and entrepreneurs. With a passion for creativity and design, we aim to make a lasting impression through our high-quality card designs.
          </Typography>
          <Typography variant="body1">
            Our journey began with a vision to transform traditional business cards into engaging and memorable tools that reflect the essence of your brand. Through meticulous craftsmanship and attention to detail, we have created a collection of stunning card designs that cater to various industries and styles.
          </Typography>
          <Typography variant="body1">
            At Card Business, we believe that a well-designed business card can leave a lasting impact on potential clients and partners. It is a reflection of your professionalism, creativity, and attention to detail. We are dedicated to helping you make a strong first impression and stand out from the competition.
          </Typography>
          <Typography variant="body1">
            Our mission is to empower businesses and individuals by providing them with exceptional card solutions that elevate their brand image. We strive to deliver outstanding customer service and exceed our clients' expectations at every step of the process.
          </Typography>
          <Typography variant="body1">
            Through our innovative designs, premium materials, and attention to detail, we aim to create cards that not only convey your contact information but also tell a story and leave a lasting impression. We believe that every card should be a work of art that represents your unique identity and values.
          </Typography>
          <Typography variant="body1">
            If you have any questions, inquiries, or partnership opportunities, we would love to hear from you. Feel free to reach out to our team using the contact details below:
          </Typography>
          <Typography variant="body1">
            Phone: 050-1111111<br />
            Email: info@cardbusiness.com<br />
            Website: <a href="http://localhost:3000/">www.cardbusiness.com</a><br />
            Address: Dizingof Street, Tel Aviv, Israel
          </Typography>
        </Grid>
        <Grid item md={4} sx={{ display: { md: "flex", xs: "none" }, justifyContent: "center" }}>
          <img src="/assets/images/card.jpg" alt="card" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
}
