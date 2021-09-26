import { jsx, css } from "@emotion/react";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { palette } from "../../assets/styles/palette";
import { clearAlertSync } from "../../redux/slices/alertMessageSlice";
import { fetchSeiyuProfileAsync } from "../../redux/slices/dataStorageSlice";
import { setAudio } from "../../redux/slices/audioPlayerSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { didContainString, isStringNullOrEmpty } from "../../utils/commonTools";
import { getString } from "../../utils/localization";
import CardSection from "../components/CardSection";
import AlertMessage from "../components/common/AlertMessage";
import MessageBlock from "../components/common/MessageBlock";
import DLsiteIframe from "../components/DLsiteIframe";
import NavigationBar from "../components/navigation/NavigationBar";
import { ArrowBack, GraphicEq } from "@mui/icons-material";
import {
  createStyles,
  Container,
  Button,
  Grid,
  Card,
  Box,
  Typography,
  Chip,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  Link,
} from "@mui/material";

const innerGridStyle = css`
  margin: 8px;
`;

const detailStyle = css`
  display: flex;
  flex-direction: row;
  @media (max-width: 480px) {
    display: "flex",
    flex-direction: "column",
  };
`;

const restrictedLabelStyle = css`
  padding-top: 4px;
    padding-bottom: 4px;
    margin-top: 4px;
    margin-bottom: 4px;
    background: #fbeeca;
    color: #c56601;
    text-align: center;
    font-weight: bold;
`;

const playButtonStyle = css`
  height: 100%;
    padding-left: 24px;
    padding-right: 24px;
    background: ${palette.primary};
    border-radius: 0;
    :hover {
      background: ${palette.primary},
    },
`;

const playIconStyle = css`
  height: 22;
    width: 22;
    color: ${palette.white};
`;

const sectionHeaderStyle = css`
font-size: 18px;
    font-weight: bold;
    padding: 8px 24px;
    width: fit-content;
    background: ${palette.primary};
    color: ${palette.white};
`;

const customButtonStyle = css`
height: 100%;
    width: 100%;
    border: 1px solid ${palette.accent},
    color: ${palette.accent},
    :hover {
      background: ${palette.accent},
      color: ${palette.primary},
    }`;

const twitterButtonStyle = css`
height: 100%;
    width: 100%;
    border: 1px solid #1DA1F2;
    color: #1DA1F2;
    :hover {
      background: #1DA1F2;
      color: ${palette.white};
    },
`;

// const styles = {
//   innerGrid: {
//     margin: "8px",
//   },
//   details: {
//     display: "flex",
//     flexDirection: "row",
//     "@media (max-width: 480px)": {
//       display: "flex",
//       flexDirection: "column",
//     },
//   },
//   restrictedLabel: {
//     paddingTop: "4px",
//     paddingBottom: "4px",
//     marginTop: "4px",
//     marginBottom: "4px",
//     background: "#fbeeca",
//     color: "#c56601",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   playButton: {
//     height: "100%",
//     paddingLeft: "24px",
//     paddingRight: "24px",
//     background: palette.primary,
//     borderRadius: 0,
//     "&:hover": {
//       background: palette.primary,
//     },
//   },
//   playIcon: {
//     height: 22,
//     width: 22,
//     color: palette.white,
//   },
//   sectionHeader: {
//     fontSize: "18px",
//     fontWeight: "bold",
//     padding: "8px 24px",
//     width: "fit-content",
//     background: palette.primary,
//     color: palette.white,
//   },
//   customButton: {
//     height: "100%",
//     width: "100%",
//     border: "1px solid " + palette.accent,
//     color: palette.accent,
//     "&:hover": {
//       background: palette.accent,
//       color: palette.primary,
//     },
//   },
//   twitterButton: {
//     height: "100%",
//     width: "100%",
//     border: "1px solid #1DA1F2",
//     color: "#1DA1F2",
//     "&:hover": {
//       background: "#1DA1F2",
//       color: palette.white,
//     },
//   },
// };

class SeiyuProfilePage extends Component<any, any> {
  componentDidMount() {
    this.props.clearAlertSync();
    window.scrollTo(0, 0);
    if (this.props.match.params.uid) {
      this.props.fetchSeiyuProfileAsync(this.props.match.params.uid);
    }
  }

  render() {
    const { history, profile } = this.props;
    return (
      <div className="mt-default">
        <NavigationBar />
        <Container>
          <AlertMessage />{" "}
          <Button color="primary" onClick={(event) => history.push("/setting")}>
            <ArrowBack />
            {getString("ja", "common", "back")}
          </Button>
          {profile && (
            <Grid container justifyContent="space-around" spacing={2}>
              <Grid item container direction="column" spacing={2} md={8}>
                <Grid item>
                  <Card variant="outlined">
                    <div css={detailStyle}>
                      <Grid item container spacing={0}>
                        <Grid item xs="auto">
                          <Box m={1}>
                            <Grid container direction="column">
                              <Grid item md={12} sm={12}>
                                <Box className="img-avatar">
                                  <img
                                    alt={profile.avatar.name}
                                    src={profile.avatar.link}
                                    className="img-avatar"
                                  />
                                </Box>
                              </Grid>
                              <Grid item md={12} sm={12}>
                                <div css={restrictedLabelStyle}>
                                  {Object.keys(profile.able).map(
                                    (range) =>
                                      profile.able[range] && (
                                        <span
                                          key={`span-able-${range}`}
                                          className="text-clip-margin"
                                        >
                                          {range}
                                        </span>
                                      )
                                  )}
                                </div>
                              </Grid>
                            </Grid>
                          </Box>
                        </Grid>
                        <Grid item md sm xs container>
                          <Grid
                            item
                            container
                            direction="column"
                            justifyContent="space-between"
                            spacing={2}
                            css={innerGridStyle}
                          >
                            <Grid item container spacing={1}>
                              <Grid item>
                                <Typography component="h5" variant="h5">
                                  {profile.name}
                                </Typography>
                              </Grid>
                              {!isStringNullOrEmpty(profile.gender) && (
                                <Grid item>
                                  <Chip label={profile.gender} />
                                </Grid>
                              )}
                              {profile.hires && (
                                <Grid item>
                                  <Chip
                                    label={
                                      profile.hires &&
                                      getString("ja", "profileDetail", "hires")
                                    }
                                  />
                                </Grid>
                              )}
                            </Grid>
                            <Grid item>
                              <Grid
                                container
                                direction="column"
                                justifyContent="space-between"
                                spacing={1}
                              >
                                {!isStringNullOrEmpty(profile.email) && (
                                  <Grid item>
                                    <CardSection
                                      header={getString(
                                        "ja",
                                        "profile",
                                        "email"
                                      )}
                                    >
                                      <Grid item>
                                        <Box px={2} py={1} my="auto">
                                          <Typography
                                            component="h6"
                                            variant="subtitle1"
                                          >
                                            {profile.email}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                    </CardSection>
                                  </Grid>
                                )}
                                {!isStringNullOrEmpty(profile.twitter) && (
                                  <Grid item>
                                    <Link
                                      href={`https://twitter.com/${profile.twitter}`}
                                    >
                                      <Button variant="outlined">
                                        Twitterへ
                                      </Button>
                                    </Link>
                                  </Grid>
                                )}
                                {!isStringNullOrEmpty(profile.page) && (
                                  <Grid item>
                                    <Link
                                      href={
                                        didContainString(profile.page, "http")
                                          ? profile.page
                                          : `https://${profile.page}`
                                      }
                                    >
                                      <Button variant="outlined">
                                        {getString("ja", "profile", "page")}へ
                                      </Button>
                                    </Link>
                                  </Grid>
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  </Card>
                </Grid>
                <Grid item>
                  <CardSection
                    header={getString("ja", "profileDetail", "jozu")}
                  >
                    {profile.jozu !== undefined &&
                      profile.jozu.map((value: any, index: number) => {
                        return (
                          <Grid key={`chip-jozu-${index}`} item>
                            <Box pl={2} my="auto">
                              <Typography component="p" variant="body1">
                                {value}
                              </Typography>
                            </Box>
                          </Grid>
                        );
                      })}
                  </CardSection>
                </Grid>
                <Grid item>
                  <CardSection
                    header={getString("ja", "profileDetail", "wish")}
                  >
                    {profile.wish !== undefined &&
                      profile.wish.map((value: any, index: number) => {
                        return (
                          <Grid key={`chip-wish-${index}`} item>
                            <Box pl={2} my="auto">
                              <Typography component="p" variant="body1">
                                {value}
                              </Typography>
                            </Box>
                          </Grid>
                        );
                      })}
                  </CardSection>
                </Grid>
                <Grid item>
                  <div css={sectionHeaderStyle}>
                    {getString("ja", "profile", "intro")}
                  </div>
                  <Card variant="outlined">
                    <Box m={2}>
                      <Typography variant="body1" component="p">
                        {profile.intro}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
                {!isStringNullOrEmpty(profile.statusDetail) && (
                  <Grid item>
                    <div css={sectionHeaderStyle}>
                      {getString("ja", "profileDetail", "statusDetail")}
                    </div>
                    <Card variant="outlined">
                      <CardContent>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: profile.statusDetail,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                {!isStringNullOrEmpty(profile.precaution) && (
                  <Grid item>
                    <div css={sectionHeaderStyle}>
                      {getString("ja", "profileDetail", "precaution")}
                    </div>
                    <Card variant="outlined">
                      <CardContent>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: profile.precaution,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                {!isStringNullOrEmpty(profile.feeDetail) && (
                  <Grid item>
                    <div css={sectionHeaderStyle}>
                      {getString("ja", "profileDetail", "feeDetail")}
                    </div>
                    <Card variant="outlined">
                      <CardContent>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: profile.feeDetail,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                {!isStringNullOrEmpty(profile.equip) && (
                  <Grid item>
                    <div css={sectionHeaderStyle}>
                      {getString("ja", "profileDetail", "equip")}
                    </div>
                    <Card variant="outlined">
                      <CardContent>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: profile.equip,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                {!isStringNullOrEmpty(profile.otherDetail) && (
                  <Grid item>
                    <div css={sectionHeaderStyle}>
                      {getString("ja", "profileDetail", "otherDetail")}
                    </div>
                    <Card variant="outlined">
                      <CardContent>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: profile.otherDetail,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                {!isStringNullOrEmpty(profile.experiences) && (
                  <Grid item>
                    <div css={sectionHeaderStyle}>経験</div>
                    <Card variant="outlined">
                      <CardContent>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: profile.experiences,
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
              <Grid item md={4} container direction="column" spacing={2}>
                <Grid item>
                  <div css={sectionHeaderStyle}>ボイスサンプル</div>
                  <Card variant="outlined">
                    {profile.samples.length > 0 ? (
                      <List>
                        {profile.samples.map((sample: any) => (
                          <ListItem
                            key={`li-item-${sample.sid}`}
                            button
                            onClick={
                              (event) => {
                                this.props.setAudio({
                                  sid: sample.sid,
                                  title: sample.type,
                                  source: sample.link,
                                  actor: "",
                                });
                              }
                              // this.handleSampleClick(audioPlayer.ref, sample, {
                              //   uid: profile.uid,
                              //   name: profile.name,
                              // })
                            }
                          >
                            <ListItemIcon>
                              <GraphicEq />
                            </ListItemIcon>
                            <ListItemText primary={sample.type} />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <MessageBlock
                        icon={<GraphicEq fontSize="small" color="disabled" />}
                        message="No any sample"
                      />
                    )}

                    {/* <div className={classes.details}>
                    <Grid
                      item
                      container
                      direction="column"
                      justify="space-between"
                      spacing={1}
                      className={classes.innerGrid}
                    ></Grid>
                  </div> */}
                  </Card>
                </Grid>
                <Grid item>
                  <DLsiteIframe uid={profile.uid} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    profile: state.data.seiyuData.current,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators(
    { fetchSeiyuProfileAsync, clearAlertSync, setAudio },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SeiyuProfilePage);
