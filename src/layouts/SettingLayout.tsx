import { Container, Grid } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import core from "../assets/jss/core";
import AlertMessage from "../components/AlertMessage";
import SettingSidePanel from "../components/SettingSidePanel";
import { isInitialized } from "../features/public/coreSlice";

function SettingLayout() {
  const initialized = useSelector(isInitialized);
  return (
    <Container maxWidth="md" sx={core.mainContainer}>
      <Grid container maxWidth="md" spacing={2}>
        <Grid item xs={12}>
          <AlertMessage />
        </Grid>
        <Grid item md={3} display={{
          xs: "none",
          md: "block"
        }}>
          <SettingSidePanel />
        </Grid>
        <Grid item xs={12} md={9}>
          {initialized && <Outlet />}
        </Grid>
        <Grid item xs={12} display={{
          md: "none"
        }}>
          <SettingSidePanel />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SettingLayout