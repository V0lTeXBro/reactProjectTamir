import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import CardForm from "../components/CardForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import mapCardToModel from "../helpers/normalization/mapToModel";
import normalizeCard from "../helpers/normalization/normalizeCard";
import useCards from "../hooks/useCards";
import cardSchema from "../models/joi-schema/cardSchema";

export default function EditCardPage() {
  const { id } = useParams();
  const {
    handleUpdateCard,
    handleGetCard,
    value: { card },
  } = useCards();

  const { user } = useUser();
  const { value, ...rest } = useForm(initialCardForm, cardSchema, () => {
    handleUpdateCard(card._id, {
      ...normalizeCard({ ...value.data }),
      bizNumber: card.bizNumber,
      user_id: card.user_id,
    });
  });
  useEffect(() => {
    handleGetCard(id).then((data) => {
      const modelCard = mapCardToModel(data);
      rest.setData(modelCard);
    });
  }, []);
  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardForm
        title="edit card"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        data={value.data}
      />
    </Container>
  );
}
