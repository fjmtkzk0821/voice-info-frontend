import { Container, Grid } from "@mui/material";
import core from "../../assets/jss/core";
import PageHeader from "../../components/PageHeader";
import { getString } from "../../utils/localization";

function StudioInformation() {
    return (
      <Container maxWidth="lg" sx={core.mainContainer}>
        <PageHeader label={getString("link", "seiyu")} />
        <Grid container spacing={2} justifyContent="center" alignItems="start">
          <Grid item xs={12} sm={12} md={4} lg={3}>
              
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={9}
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          ></Grid>
        </Grid>
      </Container>
    );
}

export default StudioInformation;