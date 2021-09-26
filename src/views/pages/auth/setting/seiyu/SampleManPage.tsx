import { ArrowBack, Delete, GraphicEq, List } from "@mui/icons-material";
import React, { Component } from "react";
import { getString } from "../../../../../utils/localization";
import AlertMessage from "../../../../components/common/AlertMessage";
import SectionHeader from "../../../../components/common/SectionHeader";
import NavigationBar from "../../../../components/navigation/NavigationBar";
import {
  fetchProfileAsync,
  insertSampleAsync,
  deleteSampleAsync,
} from "../../../../../redux/slices/userSlice";
import { clearAlertSync } from "../../../../../redux/slices/alertMessageSlice";
import { setAudio } from "../../../../../redux/slices/audioPlayerSlice";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MessageBlock from "../../../../components/common/MessageBlock";
import SettingNavigationMenu from "../SettingNavigationMenu";
import { palette } from "../../../../../assets/styles/palette";
import { createStyles, Container, Button, Grid, Paper, ListItem, ListItemText, ListItemSecondaryAction, Typography, Divider, IconButton, Card, Box, TextField } from "@mui/material";
import { css } from "@emotion/react";

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

const selectButtonStyle = css`
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
//   selectButton: {
//     height: "56px",
//   },
// });

interface IState {
  uploaded: File | null;
  type: string;
}

class SampleManPage extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      uploaded: null,
      type: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearAlertSync();
    if(this.props.profile === null) {
      this.props.fetchProfileAsync(localStorage.getItem("uid") ?? "");
    }
    window.scrollTo(0, 0);
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState<never>({
      [event.target.name]: event.target.value,
    });
  };

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      uploaded: event.target.files ? event.target.files[0] : null,
    });
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log({
    //   uploaded: this.state.uploaded,
    //   type: this.state.type,
    // });
    this.props.insertSampleAsync({
      file: this.state.uploaded,
      type: this.state.type,
    });
  };

  render() {
    const { history, profile } = this.props;
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
            <Grid
              item
              md={8}
              sm={12}
              xs={12}
              container
              spacing={2}
              component="form"
              onSubmit={this.handleSubmit}
            >
              <Grid item md={12} sm={12} xs={12}>
                <SectionHeader
                  title={getString("ja", "link", "sampleManagement")}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Paper variant="outlined">
                  <List>
                    <ListItem>
                      <ListItemText primary={`Sample Name`} />
                      <ListItemSecondaryAction>
                        <Typography variant="button">action</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    {profile &&
                      profile.samples &&
                      profile.samples.length > 0 &&
                      profile.samples.map((sample: any, index: number) => {
                        return (
                          <ListItem
                            key={`li-sample-${sample.sid}`}
                            component={Button}
                            onClick={() => {
                              this.props.setAudio({
                                sid: sample.sid,
                                title: sample.type,
                                source: sample.link,
                                actor: "",
                              });
                            }}
                          >
                            <ListItemText primary={sample.type} />
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                  this.props.deleteSampleAsync(sample.sid);
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                    {profile &&
                      profile.samples &&
                      profile.samples.length === 0 && (
                        <MessageBlock
                          icon={<GraphicEq fontSize="small" color="disabled" />}
                          message={getString(
                            "ja",
                            "message",
                            "noSampleUploaded"
                          )}
                        />
                      )}
                  </List>
                </Paper>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <SectionHeader title={getString("ja", "common", "upload")} />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Card variant="outlined">
                  <Box my={2} mx={1}>
                    <TextField
                      id="type"
                      name="type"
                      variant="outlined"
                      required
                      label={getString("ja", "profileDetail", "charactor")}
                      value={this.state.type}
                      onChange={this.handleChange}
                    />
                    <TextField
                      variant="outlined"
                      label={getString("ja", "common", "file")}
                      value={
                        this.state.uploaded !== null
                          ? this.state.uploaded.name
                          : ""
                      }
                      disabled
                    />
                    <Button
                      css={selectButtonStyle}
                      variant="contained"
                      component="label"
                      disableElevation
                    >
                      {getString("ja", "common", "select")}
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={this.handleFileChange}
                        required
                        hidden
                      />
                    </Button>
                  </Box>
                </Card>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Button css={saveButtonStyle} type="submit">
                  {getString("ja", "common", "upload")}
                </Button>
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
    { fetchProfileAsync, clearAlertSync, insertSampleAsync, deleteSampleAsync, setAudio },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleManPage);
