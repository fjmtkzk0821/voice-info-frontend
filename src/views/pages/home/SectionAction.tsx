import React from 'react';
import { withRouter } from 'react-router-dom';
import { getString } from "../../../utils/localization";
import { palette } from '../../../assets/styles/palette';
import { sectionActionStyle } from '../../../assets/styles/core';
import { Grid, Button } from '@mui/material';

const styles = sectionActionStyle();

function SectionAction(props: any) {
  return (
    <Grid container sx={styles.root}>
      <Grid item md={12} sx={styles.details}>
        <Button variant='contained' disableElevation onClick={(e) => props.history.push('/register')}>
          {getString("ja", "link", "register")}
        </Button>
      </Grid>
      <Grid item md={12} sx={styles.details} onClick={(e) => props.history.push('/login')}>
        <Button variant='outlined' disableElevation>
        {getString("ja", "link", "login")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default withRouter(SectionAction);
