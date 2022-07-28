import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { dismissLoading, setLoading } from "../../../features/loadingBackdropSlice";
import SettingSection from "./components/SettingSection";
import axios from "axios";
import authService from '../../../services/auth';
import { dismissMessage, setMessage } from "../../../features/messageSlice";
import BaseMessage, { BaseMessageType } from "../../../utils/objects/BaseMessage";
import { useNavigate } from "react-router-dom";
import { getString } from "../../../utils/localization";

function SeiyuRegister() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    async function handleSubmit() {
        dispatch(setLoading());
        dispatch(dismissMessage());
        try {
            const {code, message} = await authService.seiyuRegister();
            dispatch(setMessage(new BaseMessage(code, message).toObject()));
            navigate("/setting/seiyu/edit");
        } catch(err) {
            if (axios.isAxiosError(err)) {
                const { code, message } = err.response?.data;
                dispatch(
                  setMessage(
                    new BaseMessage(
                      code,
                      message,
                      BaseMessageType.ERROR
                    ).toObject()
                  )
                );
              }
        }
        dispatch(dismissLoading());
    }

    return (
      <Card>
        <CardHeader subheader={getString("message", "regAsSeiyu")} />
        <CardContent
          sx={{
            px: 2,
            py: 0,
          }}
        >
          <Typography variant="body1">
            {getString("message", "regAsSeiyuDesc")}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="secondary" onClick={() => handleSubmit()}>
            {getString("link", "register")}
          </Button>
        </CardActions>
      </Card>
    );
}

export default SeiyuRegister;