import { withStyles, ButtonGroup } from "@mui/material";
import React from "react";

// const MultiSelectGroup = withStyles({
//   root: {
//       width: "100%",
//       height: "100%",
//       "& button": {
//         width: "100%"
//       }
//   },
// })(ButtonGroup);

export default function FormMultiSelectField(props: any) {
  return (
    <ButtonGroup sx={{
      width: "100%",
      height: "100%",
      "& button": {
        width: "100%"
      }
    }} color="primary" aria-label="outlined primary button group">
      {props.children}
    </ButtonGroup>
  );
}
