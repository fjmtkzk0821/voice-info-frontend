import { Box, Button, Card, CardContent, CardHeader, CardMedia, Chip, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Stack, Switch, TextField, Typography } from "@mui/material"
import axios from "axios";
import { useAppDispatch } from "../../../app/hooks";
import noImg from '../../../assets/img/no_img.jpg'
import { setLoading, dismissLoading } from "../../../features/loadingBackdropSlice";
import { dismissMessage, setMessage } from "../../../features/messageSlice";
import BaseMessage, { BaseMessageType } from "../../../utils/objects/BaseMessage";
import { FormRow, FormRowDivider } from "../components/FormGridComponents"
import authService from '../../../services/auth';
import { useEffect, useState } from "react";
import { SeiyuDocument } from "../../../utils/objects/seiyu";
import { getUrlFromStorageBucket, scroll2Top } from "../../../utils/common";
import { loadUserData } from "../../../features/user/authSlice";
import UserDocument from "../../../utils/objects/user";
import { cleanAuthHeader } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import ToggleGroupBlock from "../../../components/form/ToggleGroupBlock";
import SettingSection from "./components/SettingSection";
import { getString } from "../../../utils/localization";

function SeiyuInfoEdit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [doc, setDoc] = useState((new SeiyuDocument()).toObject());
  const [selectedAvatar, setSelectedAvatar] = useState<File>();
  const [possible, setPossible] = useState("");
  const [wish, setWish] = useState("");

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

  function onAvatarClick() {
    document.getElementById("btn-file-avatar")?.click();
  }

  async function onLoad() {
    dispatch(setLoading());
    try {
      const {data} = await authService.getSeiyuBasic();
      setDoc(data.basic);
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
      const { code, message, data } = await authService.seiyuBasicUpdate(doc, selectedAvatar);
      // console.log(data);
      dispatch(setMessage(new BaseMessage(code, message).toObject()));
      // navigate("/", {replace: true});
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
    scroll2Top();
  }

    return (
      <Stack spacing={2}>
        <Card
          sx={{
            backgroundColor: doc.publish ? "secondary.main" : null,
          }}
        >
          <CardHeader
            title={
              <Typography variant="subtitle1">
                {getString("message", "seiyuProfilePublish")}
                {doc.publish
                  ? getString("profile", "private")
                  : getString("profile", "public")}
              </Typography>
            }
            action={
              <Switch
                checked={doc.publish}
                onChange={(_, checked) => handleChange("publish", checked)}
              />
            }
            disableTypography
            sx={{
              py: 1,
            }}
          />
        </Card>
        <Card>
          <CardContent>
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              rowSpacing={2}
            >
              <FormRow label={getString("profile", "name")}>
                <TextField
                  value={doc.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  size="small"
                  inputProps={{
                    maxLength: 20,
                  }}
                  InputProps={{
                    endAdornment: (
                      <Typography variant="caption">
                        {doc.name.length}/20
                      </Typography>
                    ),
                  }}
                  fullWidth
                />
              </FormRow>
              <FormRowDivider />
              <FormRow label={getString("profile", "icon")}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Card>
                    <CardMedia
                      id="avatar-preview"
                      component="img"
                      height={128}
                      width={128}
                      sx={{
                        minWidth: 128,
                        minHeight: 128,
                      }}
                      src={
                        doc.avatar ? getUrlFromStorageBucket(doc.avatar) : noImg
                      }
                      alt={doc.avatar ? doc.avatar : "no-img"}
                    />
                  </Card>
                  <Paper variant="outlined">
                    <Box
                      sx={{
                        p: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <label htmlFor="btn-file-avatar">
                        <input
                          style={{ display: "none" }}
                          accept="image/*"
                          id="btn-file-avatar"
                          type="file"
                          onChange={(event) => {
                            if (event.target.files) {
                              // console.log(event.target.files[0]);
                              setSelectedAvatar(event.target.files[0]);
                              const reader = new FileReader();
                              reader.onload = () => {
                                let img = document.getElementById(
                                  "avatar-preview"
                                ) as HTMLImageElement;
                                img.src = (reader.result as string) ?? noImg;
                              };
                              reader.readAsDataURL(event.target.files[0]);
                            }
                          }}
                        />
                        <Button
                          onClick={onAvatarClick}
                          variant="contained"
                          // component="span"
                          disableElevation
                          fullWidth
                        >
                          {getString("message", "selectFile")}
                        </Button>
                      </label>
                      <Divider
                        variant="middle"
                        sx={{
                          my: 1,
                        }}
                      />
                      <Typography component="p" variant="caption">
                      {getString("message", "iconFormat")}
                        <br />
                        {getString("message", "iconSize")}
                      </Typography>
                    </Box>
                  </Paper>
                </Stack>
              </FormRow>
              <FormRowDivider />
              <FormRow label={getString("profile", "gender")}>
                <TextField
                  value={doc.gender}
                  onChange={(event) =>
                    handleChange("gender", event.target.value)
                  }
                  size="small"
                  select
                >
                  <MenuItem value="">--empty--</MenuItem>
                  <MenuItem value="F">{getString("profile", "F")}</MenuItem>
                  <MenuItem value="M">{getString("profile", "M")}</MenuItem>
                  <MenuItem value="NG">NG</MenuItem>
                </TextField>
              </FormRow>
              <FormRowDivider />
              <FormRow label={getString("profile", "intro")}>
                <TextField
                  value={doc.intro}
                  onChange={(event) =>
                    handleChange("intro", event.target.value)
                  }
                  size="small"
                  multiline
                  minRows={4}
                  inputProps={{
                    maxLength: 200,
                  }}
                  InputProps={{
                    endAdornment: (
                      <Typography variant="caption">
                        {doc.intro.length}/200
                      </Typography>
                    ),
                  }}
                  fullWidth
                ></TextField>
              </FormRow>
              <FormRowDivider />
              <FormRow label={getString("profile", "email")}>
                <TextField
                  value={doc.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  size="small"
                  fullWidth
                />
              </FormRow>
            </Grid>
          </CardContent>
        </Card>
        <SettingSection header={getString("profile", "voiceinfo")}>
          <ToggleGroupBlock
            group="v-hires"
            label={getString("profile", "hires")}
            options={
              new Map([
                ["on", getString("profile", "able")],
                ["off", getString("profile", "notable")],
              ])
            }
            value={doc.hires ? "on" : "off"}
            onChange={(value: any) => {
              let tmp = doc.hires ? "on" : "off";
              if (tmp !== value) handleChange("hires", !doc.hires);
            }}
          />
          <FormRowDivider />
          <ToggleGroupBlock
            group="v-restri"
            label={getString("profile", "rating")}
            options={
              new Map([
                ["r", getString("profile", "R")],
                ["r15", "R15"],
                ["r18", "R18"],
              ])
            }
            value={Object.keys(doc.restric).filter((key) => {
              return (doc.restric as any)[key];
            })}
            onChange={(values: string[]) => {
              let tmp: any = {
                r: false,
                r15: false,
                r18: false,
              };
              for (let value of values) {
                tmp[value] = true;
              }
              // console.log(values);
              handleChange("restric", tmp);
            }}
          />
          <FormRowDivider />
          <FormRow label={getString("profile", "possible")}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Stack direction="row" sx={{ flexWrap: "wrap", paddingX: 0.5 }}>
                  {doc.possible.map((value, index) => (
                    <Chip
                      key={`c-possible-${value}`}
                      label={value}
                      size="small"
                      sx={{ borderRadius: 1, my: 0.5, ml: 0.5 }}
                      onDelete={() => {
                        handleChange(
                          "possible",
                          doc.possible.filter((_, i) => i !== index)
                        );
                      }}
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={possible}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      handleChange("possible", doc.possible.concat(possible));
                      setPossible("");
                    }
                  }}
                  onChange={(event) => {
                    setPossible(event.target.value);
                  }}
                  size="small"
                  fullWidth
                  inputProps={{
                    maxLength: 12,
                  }}
                  InputProps={{
                    endAdornment: (
                      <Typography variant="caption">
                        {doc.possible.length}/8
                      </Typography>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </FormRow>
          <FormRowDivider />
          <FormRow label={getString("profile", "wish")}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Stack direction="row" sx={{ flexWrap: "wrap", paddingX: 0.5 }}>
                  {doc.wish.map((value, index) => (
                    <Chip
                      key={`c-wish-${value}`}
                      label={value}
                      size="small"
                      sx={{ borderRadius: 1, my: 0.5, ml: 0.5 }}
                      onDelete={() => {
                        handleChange(
                          "wish",
                          doc.wish.filter((_, i) => i !== index)
                        );
                      }}
                    />
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={wish}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      handleChange("wish", doc.wish.concat(wish));
                      setWish("");
                    }
                  }}
                  onChange={(event) => {
                    setWish(event.target.value);
                  }}
                  size="small"
                  fullWidth
                  inputProps={{
                    maxLength: 12,
                  }}
                  InputProps={{
                    endAdornment: (
                      <Typography variant="caption">
                        {doc.wish.length}/8
                      </Typography>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </FormRow>
        </SettingSection>
        <SettingSection header={getString("profile", "link")}>
          <FormRow label={getString("profile", "page")}>
            <TextField
              value={doc.personal}
              onChange={(event) => handleChange("personal", event.target.value)}
              size="small"
              fullWidth
            />
          </FormRow>
          <FormRowDivider />
          <FormRow label="Twitter">
            <TextField
              value={doc.twitter}
              onChange={(event) => handleChange("twitter", event.target.value)}
              size="small"
              fullWidth
            />
          </FormRow>
        </SettingSection>
        <Button
          onClick={() => onUpdate()}
          variant="contained"
          size="large"
          fullWidth
        >
          {getString("common", "save")}
        </Button>
      </Stack>
    );
}

export default SeiyuInfoEdit