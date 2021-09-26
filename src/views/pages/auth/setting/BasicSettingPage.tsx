import { ArrowBack } from "@mui/icons-material";
import { Component } from "react";
import { bindActionCreators } from "redux";
import { palette } from "../../../../assets/styles/palette";
import { User } from "../../../../objects/user";
import { AppDispatch, RootState } from "../../../../redux/store";
import { getString } from "../../../../utils/localization";
import AlertMessage from "../../../components/common/AlertMessage";
import SectionHeader from "../../../components/common/SectionHeader";
import NavigationBar from "../../../components/navigation/NavigationBar";
import SettingNavigationMenu from "./SettingNavigationMenu";
import { clearAlertSync } from "../../../../redux/slices/alertMessageSlice";
import {
  fetchProfileAsync,
  updateBasicInformationAsync,
  setProfile,
} from "../../../../redux/slices/userSlice";
import {setBackdrop, dismissBackdrop} from '../../../../redux/slices/backdropSlice'
import { connect } from "react-redux";
import { createStyles, Container, Button, Grid, Card, CardContent, Box, FormControlLabel, TextField, MenuItem, withStyles, Switch, withTheme, createTheme } from "@mui/material";
import { css } from "@emotion/react";

interface IState {
  init: boolean;
  uploaded: File | null;
  data: User;
}

const saveButtonStyle = css`
float: right,
    height: 47px,
    border: 1px solid ${palette.primary},
    background: ${palette.accent},
    color: ${palette.primary};
    :hover {
      background: ${palette.accent};
      color: ${palette.primary};
    };
`;

const uploadButtonStyle = css`
  height: 56px;
`;

// const styles = createStyles({
//   saveButton: {
//     float: "right",
//     height: "47px",
//     border: "1px solid " + palette.primary,
//     background: palette.accent,
//     color: palette.primary,
//     "&:hover": {
//       background: palette.accent,
//       color: palette.primary,
//     },
//   },
//   uploadButton: {
//     height: "56px",
//   },
// });

class BasicSettingPage extends Component<any, IState> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    let tmpState = null;
    if (!prevState.init && nextProps.profile) {
      tmpState = {
        init: true,
        data: new User(nextProps.profile),
      };
    }
    return tmpState;
  }

  constructor(props: any) {
    super(props);
    this.state = {
      init: false,
      uploaded: null,
      data: User.empty(),
    };
  }

  componentDidMount() {
    this.props.setBackdrop();
    this.props.setProfile(null);
    this.props.clearAlertSync();
    if(this.props.profile === null) {
      this.props.fetchProfileAsync(localStorage.getItem("uid") ?? "");
    }
    window.scrollTo(0, 0);
    this.props.dismissBackdrop();
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      data: this.state.data.changeData(event.target.name, event.target.value),
    });
  };

  handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      data: this.state.data.changeData(event.target.name, event.target.checked),
    });
  };

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      uploaded: event.target.files ? event.target.files[0] : null,
    });
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // let uid = localStorage.getItem("uid");
    this.props.updateBasicInformationAsync(
      this.state.data, //.changeData("uid", uid ? uid : ""),
      this.state.uploaded
    );

    // this.props.getUserProfile(this.props.user.credentials.uid);
  };

  onKeyPrevent = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") event.preventDefault();
  };

  render() {
    const theme = createTheme();
    const {  history } = this.props;
    return (
      <div className="mt-default">
        <NavigationBar />
        <Container>
          <AlertMessage />
          <Button color="primary" onClick={(event) => history.push("/setting")}>
            <ArrowBack />
            {getString("ja", "common", "back")}
          </Button>
          <form onSubmit={this.handleSubmit} onKeyDown={this.onKeyPrevent}>
            <Grid container justifyContent="space-around" spacing={2}>
              <Grid item md={8} sm={12} xs={12} container spacing={2}>
                <Grid item xs={8}>
                  <SectionHeader title={getString("ja", "link", "userBasic")} />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    css={saveButtonStyle}
                    type="submit"
                    variant="contained"
                    disableElevation
                  >
                    {getString("ja", "common", "save")}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box my={2}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.data.public}
                              onChange={this.handleSwitchChange}
                              name="public"
                            />
                          }
                          label={getString("ja", "message", "publicProfile")}
                        />
                      </Box>
                      <Box my={2}>
                        <TextField
                          variant="outlined"
                          label={getString("ja", "profile", "icon")}
                          disabled
                          value={
                            this.state.uploaded ? this.state.uploaded.name : ""
                          }
                        />
                        <Button
                          css={uploadButtonStyle}
                          variant="contained"
                          component="label"
                          disableElevation
                        >
                          {getString("ja", "common", "select")}
                          <input
                            type="file"
                            onChange={this.handleFileChange}
                            hidden
                          />
                        </Button>
                      </Box>
                      <Box my={2}>
                        <TextField
                          id="name"
                          name="name"
                          variant="outlined"
                          required
                          label={getString("ja", "profile", "name")}
                          fullWidth
                          value={this.state.data.name}
                          onChange={this.handleChange}
                        />
                      </Box>
                      <Box my={2}>
                        <TextField
                          select
                          id="gender"
                          name="gender"
                          variant="outlined"
                          required
                          label={getString("ja", "profile", "gender")}
                          fullWidth
                          value={this.state.data.gender}
                          onChange={this.handleChange}
                        >
                          <MenuItem key="F" value="F">
                            F
                          </MenuItem>
                          <MenuItem key="M" value="M">
                            M
                          </MenuItem>
                          <MenuItem key="NG" value="NG">
                            NG
                          </MenuItem>
                        </TextField>
                      </Box>
                      <Box my={2}>
                        <TextField
                          id="intro"
                          name="intro"
                          variant="outlined"
                          required
                          label={getString("ja", "profile", "intro")}
                          fullWidth
                          value={this.state.data.intro}
                          onChange={this.handleChange}
                        />
                      </Box>
                      <Box my={2}>
                        <TextField
                          id="twitter"
                          name="twitter"
                          variant="outlined"
                          label={getString("ja", "profile", "twitter")}
                          fullWidth
                          value={this.state.data.twitter}
                          onChange={this.handleChange}
                        />
                      </Box>
                      <Box my={2}>
                        <TextField
                          id="email"
                          name="email"
                          variant="outlined"
                          label={getString("ja", "profile", "email")}
                          fullWidth
                          value={this.state.data.email}
                          onChange={this.handleChange}
                        />
                      </Box>
                      <Box my={2}>
                        <TextField
                          id="page"
                          name="page"
                          variant="outlined"
                          label={getString("ja", "profile", "page")}
                          fullWidth
                          value={this.state.data.page}
                          onChange={this.handleChange}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid item md={4} sm={12} xs={12} container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                  <SettingNavigationMenu />
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    profile: state.user.profile,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators(
    {
      fetchProfileAsync,
      updateBasicInformationAsync,
      clearAlertSync,
      setBackdrop,
      dismissBackdrop,
      setProfile: setProfile,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicSettingPage);
