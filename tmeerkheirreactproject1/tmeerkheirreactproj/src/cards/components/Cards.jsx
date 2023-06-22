import { Grid, IconButton} from "@mui/material";
import { arrayOf,func } from "prop-types";
import React from "react";
import cardType from "../models/types/cardType";
import CardBussinesComponent from "./card/CardBussinesComponent";
import { getCard } from "../services/cardApiService";
import useCards from "../hooks/useCards";
import ROUTES from "../../routes/routesModel";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useUser } from "../../users/providers/UserProvider";


export default function Cards({ cards, handleDelete,user_id }) {
  const {
    handleLikeCard,
    handleUpdateCard,
  } = useCards();
  const navigate = useNavigate();
const { user } = useUser();
  

  const handleEdit = (id) => {
    handleUpdateCard(id);
  };
  const handleLike = async (id) => {
    
    const card = await getCard(id);
    
    handleLikeCard(card._id);
      
    
    
  };

  
    const handleCreate =  () =>{
        if (!user) return  navigate(ROUTES.LOGIN);
else
      navigate(ROUTES.CREATE_CARD);
    };
  return (
    <>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <CardBussinesComponent
              card={card}
              key={card._id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleLike={handleLike}
            />
          </Grid>
        ))}
        {user?.isBusiness || user?.id == user_id ? (
        <IconButton
                aria-label="Create Card"
                onClick={handleCreate}
              >
                <AddIcon/>
              </IconButton>
        ):null}
      </Grid>
    </>
  );
}

Cards.propTypes = {
  cards: arrayOf(cardType),
  handleCreate: func,
};
