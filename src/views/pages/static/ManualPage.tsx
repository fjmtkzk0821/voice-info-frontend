import React from "react";
import { Bathtub } from "@mui/icons-material";
import MessageBlock from "../../components/common/MessageBlock";
import SectionHeader from "../../components/common/SectionHeader";
import { getString } from "../../../utils/localization";
import { Container, Grid, Card } from "@mui/material";

function ManualPage(props: any) {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={12} sm={12} xs={12}>
          <SectionHeader title={getString("ja", "footer", "manual")} />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Card>
            <MessageBlock
              icon={<Bathtub fontSize="small" color="disabled" />}
              message="COMING SOON"
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ManualPage;