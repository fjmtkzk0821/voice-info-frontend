import { Avatar, Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { FormRow, FormRowDivider } from "../components/FormGridComponents";
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { dismissMessage, setMessage } from "../../../features/messageSlice";
import { scroll2Top } from "../../../utils/common";
import { SeiyuDocument } from "../../../utils/objects/seiyu";
import axios from "axios";
import { setLoading, dismissLoading } from "../../../features/loadingBackdropSlice";
import { loadUserData } from "../../../features/user/authSlice";
import { cleanAuthHeader } from "../../../services/api";
import BaseMessage, { BaseMessageType } from "../../../utils/objects/BaseMessage";
import UserDocument from "../../../utils/objects/user";
import authService from '../../../services/auth';
import SeiyuLinkItem from "./components/SeiyuLinkItem";

function SeiyuLinkEdit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [links, setLinks] = useState((new SeiyuDocument()).toObject().social);

  useEffect(() => {
    scroll2Top();
    dispatch(dismissMessage());
    onLoad();
  }, []);

  const handleChange = (index: number, value: any) => {
    setLinks(links.map((link, i) => (i === index ? value : link)));
  };

  async function onLoad() {
    dispatch(setLoading());
    try {
      const {data} = await authService.getSeiyuBasic();
      setLinks(data.basic.social);
      dispatch(loadUserData(UserDocument.fromObject(data.user).toObject()));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { code, message } = err.response?.data;
        if(code === "auth/id-token-expired") {
          cleanAuthHeader();
          navigate("/");
        }
        dispatch(
          setMessage(
            new BaseMessage(code, message, BaseMessageType.ERROR).toObject()
          )
        );
      }
    }
    dispatch(dismissLoading());
  }

    return (
      <Stack spacing={2} alignItems="center">
        {/* {links && links.map((l) => <SeiyuLinkItem link={l}/>)} */}
        <Box>
          <Avatar>
            <IconButton>
              <AddIcon />
            </IconButton>
          </Avatar>
        </Box>
        <Box sx={{
          width: "100%"
        }}>
          <Button variant="contained" sx={{
            float: "right"
          }}>save</Button>
        </Box>
      </Stack>
    );
}

export default SeiyuLinkEdit