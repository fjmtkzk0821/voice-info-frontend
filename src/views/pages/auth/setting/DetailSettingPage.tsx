import React, { Component } from "react";
import { palette } from "../../../../assets/styles/palette";
import { User } from "../../../../objects/user";
import { getString } from "../../../../utils/localization";
import AlertMessage from "../../../components/common/AlertMessage";
import SectionHeader from "../../../components/common/SectionHeader";
import DefaultEditor from "../../../components/common/DefaultEditor";
import NavigationBar from "../../../components/navigation/NavigationBar";
import SettingNavigationMenu from "./SettingNavigationMenu";
import { clearAlertSync } from "../../../../redux/slices/alertMessageSlice";
import {
  setBackdrop,
  dismissBackdrop,
} from "../../../../redux/slices/backdropSlice";
import {
  fetchProfileAsync,
  updateDetailInformationAsync,
  updateDLsiteScriptAsync,
  setProfile,
} from "../../../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ArrowBack, Edit } from "@mui/icons-material";
import { withStyles, Button, Container, Grid, Card, CardContent, Box, Paper, FormControlLabel, Typography, Checkbox, TextField, Chip, CardHeader, IconButton, Switch } from "@mui/material";
import {styled} from '@mui/material/styles';

const SaveButton = styled(Button)(({theme}) => ({
  float: "right",
  height: "47px",
  border: "1px solid " + palette.accent,
  background: palette.accent,
  color: palette.primary,
  "&:hover": {
    background: palette.accent,
    color: palette.primary,
  },
}));

// const SaveButton = withStyles({
//   root: {
//     float: "right",
//     height: "47px",
//     border: "1px solid " + palette.accent,
//     background: palette.accent,
//     color: palette.primary,
//     "&:hover": {
//       background: palette.accent,
//       color: palette.primary,
//     },
//   },
// })(Button);

class DetailSettingPage extends Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    let tmpState = null;
    if (!prevState.init && nextProps.profile) {
      tmpState = {
        init: true,
        data: User.setAsDetailProfile(nextProps.profile),
      };
    }
    return tmpState;
  }

  constructor(props: any) {
    super(props);
    this.state = {
      init: false,
      selectedEditor: "",
      tmpJozu: "",
      tmpWish: "",
      data: User.empty(),
    };
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDLsiteScriptSubmit = this.handleDLsiteScriptSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setBackdrop();
    this.props.setProfile(null);
    this.props.clearAlertSync();
    if (this.props.profile === null) {
      this.props.fetchProfileAsync(localStorage.getItem("uid") ?? "");
    }
    window.scrollTo(0, 0);
    this.props.dismissBackdrop();
  }

  handleEditorChange = (field: string) => {
    this.setState({
      selectedEditor: field,
    });
  };

  handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      data: this.state.data.changeData(event.target.name, event.target.checked),
    });
  };

  handleAbleChange = (key: string) => {
    this.setState({
      data: this.state.data.changeData("able", {
        ...this.state.data.able,
        [key]: !this.state.data.able[key],
      }),
    });
  };

  handleChipChange = (event: any, field: string, textField: string) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    } else if (event.keyCode === 32) {
      event.preventDefault();
      //   console.log(this.state[textField]);
      if (this.state[textField].length > 0) {
        //   console.log(this.state.data[field]);
        let tmp: any[] = [].concat(this.state.data[field]);
        tmp.push(this.state[textField]);
        this.setState({
          [textField]: "",
          data: this.state.data.changeData(field, tmp),
        });
      }
    } else {
      this.setState({
        [textField]: event.target.value,
      });
    }
  };

  handleChipRemove = (field: string, index: number) => {
    if (index < this.state.data[field].length) {
      let tmp = this.state.data[field].filter((element: any, i: number) => {
        return index !== i;
      });
      this.setState({
        data: this.state.data.changeData(field, tmp),
      });
    }
  };

  handleTextChange = (field: string, value: string) => {
    this.setState({
      data: this.state.data.changeData(field, value),
    });
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // let uid = localStorage.getItem("uid");
    this.props.updateDetailInformationAsync(this.state.data);
  };

  handleDLsiteScriptSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.updateDLsiteScriptAsync(this.state.data.dlsiteScript);
  };

  render() {
    const { history } = this.props;
    const detail = this.state.data.getDetailObject();
    return (
      <div className="mt-default">
        <NavigationBar />
        <Container>
          <AlertMessage />
          <Button color="primary" onClick={(event) => history.push("/setting")}>
            <ArrowBack />
            {getString("ja", "common", "back")}
          </Button>
          <Grid container justifyContent="space-around" spacing={2}>
            <Grid item md={8} sm={12} xs={12} container spacing={2}>
              <Grid
                item
                container
                component="form"
                noValidate
                onSubmit={this.handleSubmit}
                spacing={2}
              >
                <Grid item md={8} sm={8} xs={8}>
                  <SectionHeader
                    title={getString("ja", "link", "userDetail")}
                  />
                </Grid>
                <Grid item md={4} sm={4} xs={4}>
                  <SaveButton
                    type="submit"
                    variant="contained"
                    disableElevation
                  >
                    {getString("ja", "common", "save")}
                  </SaveButton>
                </Grid>
                {this.state.init && (
                  <Grid item md={12} sm={12} xs={12}>
                    <Card variant="outlined">
                      <CardContent>
                        <Box my={2}>
                          <Paper
                            className="MuiOutlinedInput-input"
                            variant="outlined"
                            square
                          >
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={detail.hires}
                                  onChange={this.handleSwitchChange}
                                  name="hires"
                                />
                              }
                              label={getString("ja", "profileDetail", "hires")}
                            />
                          </Paper>
                        </Box>
                        <Box my={2}>
                          <Paper
                            //className="MuiOutlinedInput-input"
                            variant="outlined"
                            square
                          >
                            <Box mr={1}>
                              <Typography variant="subtitle1">
                                {getString("ja", "profileDetail", "able")}
                              </Typography>
                            </Box>
                            {Object.keys(detail.able).map((element, index) => {
                              return (
                                <FormControlLabel
                                  key={`fccb-${element}`}
                                  control={
                                    <Checkbox
                                      name={element}
                                      checked={detail.able[element]}
                                      onChange={() =>
                                        this.handleAbleChange(element)
                                      }
                                    />
                                  }
                                  label={element}
                                />
                              );
                            })}
                          </Paper>
                        </Box>
                        <div>
                          <Box my={2}>
                            <TextField
                              variant="outlined"
                              required
                              label={getString("ja", "profileDetail", "jozu")}
                              fullWidth
                              value={this.state.tmpJozu}
                              helperText={getString(
                                "ja",
                                "message",
                                "chipHelper"
                              )}
                              onChange={(event) => {
                                this.handleChipChange(event, "jozu", "tmpJozu");
                              }}
                              onKeyDown={(event) => {
                                this.handleChipChange(event, "jozu", "tmpJozu");
                              }}
                            />
                          </Box>
                          <Box my={2}>
                            {detail.jozu.map((element: any, index: number) => {
                              return (
                                <Chip
                                  key={`chip-jozu-${index}`}
                                  label={element}
                                  onDelete={() =>
                                    this.handleChipRemove("jozu", index)
                                  }
                                />
                              );
                            })}
                          </Box>
                        </div>
                        <div>
                          <Box my={2}>
                            <TextField
                              variant="outlined"
                              required
                              label={getString("ja", "profileDetail", "wish")}
                              fullWidth
                              value={this.state.tmpWish}
                              helperText={getString(
                                "ja",
                                "message",
                                "chipHelper"
                              )}
                              onChange={(event) => {
                                this.handleChipChange(event, "wish", "tmpWish");
                              }}
                              onKeyDown={(event) => {
                                this.handleChipChange(event, "wish", "tmpWish");
                              }}
                            />
                          </Box>
                          <Box my={2}>
                            {detail.wish.map((element: any, index: number) => {
                              return (
                                <Chip
                                  key={`chip-wish-${index}`}
                                  label={element}
                                  onDelete={() =>
                                    this.handleChipRemove("wish", index)
                                  }
                                />
                              );
                            })}
                          </Box>
                        </div>
                        <RichTextField
                          field="statusDetail"
                          value={detail.statusDetail}
                          handleEditorChange={(e: any) => {
                            this.handleEditorChange("statusDetail");
                          }}
                          onChange={(content: any) => {
                            this.handleTextChange("statusDetail", content);
                          }}
                          selected={
                            this.state.selectedEditor === "statusDetail"
                          }
                        />
                        <RichTextField
                          field="precaution"
                          value={detail.precaution}
                          handleEditorChange={(e: any) => {
                            this.handleEditorChange("precaution");
                          }}
                          onChange={(content: any) => {
                            this.handleTextChange("precaution", content);
                          }}
                          selected={this.state.selectedEditor === "precaution"}
                        />
                        <RichTextField
                          field="feeDetail"
                          value={detail.feeDetail}
                          handleEditorChange={(e: any) => {
                            this.handleEditorChange("feeDetail");
                          }}
                          onChange={(content: any) => {
                            this.handleTextChange("feeDetail", content);
                          }}
                          selected={this.state.selectedEditor === "feeDetail"}
                        />
                        <RichTextField
                          field="equip"
                          value={detail.equip}
                          handleEditorChange={(e: any) => {
                            this.handleEditorChange("equip");
                          }}
                          onChange={(content: any) => {
                            this.handleTextChange("equip", content);
                          }}
                          selected={this.state.selectedEditor === "equip"}
                        />
                        <RichTextField
                          field="otherDetail"
                          value={detail.otherDetail}
                          handleEditorChange={(e: any) => {
                            this.handleEditorChange("otherDetail");
                          }}
                          onChange={(content: any) => {
                            this.handleTextChange("otherDetail", content);
                          }}
                          selected={this.state.selectedEditor === "otherDetail"}
                        />
                        <RichTextField
                          field="experiences"
                          value={detail.experiences}
                          handleEditorChange={(e: any) => {
                            this.handleEditorChange("experiences");
                          }}
                          onChange={(content: any) => {
                            this.handleTextChange("experiences", content);
                          }}
                          selected={this.state.selectedEditor === "experiences"}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
              <Grid
                item
                container
                component="form"
                noValidate
                onSubmit={this.handleDLsiteScriptSubmit}
                spacing={2}
              >
                <Grid item md={8} sm={8} xs={8}>
                  <SectionHeader
                    title={getString("ja", "profileDetail", "dlsiteBlogPart")}
                  />
                </Grid>
                <Grid item md={4} sm={4} xs={4}>
                  <SaveButton
                    type="submit"
                    variant="contained"
                    disableElevation
                  >
                    {getString("ja", "common", "save")}
                  </SaveButton>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <Card variant="outlined">
                    <CardHeader
                      subheader={
                        <span>
                          オススメは縦長ブログパーツです、詳しくは
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.dlsite.com/maniax/blogparts"
                          >
                            DLsite公式サイトへ(https://www.dlsite.com/maniax/blogparts)
                          </a>
                        </span>
                      }
                    />
                    <CardContent>
                      <Box mb={2}>
                        <TextField
                          id="dlsiteScript"
                          name="dlsiteScript"
                          variant="outlined"
                          required
                          label={getString(
                            "ja",
                            "profileDetail",
                            "dlsiteScript"
                          )}
                          multiline
                          rows={5}
                          fullWidth
                          value={this.state.data.dlsiteScript}
                          onChange={(event) => {
                            this.setState({
                              data: this.state.data.changeData(
                                "dlsiteScript",
                                event.target.value
                              ),
                            });
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4} sm={12} xs={12} container spacing={2}>
              <Grid item md={12} sm={12} xs={12}>
                <SettingNavigationMenu />
              </Grid>
            </Grid>
          </Grid>
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
      clearAlertSync,
      fetchProfileAsync,
      updateDetailInformationAsync,
      updateDLsiteScriptAsync,
      setBackdrop,
      dismissBackdrop,
      setProfile: setProfile,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailSettingPage);

function RichTextField(props: {
  field: string;
  value: string;
  selected: boolean;
  handleEditorChange: any;
  onChange: any;
}) {
  const { field, handleEditorChange, onChange, value, selected } = props;
  const editor = (
    <DefaultEditor
      content={value}
      onChange={(content: string) => {
        onChange(content);
      }}
    />
  );
  const display = (
    <CardContent>
      <div
        dangerouslySetInnerHTML={{
          __html: value,
        }}
      ></div>
    </CardContent>
  );

  return (
    <Box my={2}>
      <Card variant="outlined">
        <CardHeader
          title={
            <Typography variant="subtitle1" component="h5">
              {getString("ja", "profileDetail", field)}
            </Typography>
          }
          action={
            <IconButton
              onClick={(e) => {
                handleEditorChange(field);
              }}
            >
              <Edit />
            </IconButton>
          }
        />
        <div style={{ display: selected ? "block" : "none" }}>{editor}</div>
        {!selected && display}
      </Card>
    </Box>
  );
}
