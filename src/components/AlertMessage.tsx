import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { dismissMessage, messageObj } from "../features/messageSlice";
import { BaseMessageType } from "../utils/objects/BaseMessage";

function AlertMessage() {
    const dispatch = useAppDispatch();
    const message = useAppSelector(messageObj);

    function getTitle() {
        switch(message?.type) {
            case BaseMessageType.ERROR:
                return `Error occurred. [${message.title}]`;
            default:
                return message?.title;
        }
    }

    return (
      <React.Fragment>
        {message && (
          <Alert severity={message.type} onClose={() => dispatch(dismissMessage())}>
            <AlertTitle>{getTitle()}</AlertTitle>
            {message.body}
          </Alert>
        )}
      </React.Fragment>
    );    
}

export default AlertMessage;
