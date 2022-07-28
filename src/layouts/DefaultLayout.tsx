import React from "react";
import { Outlet } from "react-router-dom";
import DefaultBreadcrumbs from "../components/Breadcrumbs";
import DefaultFooter from "../components/DefaultFooter";
import PrimaryAppBar from "../components/PrimaryAppBar";

function DefaultLayout() {
    return (
      <React.Fragment>
        <PrimaryAppBar />
        <DefaultBreadcrumbs />
        <Outlet />
        <DefaultFooter />
      </React.Fragment>
    );
}

export default DefaultLayout