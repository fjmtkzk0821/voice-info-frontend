import {
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  Box,
  TextField,
} from "@mui/material";
import core from "../../assets/jss/core";
import DefaultCardContent from "../../components/DefaultCardContent";
import DefaultSection from "../../components/DefaultSection";
import StylelessRouteLink from "../../components/StylelessRouteLink";
import EmailIcon from "@mui/icons-material/Email";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { dismissMessage, setMessage } from "../../features/messageSlice";
import { isStringEmpty, isValidEmailAddress, scroll2Top } from "../../utils/common";
import BaseMessage, { BaseMessageType } from "../../utils/objects/BaseMessage";
import axios from "axios";
import authService from '../../services/auth';
import { setLoading, dismissLoading } from "../../features/loadingBackdropSlice";
import AlertMessage from "../../components/AlertMessage";

function ForgotPassword() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [sendStatus, setSendStatus] = useState(false);

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
    if(isStringEmpty(email)) {
      dispatch(
        setMessage(
          new BaseMessage(
            "field-empty",
            "Email are required.",
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
    await onSubmit();
  }

  async function onSubmit() {
    dispatch(setLoading());
    dispatch(dismissMessage());
    try {
        const { code, message, data } = await authService.userResetPassword(email);
        // console.log(data);
        setSendStatus(true);
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
        <Grid item xs={12} sm={8} md={8}>
          <AlertMessage />
        </Grid>
        {sendStatus ? (
          <Grid item xs={12} sm={8} md={8}>
            <DefaultSection icon={<EmailIcon />} label={"Reset Password"}>
              <DefaultCardContent>
                <Stack>
                  <Typography component="p" variant="body1">
                    A verification email was sent. Please check the email to
                    activate your account
                  </Typography>
                  <StylelessRouteLink
                    linkProps={{
                      to: "/auth/signin",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disableElevation
                      fullWidth
                      sx={{
                        mt: 2,
                      }}
                    >
                      Goto Login
                    </Button>
                  </StylelessRouteLink>
                </Stack>
              </DefaultCardContent>
            </DefaultSection>
          </Grid>
        ) : (
          <Grid item xs={12} sm={8} md={8}>
            <DefaultSection icon={<EmailIcon />} label={"Forgot Password"}>
              <DefaultCardContent>
                <Stack>
                  <Typography component="p" variant="body2">
                    パスワードを再設定するためのメールを送信します。
                    <br />
                    ご登録済みのメールアドレスを入力して「送信する」ボタンをクリックしてください。
                  </Typography>
                  <Box
                    component="form"
                    sx={{
                      paddingBottom: 2,
                    }}
                  >
                    <TextField
                      id="email"
                      label={"email"}
                      helperText="半角英数字"
                      variant="outlined"
                      value={email}
                      onChange={(event) => handleChange(event, setEmail)}
                      required
                      autoComplete="email"
                      autoFocus
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
                    Send reset password request
                  </Button>
                </Stack>
              </DefaultCardContent>
            </DefaultSection>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default ForgotPassword;