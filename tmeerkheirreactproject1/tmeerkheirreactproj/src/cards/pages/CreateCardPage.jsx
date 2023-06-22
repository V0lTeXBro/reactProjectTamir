import { Container } from "@mui/material";
import React from "react";
import { Navigate} from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import CardForm from "../components/CardForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import useCards from "../hooks/useCards";
import cardSchema from "../models/joi-schema/cardSchema";


export default function CreateCardPage() {
  
  const { handleCreateCard } = useCards();

  const { value, ...rest } = useForm(
    initialCardForm,
    cardSchema,
    handleCreateCard
  );

  

  

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
        title="create card"
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        errors={value.errors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
        data={value.data}
        setData={rest.setData}
      />
    </Container>
  );
}


