import React, { useEffect, useState } from "react";
import { getUserData} from "../services/usersApiService";
import { useUser } from "../providers/UserProvider";
import { Container, Typography, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


export default function Profile() {
  
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const getUser = async () => {
    try {
      const userData = await getUserData(user.id);
      setUserData(userData);
      
      
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (<>
  <Container maxWidth="sm" sx={{
        boxShadow: "0px 0px 8px 2px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Typography variant="h4" align="center" gutterBottom>
        Profile
      </Typography>
      {userData && (
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign="center">
            <AccountCircleIcon sx={{ fontSize: 80, color: "#888" }} />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h5" gutterBottom>
              Welcome, {userData.name.first} {userData.name.middle} {userData.name.last}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Email: {userData.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Phone: {userData.phone}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Location: {userData.adress.city}, {userData.adress.country}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>

  </>)
}
