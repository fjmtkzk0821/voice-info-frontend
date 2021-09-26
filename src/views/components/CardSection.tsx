import { Paper, Grid, Box, Typography } from "@mui/material";
import React from "react";
import { palette } from "../../assets/styles/palette";

// const useStyles = makeStyles({
//   root: {
//     background: palette.primary,
//     color: palette.white,
//   },
// });

// const SectionPaper = withStyles({
//   outlined: {
//       border: `1px solid ${palette.primary}`
//   },
// })(Paper);

export default function CardSection(props: any) {
  //const classes = useStyles();
  return (
    <Paper sx={{
      "& .MuiPaper-outlined": {
        border: `1px solid ${palette.primary}`
      }
    }} variant="outlined">
      <Grid container alignItems="center">
        <Grid item sx={{
          background: palette.primary,
          color: palette.white,
        }}>
          <Box px={2} py={1} my="auto">
            <Typography component="h6" variant="subtitle1">
              {props.header}
            </Typography>
          </Box>
        </Grid>
        {props.children}
      </Grid>
    </Paper>
  );
}