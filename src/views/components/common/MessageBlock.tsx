import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";

type IProps = {
  icon: any;
  message: any;
};

export default function MessageBlock(props: IProps) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <Grid item>{props.icon}</Grid>
      <Grid item>
        <Box py={5}>
          <Typography
            className="text-disabled"
            variant="subtitle1"
            gutterBottom
          >
            {props.message}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
