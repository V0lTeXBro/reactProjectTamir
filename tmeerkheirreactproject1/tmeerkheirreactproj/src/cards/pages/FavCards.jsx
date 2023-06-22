import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../users/providers/UserProvider';
import useCards from '../hooks/useCards';
import ROUTES from '../../routes/routesModel';
import { Container } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import CardsFeedback from '../components/CardsFeedback';

export default function FavCards() {
  const { value, handleGetFavCards, handleDeleteCard } = useCards();
  const { cards, error, isLoading } = value;

  const { user } = useUser();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    } else {
      handleGetFavCards();
    }
  }, [user] );

  const handleDelete = async (id) => {
    await handleDeleteCard(id);
    await handleGetFavCards();
  };

  return (
    <div>
      <Container sx={{ mt: 2 }}>
        <PageHeader
          title="Cards"
          subtitle="On this page you can find your favorite cards"
        />
        <CardsFeedback
          isLoading={isLoading}
          error={error}
          cards={cards}
          handleDelete={handleDelete}
        />
      </Container>
    </div>
  );
}
