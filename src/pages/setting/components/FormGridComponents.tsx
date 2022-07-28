import { Grid, Typography, TextField, Divider } from "@mui/material"
import React, { ReactNode } from "react"

type IProps = {
    label: ReactNode,
    children: ReactNode
}

function FormRow({label, children}: IProps) {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Typography component="span">{label}</Typography>
        </Grid>
        <Grid item xs={9}>
          {children}
        </Grid>
      </React.Fragment>
    );
}

function FormRowDivider() {
    return (
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export {FormRowDivider,FormRow}