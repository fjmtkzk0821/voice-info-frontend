import React from "react";
import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import { palette } from "../../assets/styles/palette";

const useStyles = makeStyles({
  root: {
    background: palette.primary,
    color: palette.white,
  },
});

const SectionPaper = withStyles({
  outlined: {
      border: `1px solid ${palette.primary}`
  },
})(Paper);

export default function CardSection(props: any) {
  const classes = useStyles();
  return (
    <SectionPaper variant="outlined">
      <Grid container alignItems="center">
        <Grid item className={classes.root}>
          <Box px={2} py={1} my="auto">
            <Typography component="h6" variant="subtitle1">
              {props.header}
            </Typography>
          </Box>
        </Grid>
        {props.children}
      </Grid>
    </SectionPaper>
  );
}