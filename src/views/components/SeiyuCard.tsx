import {
  withStyles,
  Button,
  CardActions,
  makeStyles,
  Box,
  Card,
  Chip,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import { palette } from "../../assets/styles/palette";
import { didContainString, isStringNullOrEmpty } from "../../utils/commonTools";
import { getString } from "../../utils/localization";
import CardSection from "./CardSection";

const useStyles = makeStyles({
  innerGrid: {
    margin: "8px",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 480px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
  restrictedLabel: {
    paddingTop: "4px",
    paddingBottom: "4px",
    marginTop: "4px",
    marginBottom: "4px",
    background: "#fbeeca",
    color: "#c56601",
    textAlign: "center",
    fontWeight: "bold",
  },
  playButton: {
    height: "100%",
    paddingLeft: "24px",
    paddingRight: "24px",
    background: palette.primary,
    borderRadius: 0,
    "&:hover": {
      background: palette.primary,
    },
  },
  playIcon: {
    height: 22,
    width: 22,
    color: palette.white,
  },
});

const DetailButton = withStyles({
  label: {
    padding: "0px",
    writingMode: "vertical-rl",
    textOrientation: "upright",
    "@media (max-width: 480px)": {
      writingMode: "horizontal-tb",
      padding: "16px",
    },
  },
})(Button);

const SampleDetailActions = withStyles({
  root: {
    background: palette.primary,
    color: palette.white,
    padding: "12px 24px",
    fontSize: "16px",
  },
})(CardActions);

const SampleTitleActions = withStyles({
  root: {
    background: palette.accent,
    color: palette.primary,
    padding: "12px 24px",
    fontWeight: "bold",
    fontSize: "16px",
  },
})(CardActions);

export default function SeiyuCard(props: any) {
  const classes = useStyles();
  const { seiyu, sampleFilter } = props;
  let sample = seiyu.samples.find((sample: any) => {
    return didContainString(sample.type, sampleFilter);
  });
  return (
    <Card variant="outlined">
      <div className={classes.details}>
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
                    <div className={classes.restrictedLabel}>
                      {Object.keys(seiyu.able).map(
                        (range) =>
                          seiyu.able[range] && (
                            <span className="text-clip-margin">{range}</span>
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
                justify="space-between"
                spacing={2}
                className={classes.innerGrid}
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
                        <Grid item>
                          <Box px={2} py={1} my="auto">
                            <Typography
                              component="h3"
                              variant="subtitle1"
                            >
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
              <SampleTitleActions>
                {getString("ja", "profileDetail", "samples")}
              </SampleTitleActions>
            </Grid>
            <Grid item md sm xs>
              <SampleDetailActions>
                {sample !== undefined
                  ? sample.type
                  : getString("ja", "message", "noSampleMatched")}
              </SampleDetailActions>
            </Grid>
            {sample !== undefined && (
              <Grid item>
                <IconButton
                  className={classes.playButton}
                  aria-label="play/pause"
                  onClick={(event) => {
                    //   handleSampleClick(props.player, sample, {
                    //     uid: seiyu.uid,
                    //     name: seiyu.name,
                    //   });
                  }}
                >
                  <PlayArrow className={classes.playIcon} />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Grid>
        <DetailButton
          variant="outlined"
          color="primary"
          onClick={() => {

          }}
        >
          {getString("ja", "link", "profile")}へ
        </DetailButton>
      </div>
    </Card>
  );
}
