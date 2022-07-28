import { Input, Stack, styled, TextField, Button, Typography, Grid, List, ListItem, ListItemText, ListItemIcon, IconButton, Box, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import { FormRow } from "../components/FormGridComponents"
import SettingSection from "./components/SettingSection"
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setLoading, dismissLoading } from "../../../features/loadingBackdropSlice";
import { dismissMessage, setMessage } from "../../../features/messageSlice";
import { loadUserData } from "../../../features/user/authSlice";
import { cleanAuthHeader } from "../../../services/api";
import { getUrlFromStorageBucket, scroll2Top } from "../../../utils/common";
import BaseMessage, { BaseMessageType } from "../../../utils/objects/BaseMessage";
import UserDocument from "../../../utils/objects/user";
import authService from '../../../services/auth';
import { SeiyuSampleDocument } from "../../../utils/objects/seiyu";
import { useNavigate } from "react-router-dom";
import {play} from '../../../features/audioPlayerSlice';
import { getString } from "../../../utils/localization";

const TransparentInput = styled('input')({
    display: 'none',
  });

function SeiyuSampleEdit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [docs, setDocs] = useState<Array<SeiyuSampleDocument>>([]);
  const [doc, setDoc] = useState((new SeiyuSampleDocument()).toObject());
  const [selectedAudio, setSelectedAudio] = useState<File>();
  const [selectedDeleteAudio, setSelectedDeleteAudio] = useState<SeiyuSampleDocument|undefined>(undefined);

  useEffect(() => {
    scroll2Top();
    dispatch(dismissMessage());
    onLoad();
  }, []);

  const handleChange = (key: string, value: any) => {
    setDoc({
      ...doc,
      [key]: value,
    });
  };

  async function onLoad() {
    dispatch(setLoading());
    try {
      const {data} = await authService.getSeiyuSamples();
      setDocs(
        (data.samples as Array<any>).map((item) =>
          SeiyuSampleDocument.fromObject(item)
        )
      );
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

  async function onUpdate() {
    dispatch(setLoading());
    dispatch(dismissMessage());
    try {
      const { code, message, data } = await authService.seiyuSampleCreate(doc, selectedAudio);
      // console.log(data);
      dispatch(setMessage(new BaseMessage(code, message).toObject()));
      setDocs(
        (data.samples as Array<any>).map((item) =>
          SeiyuSampleDocument.fromObject(item)
        )
      );
      setDoc(new SeiyuSampleDocument());
      setSelectedAudio(undefined);
      (document.getElementById("btn-file-audio") as any).value = "";
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if(err.response?.data.code) {
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
        }else {
          dispatch(
            setMessage(
              new BaseMessage("fatal", "not catch", BaseMessageType.ERROR).toObject()
            )
          );
        }

      }
    }
    dispatch(dismissLoading());
    scroll2Top();
  }

  async function onDelete(uid: string) {
    dispatch(setLoading());
    dispatch(dismissMessage());
    setSelectedDeleteAudio(undefined);
    try {
      const { code, message, data } = await authService.seiyuSampleDelete(uid);
      dispatch(setMessage(new BaseMessage(code, message).toObject()));
      setDocs(
        (data.samples as Array<any>).map((item) =>
          SeiyuSampleDocument.fromObject(item)
        )
      );
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if(err.response?.data.code) {
          const { code, message } = err.response?.data;
          dispatch(
            setMessage(
              new BaseMessage(code, message, BaseMessageType.ERROR).toObject()
            )
          );
        }else {
          dispatch(
            setMessage(
              new BaseMessage("fatal", "not catch", BaseMessageType.ERROR).toObject()
            )
          );
        }

      }
    }
    dispatch(dismissLoading());
    scroll2Top();
  }

    return (
      <React.Fragment>
        <Dialog open={selectedDeleteAudio !== undefined}>
          <DialogTitle>{getString("message", "areyousure")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedDeleteAudio
                ? `${getString("message", "continueDelSample")} "${selectedDeleteAudio.cat}"? ${getString("message", "nonrecoverableaction")}`
                : "Invalid action"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setSelectedDeleteAudio(undefined)}>
            {getString("common", "back")}
            </Button>
            {selectedDeleteAudio && (
              <Button onClick={() => onDelete(selectedDeleteAudio.uid)}>
                {getString("common", "confirm")}
              </Button>
            )}
          </DialogActions>
        </Dialog>
        <Stack spacing={2}>
          <SettingSection header={getString("profile", "samples")+getString("common", "upload")}>
            <FormRow label={getString("samples", "cate")}>
              <TextField
                value={doc.cat}
                onChange={(event) => handleChange("cat", event.target.value)}
                size="small"
                fullWidth
              />
            </FormRow>
            <FormRow label={getString("profile", "rating")}>
              <TextField
                value={doc.restric}
                onChange={(event) => handleChange("restric", event.target.value)}
                size="small"
                select
                fullWidth
              >
                <MenuItem value="r">{getString("profile", "R")}</MenuItem>
                <MenuItem value="r15">R15</MenuItem>
                <MenuItem value="r18">R18</MenuItem>
              </TextField>
            </FormRow>
            <FormRow label={getString("profile", "samples")}>
              <label htmlFor="btn-file-audio">
                <TransparentInput
                  accept="audio/*"
                  id="btn-file-audio"
                  type="file"
                  onChange={(event) => {
                    if (event.target.files) {
                      setSelectedAudio(event.target.files[0]);
                      handleChange("filename", event.target.files[0].name);
                      // event.target.files = null;
                    }
                  }}
                />
                <Button variant="contained" component="span" disableElevation>
                {getString("common", "select")}
                </Button>
              </label>
              <Typography
                component="span"
                sx={{
                  ml: 1,
                }}
              >
                {selectedAudio !== undefined
                  ? doc.filename
                  : getString("message", "selectFile")}
              </Typography>
            </FormRow>
            <Grid item xs={12}>
              <Button
                onClick={() => onUpdate()}
                variant="contained"
                fullWidth
                disableElevation
              >
                {getString("common", "upload")}
              </Button>
            </Grid>
          </SettingSection>
          <SettingSection header={getString("link", "sampleManagement")}>
            <Grid item xs={12}>
              {docs.length === 0 ? (
                <Box
                  sx={{
                    width: "100%",
                    py: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      fontSize: "1rem",
                      color: "gray",
                    }}
                  >
                    {getString("message", "noSampleUploaded")}
                  </Typography>
                </Box>
              ) : (
                <List dense disablePadding>
                  {docs.map((d) => {
                    return (
                      <ListItem
                        key={`li-sample-${d.uid}`}
                        secondaryAction={
                          <Button
                            onClick={() => {
                              setSelectedDeleteAudio(d);
                            }}
                            variant="contained"
                            size="small"
                            disableElevation
                          >
                            {getString("common", "delete")}
                          </Button>
                        }
                      >
                        <ListItemIcon>
                          <IconButton onClick={() => {
                            dispatch(
                              play({
                                category: d.cat,
                                restriction: d.restric,
                                src: getUrlFromStorageBucket(d.filename),
                              })
                            );
                          }}>
                            <PlayArrowIcon />
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText primary={d.cat} secondary={getString("profile", d.restric.toUpperCase())} />
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </Grid>
          </SettingSection>
        </Stack>
      </React.Fragment>
    );
}

export default SeiyuSampleEdit