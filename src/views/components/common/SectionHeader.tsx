import React from "react";
import { Box, Card, makeStyles, Typography } from "@material-ui/core";
import { palette } from "../../../assets/styles/palette";


const useStyles = makeStyles({
  root: {
    width: 300,
    background: palette.primary,
    color: palette.white,
    borderLeft: `4px solid ${palette.accent}`,
  },
});

export default function SectionHeader(props: any) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Box px={2} py={1} my="auto">
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
      </Box>
    </Card>
  );
}
