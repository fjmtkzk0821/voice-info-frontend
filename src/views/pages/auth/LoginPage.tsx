import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  createStyles,
  Grid,
  Link,
  MenuItem,
  TextField,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React, { Component, Fragment } from "react";
import { getString } from "../../../utils/localization";
import AlertMessage from "../../components/common/AlertMessage";
import NavigationBar from "../../components/navigation/NavigationBar";
import RouterLink from "../../components/common/RouterLink";
import { AppDispatch } from "../../../redux/store";
import { bindActionCreators } from "redux";
import { loginAsync } from "../../../redux/slices/userSlice";
import { connect } from "react-redux";

const styles = (theme: Theme) =>
  createStyles({
    mt4: {
      marginTop: theme.spacing(4),
    },
    pt8: {
      paddingTop: theme.spacing(8),
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

interface IState {
  email: string;
  password: string;
}

class LoginPage extends Component<any & WithStyles<typeof styles>, IState> {
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
    const { classes } = this.props;
    return (
      <Fragment>
        <NavigationBar />
        <div className="mt-default">
          <Container maxWidth="xs">
            <Box pt={2}>
              <Card>
                <AlertMessage />
                <CardContent>
                  <div className={classes.paper}>
                    <img src="/images/logo512.png" height={128} />
                    <Typography
                      className={classes.mt4}
                      component="h1"
                      variant="h5"
                    >
                      {getString("ja", "link", "register")}
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
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
                        className={classes.submit}
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
                    </form>
                  </div>
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

export default withStyles(styles)(connect(null, mapDispatchToProps)(LoginPage));
