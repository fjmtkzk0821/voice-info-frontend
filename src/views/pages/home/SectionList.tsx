import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { palette } from "../../../assets/styles/palette";

const userStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: palette.white,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    color: palette.primary,
  },
}));

export default function SectionList(props: any) {
  const classes = userStyle();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.details}>
        {props.icon}
        <Typography component="h5" variant="h5" className={classes.header}>
          {props.title}
        </Typography>
      </CardContent>
      {React.Children.map(props.children, (child) => child)}
      <CardActions></CardActions>
    </Card>
  );
}
