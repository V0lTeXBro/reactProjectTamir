import { Box, CardActions, IconButton } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { func, string } from "prop-types";
import { useUser } from "../../../users/providers/UserProvider";
import CardDeleteDialog from "./CardDeleteDialog";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";


export default function CardActionBar({
  handleDelete,
  handleEdit,
  handleLike,
  id,
  user_id,
}) {
  const { user } = useUser();
  const [isLikedMap, setIsLikedMap] = useState(() => {
    const storedIsLikedMap = JSON.parse(localStorage.getItem("isLikedMap"));
    return storedIsLikedMap ? storedIsLikedMap : {};
  });
  const [isDialogOpen, setDialog] = useState(false);
  const navigate = useNavigate();
  const handleDeleteCard = () => {
    handleDelete(id);
    setDialog(false);
  };

  const toggleLike = () => {
    const updatedIsLikedMap = { ...isLikedMap };
    updatedIsLikedMap[id] = !isLikedMap[id];
    setIsLikedMap(updatedIsLikedMap);
    localStorage.setItem("isLikedMap", JSON.stringify(updatedIsLikedMap));
    handleLike(id, updatedIsLikedMap[id]);
  };
  
  const isLiked = isLikedMap[id] || false;


  return (
    <>
      <CardActions sx={{ paddingTop: 0, justifyContent: "space-between" }}>
        <Box>
          {user?.isAdmin || user?.id == user_id ? (
            <>
              <IconButton
                aria-label="Delete Card"
                onClick={() => setDialog(true)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="Edit Card"
                onClick={() => navigate(`${ROUTES.EDIT_CARD}/${id}`)}
              >
                <ModeEditIcon />
              </IconButton >
            </>
          ) : null}
        </Box>

        <Box>
          <IconButton aria-label="Call">
            <CallIcon />
          </IconButton>
          {user && (
            <IconButton
              aria-label="Add to favorite"
              onClick={toggleLike}
            >
              {isLiked ? <FavoriteIcon color="error" /> : <FavoriteIcon color="inherit"/>}
            </IconButton>
          )}
        </Box>
      </CardActions>
      <CardDeleteDialog
        isDialogOpen={isDialogOpen}
        onChangeDialog={() => setDialog(false)}
        onDelete={handleDeleteCard}
      />
    </>
  );
}

CardActionBar.propTypes = {
  handleDelete: func.isRequired,
  handleEdit: func.isRequired,
  handleLike: func.isRequired,
  id: string.isRequired,
};
