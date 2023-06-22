import React from "react";
import { Route, Routes } from "react-router-dom";
import CardDetailsPage from "../cards/pages/CardDetailsPage";
import CardPage from "../cards/pages/CardPage";
import EditCardPage from "../cards/pages/EditCardPage";
import FavCards from "../cards/pages/FavCards";
import MyCards from "../cards/pages/MyCards";
import AboutPage from "../pages/AboutPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../users/pages/LoginPage";
import SignupPage from "../users/pages/SignupPage";
import ROUTES from "./routesModel";
import Profile from "../users/pages/Profile";
import CreateCardPage from "../cards/pages/CreateCardPage";

export default function Router() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<CardPage />} />
      <Route path={ROUTES.CARDS} element={<CardPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.CREATE_CARD} element={<CreateCardPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={ROUTES.FAV_CARDS} element={<FavCards />} />
      <Route path={ROUTES.MY_CARDS} element={<MyCards />} />
      <Route path={ROUTES.USER_PROFILE} element={<Profile />} />
      <Route path={`${ROUTES.EDIT_CARD}/:id`} element={<EditCardPage />} />
      <Route path={`${ROUTES.CARD_INFO}/:id`} element={<CardDetailsPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
