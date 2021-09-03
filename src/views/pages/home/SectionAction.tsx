import React from 'react';
import { withRouter } from 'react-router-dom';
import { getString } from "../../../utils/localization";
import { Button, makeStyles, Grid } from '@material-ui/core';
import { palette } from '../../../assets/styles/palette';
import { sectionActionStyle } from '../../../assets/styles/core';

const useStyle = makeStyles((theme) => sectionActionStyle());

function SectionAction(props: any) {
  
  const classes = useStyle();

  return (
    <Grid container className={classes.root}>
      <Grid item md={12} className={classes.details}>
        <Button variant='contained' disableElevation onClick={(e) => props.history.push('/register')}>
          {getString("ja", "link", "register")}
        </Button>
      </Grid>
      <Grid item md={12} className={classes.details} onClick={(e) => props.history.push('/login')}>
        <Button variant='outlined' disableElevation>
        {getString("ja", "link", "login")}
        </Button>
      </Grid>
    </Grid>
  );
}

export default withRouter(SectionAction);
