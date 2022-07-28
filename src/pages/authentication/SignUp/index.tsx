import { Alert, AlertTitle, Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, Paper, Stack, styled, TextField, Typography } from "@mui/material";
import core from "../../../assets/jss/core";
import DefaultCardContent from "../../../components/DefaultCardContent";
import DefaultSection from "../../../components/DefaultSection";
import EmailIcon from '@mui/icons-material/Email'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import PageHeader from "../../../components/PageHeader";
import React, { useEffect, useState } from "react";
import StylelessRouteLink from "../../../components/StylelessRouteLink";
import { useAppDispatch } from "../../../app/hooks";
import AlertMessage from "../../../components/AlertMessage";
import { isStringEmpty, isValidEmailAddress, scroll2Top } from "../../../utils/common";
import { dismissMessage, setMessage } from "../../../features/messageSlice";
import BaseMessage, { BaseMessageType } from "../../../utils/objects/BaseMessage";
import axios from "axios";
import authService from '../../../services/auth';
import { setLoading, dismissLoading } from "../../../features/loadingBackdropSlice";
import { useNavigate } from "react-router-dom";
import { getString } from "../../../utils/localization";

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

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
    if(password !== confirmPw) {
      dispatch(
        setMessage(
          new BaseMessage(
            "password-not-same",
            "please input the same password twice",
            BaseMessageType.ERROR
          ).toObject()
        )
      );
      return;
    }
    await onSignUp({email, password});
    // dispatch(registerAsync({email, password}));
  }

  async function onSignUp(formData:{ email: string; password: string; }) {
    dispatch(setLoading());
    dispatch(dismissMessage());
    try {
      const { code, message, data } = await authService.userSignUp(formData);
      // console.log(data);
      navigate("/auth/signup/complete");
      // dispatch(setMessage(new BaseMessage(code, message).toObject()));
      // navigate("/", {replace: true});
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
            <PageHeader label={getString("link", "register")} />
          </Grid>
          <Grid item xs={12}>
            <AlertMessage />
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <DefaultSection icon={<EmailIcon />} label={getString("auth", "signupWEmail")}>
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
                      value={email}
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
                      value={password}
                      onChange={(event) => handleChange(event, setPassword)}
                      required
                      autoComplete="current-password"
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      id="confirmPw"
                      type="password"
                      label={getString("message", "pwConfirm")}
                      variant="outlined"
                      value={confirmPw}
                      onChange={(event) => handleChange(event, setConfirmPw)}
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
                    {getString("link", "register")}
                  </Button>
                  {/* <Button
                    // variant="contained"
                    // color="secondary"
                    size="small"
                    disableElevation
                    fullWidth
                    sx={{
                      mt: 1,
                    }}
                  >
                    Terms of Use
                  </Button> */}
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
                label={"Sign Up With SNS"}
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
                    Sign Up with Twitter
                  </Button>
                </DefaultCardContent>
              </DefaultSection>
            </Grid> */}
            <Grid item xs={12}>
              <DefaultSection
                icon={<QuestionMarkIcon />}
                label={getString("message", "haveAccount")}
              >
                <DefaultCardContent>
                  <StylelessRouteLink linkProps={{ to: "/auth/signin" }}>
                    <Button
                      variant="outlined"
                      size="large"
                      disableElevation
                      fullWidth
                    >
                      {getString("link", "login")}
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

export default SignUp;
