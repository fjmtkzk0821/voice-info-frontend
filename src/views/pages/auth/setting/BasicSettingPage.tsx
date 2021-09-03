import {
  Button,
  Card,
  Container,
  Grid,
  withStyles,
  Box,
  CardContent,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
  createStyles,
  FormControl,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Component } from "react";
import { palette } from "../../../../assets/styles/palette";
import { User } from "../../../../objects/user";
import { getString } from "../../../../utils/localization";
import AlertMessage from "../../../components/common/AlertMessage";
import SectionHeader from "../../../components/common/SectionHeader";
import NavigationBar from "../../../components/navigation/NavigationBar";
import SettingNavigationMenu from "./SettingNavigationMenu";

// const SaveButton = withStyles({
//   root: {
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
// })(Button);

// const UploadButton = withStyles({
//   root: {
//     height: "56px",
//   },
// })(Button);

interface IState {
  init: boolean;
  uploaded: File | null;
  data: User;
}

const styles = createStyles({
  saveButton: {
    float: "right",
    height: "47px",
    border: "1px solid " + palette.primary,
    background: palette.accent,
    color: palette.primary,
    "&:hover": {
      background: palette.accent,
      color: palette.primary,
    },
  },
  uploadButton: {
    height: "56px",
  },
});

class BasicSettingPage extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      init: false,
      uploaded: null,
      data: User.empty(),
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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

  handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    let uid = localStorage.getItem("uid");
    this.props.updateBasicInfo(this.state.uploaded, this.state.data, uid);

    // this.props.getUserProfile(this.props.user.credentials.uid);
  };

  onKeyPrevent = (event: React.KeyboardEvent<typeof FormControl>) => {
    if (event.key === "Enter") event.preventDefault();
  };

  render() {
    const { classes, history } = this.props;
    return (
      <div className="mt-default">
        <NavigationBar />
        <Container>
          <AlertMessage />
          <Button color="primary" onClick={(event) => history.push("/setting")}>
            <ArrowBack />
            {getString("ja", "common", "back")}
          </Button>
          <form>
            <Grid container spacing={2}>
              <Grid item md={8} sm={12} xs={12} container spacing={2}>
                <Grid item xs={8}>
                  <SectionHeader title={getString("ja", "link", "userBasic")} />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    className={classes.saveButton}
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
                          className={classes.uploadButton}
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

export default withStyles(styles)(BasicSettingPage);
