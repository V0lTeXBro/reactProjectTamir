import { Container, Typography, Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { getCard } from "../services/cardApiService";

export default function CardDetailsPage() {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const fetchedCard = await getCard(id);
        setCard(fetchedCard);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCard();
  }, [id]);
  return (
    <Container>
      <PageHeader
        title="Card details"
        subtitle="Here you can find details about a specific card"
      />
      {card ? (
        <Box mt={4}>
          <Typography variant="h6">Card ID: {id}</Typography>
          <Typography variant="h4" mt={2}>Title:
            {card.title}
          </Typography>
          <Typography variant="h6" color="textSecondary">Subtitle:
            {card.subtitle}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">Description:{card.description}</Typography>
          <Box mt={2}>
            <Typography variant="body2">Contact Information:</Typography>
            <Typography variant="body1">Phone: {card.phone}</Typography>
            <Typography variant="body1">Email: {card.email}</Typography>
            <Typography variant="body1">Web: {card.web}</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="body2">Address Information:</Typography>
            <Typography variant="body1">Country: {card.address.country}</Typography>
            <Typography variant="body1">
              Street: {card.address.street}, {card.address.houseNumber}
            </Typography>
            <Typography variant="body1">
              City: {card.address.city}, {card.address.zip}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
}
