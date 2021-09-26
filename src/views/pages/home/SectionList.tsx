import { Card, CardContent, Typography, CardActions } from "@mui/material";
import React from "react";
import { palette } from "../../../assets/styles/palette";

// const userStyle = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     backgroundColor: palette.white,
//   },
//   details: {
//     display: "flex",
//     flexDirection: "column",
//     margin: "auto",
//     alignItems: "center",
//   },
//   header: {
//     textAlign: "center",
//     color: palette.primary,
//   },
// }));

export default function SectionList(props: any) {
  return (
    <Card sx={{
      display: "flex",
    flexDirection: "column",
    backgroundColor: palette.white,
    }} variant="outlined">
      <CardContent sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        alignItems: "center",
      }}>
        {props.icon}
        <Typography component="h5" variant="h5" sx={{
          textAlign: "center",
          color: palette.primary,
        }}>
          {props.title}
        </Typography>
      </CardContent>
      {React.Children.map(props.children, (child) => child)}
      <CardActions></CardActions>
    </Card>
  );
}
