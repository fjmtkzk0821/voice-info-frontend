import React from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { clearAlert } from "../../../redux/slices/alertMessageSlice";

import { MessageType, Severity } from "../../../objects/BaseMessage";
import { Box, Alert, AlertTitle } from "@mui/material";

export default function AlertMessage() {
  const message = useAppSelector((state) => state.alertMessage.message);
  const dispatch = useAppDispatch();
  if (!message) {
    return <div></div>;
  }
  return (
    <Box pt={1} pb={2}>
      <Alert
        variant="filled"
        severity={message.status as Severity}
        onClose={() => dispatch(clearAlert())}
      >
        <AlertTitle>
          {message.title}
          {message.status === MessageType.Error && <strong>[{message.code}]</strong>}
        </AlertTitle>
        {message.msg}
      </Alert>
    </Box>
  );
}
