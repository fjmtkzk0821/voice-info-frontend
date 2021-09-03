import React from "react";
import { ButtonGroup, withStyles } from "@material-ui/core";

const MultiSelectGroup = withStyles({
  root: {
      width: "100%",
      height: "100%",
      "& button": {
        width: "100%"
      }
  },
})(ButtonGroup);

export default function FormMultiSelectField(props: any) {
  return (
    <MultiSelectGroup color="primary" aria-label="outlined primary button group">
      {props.children}
    </MultiSelectGroup>
  );
}
