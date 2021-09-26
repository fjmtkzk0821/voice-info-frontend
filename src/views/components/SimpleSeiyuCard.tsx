import {
  makeStyles,
  Card,
  CardActionArea,
  Grid,
  Avatar,
  CardContent,
  Typography,
} from "@mui/material";
import { palette } from "../../assets/styles/palette";
import { getString } from "../../utils/localization";

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     transition:
//       "background 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, " +
//       "color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//     boxShadow: "unset",
//     "&:hover": {
//       color: palette.white,
//       background: palette.primary,
//       // borderTop: "2px solid "+colorPalette.accent,
//       // borderBottom: "2px solid "+colorPalette.accent,
//       borderLeft: "5px solid " + palette.accent,
//     },
//   },
//   container: {
//     minHeight: "50px",
//   },
//   avatar: {
//     maxWidth: "100px",
//     height: "100%",
//     width: "100%",
//   },
//   labelChip: {
//     margin: "6px 6px 0 0",
//   },
// }));

export default function SimpleSeiyuCard(props: {
  avatar: string;
  name: string;
  desc: string;
  onClick: any;
}) {
  return (
    <Card
      sx={{
        transition:
          "background 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, " +
          "color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        boxShadow: "unset",
        "&:hover": {
          color: palette.white,
          background: palette.primary,
          // borderTop: "2px solid "+colorPalette.accent,
          // borderBottom: "2px solid "+colorPalette.accent,
          borderLeft: "5px solid " + palette.accent,
        },
      }}
    >
      <CardActionArea onClick={props.onClick}>
        <Grid
          container
          spacing={1}
          sx={{
            minHeight: "50px",
          }}
        >
          <Grid item>
            <Avatar
              variant="square"
              src={props.avatar}
              sx={{ maxWidth: "100px", height: "100%", width: "100%" }}
            />
          </Grid>
          <Grid item md={9} sm={9}>
            <CardContent>
              <Grid container>
                <Grid item md={12} sm={12} xs={12}>
                  <Typography component="h6" variant="h6">
                    {props.name}
                  </Typography>
                </Grid>
                <Grid item md sm xs>
                  <Typography variant="body2">{props.desc}</Typography>
                  {/* {Object.keys(props.able).map(
                    (range) =>
                      props.able[range] && (
                        <Chip
                          className={classes.labelChip}
                          variant="outlined"
                          label={getString("ja", "profileDetail", range)}
                          color="secondary"
                        />
                      )
                  )} */}
                </Grid>
                {/* <Grid item md sm xs>
                <Chip variant="outlined" label="R15" color="secondary"/>
              </Grid>
              <Grid item md sm xs>
                <Chip variant="outlined" label="R18" color="secondary"/>
              </Grid> */}
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
