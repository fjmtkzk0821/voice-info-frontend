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
import { registerAsync } from "../../../redux/slices/userSlice";
import { clearAlertSync } from "../../../redux/slices/alertMessageSlice";
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
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class RegisterPage extends Component<any & WithStyles<typeof styles>, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      role: "seiyu",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  componentDidMount() {
    this.props.clearAlertSync();
  }

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
      role: this.state.role,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    this.props.registerAsync(userData, this.props.history);
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
                        select
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="role"
                        label={getString("ja", "profile", "role")}
                        name="role"
                        value={this.state.role}
                        onChange={this.handleChange}
                      >
                        <MenuItem key="SeiYu" value="seiyu">
                          声優
                        </MenuItem>
                        {/* <MenuItem key="Circle" value="circle">
                      Circle
                    </MenuItem> */}
                      </TextField>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={getString("ja", "profile", "email")}
                        name="email"
                        autoComplete="email"
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
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label={getString("ja", "message", "pwConfirm")}
                        type="password"
                        id="confirmPasseord"
                        autoComplete="current-password"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        {getString("ja", "link", "register")}
                      </Button>
                      <Grid container>
                        <Grid item>
                          <Link
                            variant="body2"
                            component={RouterLink("/login")}
                          >
                            {getString("ja", "message", "haveAccount")}
                            {/* {"Already have account? Sign In"} */}
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
  return bindActionCreators(
    { registerAsync, clearAlertSync },
    dispatch
  );
}

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(RegisterPage)
);
