import React from "react"
import { Navigate, Outlet } from 'react-router-dom';
import { UtiliseAuth } from "./Auth";

function RoutePrive({ component: Component, ...rest }) {
  const { authentification } = UtiliseAuth()

  return authentification === "admin" ? <Outlet /> : <Navigate to="/" />;
}

export default RoutePrive;
