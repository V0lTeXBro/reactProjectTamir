import { Avatar, IconButton } from "@mui/material";
import React from "react";
import NavBarLink from "../../../../routes/components/NavBarLink";
import ROUTES from "../../../../routes/routesModel";

export default function LogoIcon() {

  return (
    <>
      <NavBarLink to={ROUTES.ROOT}>
        <IconButton>
          <Avatar
            src="\assets\images\business-card.png"
            alt="Bussiness card icon"
          />
        </IconButton>
      </NavBarLink>
    </>
  );
}
