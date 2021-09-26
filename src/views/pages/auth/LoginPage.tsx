import React, { Component, Fragment } from "react";
import { getString } from "../../../utils/localization";
import AlertMessage from "../../components/common/AlertMessage";
import NavigationBar from "../../components/navigation/NavigationBar";
import RouterLink from "../../components/common/RouterLink";
import { AppDispatch } from "../../../redux/store";
import { bindActionCreators } from "redux";
import { loginAsync } from "../../../redux/slices/userSlice";
import { connect } from "react-redux";
import { css } from "@emotion/react";
import { Container, Box, Card, CardContent, Typography, TextField, Button, Grid, Link, createTheme } from "@mui/material";
import { styled } from "@mui/system";

// const styles = (theme: Theme) =>
//   createStyles({
//     mt4: {
//       marginTop: theme.spacing(4),
//     },
//     pt8: {
//       paddingTop: theme.spacing(8),
//     },
//     paper: {
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//     },
//     form: {
//       width: "100%", // Fix IE 11 issue.
//       marginTop: theme.spacing(1),
//     },
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//     },
//   });

const Form = styled('form')({
      width: "100%", // Fix IE 11 issue.
      marginTop: "8px",
});

interface IState {
  email: string;
  password: string;
}

class LoginPage extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {}

  handleChange = <T extends keyof IState>(
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      [event.target.name]: event.target.value,
    } as unknown as { [P in T]: IState[P] });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginAsync(userData, this.props.history);
  };

  render() {
    const theme = createTheme();
    return (
      <Fragment>
        <NavigationBar />
        <div className="mt-default">
          <Container maxWidth="xs">
            <Box pt={2}>
              <Card>
                <AlertMessage />
                <CardContent>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <img src="/images/logo512.png" height={128} />
                    <Typography
                      css={css`
                      margin-top: ${theme.spacing(4)};
                    `}
                      component="h1"
                      variant="h5"
                    >
                      {getString("ja", "link", "register")}
                    </Typography>
                    <Form onSubmit={this.handleSubmit}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={getString("ja", "profile", "email")}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={getString("ja", "profile", "password")}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                      {/* <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                /> */}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        css={css`
                          margin: ${theme.spacing(3, 0, 2)};
                        `}
                      >
                        {getString("ja", "link", "login")}
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          {/* <Link href="#" variant="body2">
                        Forgot password?
                      </Link> */}
                        </Grid>
                        <Grid item>
                          <Link
                            variant="body2"
                            component={RouterLink("/register")}
                          >
                            {getString("ja", "message", "noAccount")}
                            {/* {`Don't have an account? Sign Up`} */}
                          </Link>
                        </Grid>
                      </Grid>
                    </Form>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Container>
        </div>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({ loginAsync }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginPage);
