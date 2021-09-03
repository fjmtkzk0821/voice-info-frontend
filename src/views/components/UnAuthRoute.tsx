import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

export default function UnAuthRoute(props: any) {
  const { component, ...other } = props;
  const isAuthenticated = useAppSelector((state) => state.user.authenticated);
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      React.createElement(component, props)
    );
  return <Route {...other} render={routeComponent} />;
}
