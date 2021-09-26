import { makeStyles, Card, Box, Typography } from "@mui/material";
import React from "react";
import { palette } from "../../../assets/styles/palette";


// const useStyles = makeStyles({
//   root: {
//     width: 300,
//     background: palette.primary,
//     color: palette.white,
//     borderLeft: `4px solid ${palette.accent}`,
//   },
// });

export default function SectionHeader(props: any) {
  //const classes = useStyles();
  return (
    <Card sx={{
      width: 300,
    background: palette.primary,
    color: palette.white,
    borderLeft: `4px solid ${palette.accent}`,
    }}>
      <Box px={2} py={1} my="auto">
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
      </Box>
    </Card>
  );
}
