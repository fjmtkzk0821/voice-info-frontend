import { PlayArrow } from "@mui/icons-material";
import { palette } from "../../assets/styles/palette";
import { didContainString, isStringNullOrEmpty } from "../../utils/commonTools";
import { getString } from "../../utils/localization";
import CardSection from "./CardSection";
import { setAudio } from "../../redux/slices/audioPlayerSlice";
import { useAppDispatch } from "../../redux/hooks";
import { makeStyles, withStyles, Button, CardActions, Card, Grid, Box, Typography, Chip, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import { css } from "@emotion/react";

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

// const useStyles = makeStyles({
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
// });

// const DetailButton = withStyles({
//   label: {
//     padding: "0px",
//     writingMode: "vertical-rl",
//     textOrientation: "upright",
//     "@media (max-width: 480px)": {
//       writingMode: "horizontal-tb",
//       padding: "17px",
//     },
//   },
// })(Button);

// const SampleDetailActions = withStyles({
//   root: {
//     background: palette.primary,
//     color: palette.white,
//     padding: "13px 24px",
//     fontSize: "17px",
//   },
// })(CardActions);

// const SampleTitleActions = withStyles({
//   root: {
//     background: palette.accent,
//     color: palette.primary,
//     padding: "12px 24px",
//     fontWeight: "bold",
//     fontSize: "16px",
//   },
// })(CardActions);

export default function SeiyuCard(props: any) {
  const dispatch = useAppDispatch();
  //const classes = useStyles();
  const { seiyu, sampleFilter } = props;
  let sample = seiyu.samples.find((sample: any) => {
    return didContainString(sample.type, sampleFilter);
  });

  function handleSamplePlay() {
    dispatch(
      setAudio({
        sid: sample.sid,
        title: sample.type,
        source: sample.link,
        actor: seiyu.name,
      })
    );
  }

  return (
    <Card variant="outlined">
      <div css={detailStyle}>
        <Grid container spacing={0} direction="column">
          <Grid item container spacing={0}>
            <Grid item xs="auto">
              <Box m={1}>
                <Grid container direction="column">
                  <Grid item md={12} sm={12}>
                    <Box className="img-avatar">
                      <img
                        src={seiyu.avatar.link}
                        className="img-avatar"
                        alt=""
                      />
                    </Box>
                  </Grid>
                  <Grid item md={12} sm={12}>
                    <div css={restrictedLabelStyle}>
                      {Object.keys(seiyu.able).map(
                        (range) =>
                          seiyu.able[range] && (
                            <span key={`span-able-${range}`} className="text-clip-margin">{range}</span>
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
                      {seiyu.name}
                    </Typography>
                  </Grid>
                  {!isStringNullOrEmpty(seiyu.gender) && (
                    <Grid item>
                      <Chip label={seiyu.gender} />
                    </Grid>
                  )}
                  {seiyu.hires && (
                    <Grid item>
                      <Chip
                        label={
                          seiyu.hires &&
                          getString("ja", "profileDetail", "hires")
                        }
                      />
                    </Grid>
                  )}
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {seiyu.intro}
                  </Typography>
                </Grid>
                <Grid item>
                  <CardSection
                    header={getString("ja", "profileDetail", "jozu")}
                  >
                    {(seiyu.jozu as Array<any>).map((value, index) => {
                      return (
                        <Grid key={`grid-item-jozu-${value}`} item>
                          <Box px={2} py={1} my="auto">
                            <Typography component="h3" variant="subtitle1">
                              {value}
                            </Typography>
                          </Box>
                        </Grid>
                      );
                    })}
                  </CardSection>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container spacing={0}>
            <Grid item>
              <CardActions sx={{
                background: palette.accent,
                color: palette.primary,
                padding: "12px 24px",
                fontWeight: "bold",
                fontSize: "16px",
              }}>
                {getString("ja", "profileDetail", "samples")}
              </CardActions>
            </Grid>
            <Grid item md sm xs>
              <CardActions sx={{
                background: palette.primary,
                color: palette.white,
                padding: "13px 24px",
                fontSize: "17px",
              }}>
                {sample !== undefined
                  ? sample.type
                  : getString("ja", "message", "noSampleMatched")}
              </CardActions>
            </Grid>
            {sample !== undefined && (
              <Grid item>
                <IconButton
                  css={playButtonStyle}
                  aria-label="play/pause"
                  onClick={(event) => {
                    handleSamplePlay();
                  }}
                >
                  <PlayArrow css={playIconStyle} />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Button sx={{
          label: {
            padding: "0px",
            writingMode: "vertical-rl",
            textOrientation: "upright",
            "@media (max-width: 480px)": {
              writingMode: "horizontal-tb",
              padding: "17px",
            },
          }
        }} variant="outlined" color="primary" onClick={props.onDetail}>
          {getString("ja", "link", "profile")}へ
        </Button>
      </div>
    </Card>
  );
}
