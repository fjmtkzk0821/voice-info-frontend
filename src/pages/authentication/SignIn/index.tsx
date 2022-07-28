import { Box, Button, Container, Divider, Grid, Paper, Stack, styled, TextField, Typography } from "@mui/material";
import core from "../../../assets/jss/core";
import DefaultCardContent from "../../../components/DefaultCardContent";
import DefaultSection from "../../../components/DefaultSection";
import EmailIcon from '@mui/icons-material/Email'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import PageHeader from "../../../components/PageHeader";
import StylelessRouteLink from "../../../components/StylelessRouteLink";
import AlertMessage from "../../../components/AlertMessage";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { dismissMessage, setMessage } from "../../../features/messageSlice";
import authService from '../../../services/auth';
import { isStringEmpty, isValidEmailAddress, scroll2Top } from "../../../utils/common";
import BaseMessage, { BaseMessageType } from "../../../utils/objects/BaseMessage";
import { useNavigate } from "react-router-dom";
import { dismissLoading, setLoading } from "../../../features/loadingBackdropSlice";
import axios from "axios";
import UserDocument from "../../../utils/objects/user";
import { loadUserData } from "../../../features/user/authSlice";
import { getString } from "../../../utils/localization";

function SignIn() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    scroll2Top();
    dispatch(dismissMessage());
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: Function
  ) => {
    setValue(event.target.value);
  };

  async function handleSubmit() {
    if(isStringEmpty(email) || isStringEmpty(password)) {
      dispatch(
        setMessage(
          new BaseMessage(
            "field-empty",
            "Email & password are required.",
            BaseMessageType.ERROR
          ).toObject()
        )
      );
      return;
    }
    if(!isValidEmailAddress(email)) {
      dispatch(
        setMessage(
          new BaseMessage(
            "email-not-valid",
            "please input a valid email address.",
            BaseMessageType.ERROR
          ).toObject()
        )
      );
      return;
    }
    await onSignIn({email, password});
    // dispatch(signInAsync({email, password}));
  }

  async function onSignIn(formData:{ email: string; password: string; }) {
    dispatch(setLoading());
    dispatch(dismissMessage());
    try {
      const { code, message, data } = await authService.userLogin(formData);
      // console.log(data);
      dispatch(loadUserData(UserDocument.fromObject(data).toObject()));
      dispatch(setMessage(new BaseMessage(code, message).toObject()));
      navigate("/", {replace: true});
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { code, message } = err.response?.data;
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
      <Container maxWidth="md" sx={core.mainContainer}>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <PageHeader label={getString("link", "login")} />
          </Grid>
          <Grid item xs={12}>
            <AlertMessage />
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <DefaultSection
              icon={<EmailIcon />}
              label={getString("auth", "loginWEmail")}
            >
              <DefaultCardContent>
                <Stack>
                  <Box
                    component="form"
                    sx={{
                      paddingBottom: 2,
                    }}
                  >
                    <TextField
                      id="email"
                      label={getString("auth", "email")}
                      variant="outlined"
                      onChange={(event) => handleChange(event, setEmail)}
                      required
                      autoComplete="email"
                      autoFocus
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      id="password"
                      type="password"
                      label={getString("auth", "password")}
                      variant="outlined"
                      onChange={(event) => handleChange(event, setPassword)}
                      required
                      autoComplete="current-password"
                      margin="normal"
                      fullWidth
                    />
                  </Box>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    disableElevation
                    fullWidth
                    sx={{
                      mt: 2,
                    }}
                  >
                    {getString("link", "login")}
                  </Button>
                  <StylelessRouteLink linkProps={{ to: "/auth/forgot" }}>
                    <Button
                      // variant="contained"
                      // color="secondary"
                      size="small"
                      disableElevation
                      fullWidth
                      sx={{
                        mt: 1,
                      }}
                    >
                      {getString("message", "forgotpw")}
                    </Button>
                  </StylelessRouteLink>
                </Stack>
              </DefaultCardContent>
            </DefaultSection>
          </Grid>
          <Grid
            item
            xs={12}
            sm={5}
            md={6}
            container
            justifyContent="center"
            alignItems="flex-start"
            spacing={3}
          >
            {/* <Grid item xs={12}>
              <DefaultSection
                icon={<AccountTreeIcon />}
                label={"Login with SNS"}
              >
                <DefaultCardContent>
                  <Button
                    variant="contained"
                    size="large"
                    disableElevation
                    fullWidth
                    sx={{
                      my: 1,
                      backgroundColor: "#1da1f2",
                      "&:hover": {
                        backgroundColor: "#337ab7",
                      },
                    }}
                  >
                    Sign In with Twitter
                  </Button>
                </DefaultCardContent>
              </DefaultSection>
            </Grid> */}
            <Grid item xs={12}>
              <DefaultSection
                icon={<QuestionMarkIcon />}
                label={getString("message", "noAccount")}
              >
                <DefaultCardContent>
                  <StylelessRouteLink linkProps={{ to: "/auth/signup" }}>
                    <Button
                      variant="outlined"
                      size="large"
                      disableElevation
                      fullWidth
                    >
                      {getString("link", "register")}
                    </Button>
                  </StylelessRouteLink>
                </DefaultCardContent>
              </DefaultSection>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
}

export default SignIn