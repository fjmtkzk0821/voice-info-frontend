import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  Theme,
} from "@material-ui/core";

import { palette } from "../../../assets/styles/palette";
import { getString } from "../../../utils/localization";

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: palette.white,
    display: "flex",
    height: "180px",
    "@media (max-width: 768px)": {
      // flexDirection: "column",
      // height: "240px",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 15%",
    margin: "auto",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    color: palette.primary,
  },
  overflowAuto: {
    maxHeight: "164px",
    overflow: "auto",
  },
}));

function SectionNotices() {
  const classes = useStyle();

  return (
    <Card className={classes.root} variant="outlined">
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={3}>
          <CardContent className={classes.details}>
            <InfoOutlinedIcon
              fontSize="large"
              style={{ color: palette.accent }}
            />
            <Typography component="h5" variant="h5" className={classes.header}>
                test
              {/* {getString(props.lang, "home", "info")} */}
            </Typography>
          </CardContent>
        </Grid>
        <Grid className="container background-default" item xs={9}>
          <Grid
            className="container"
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <List className={classes.overflowAuto}>
                {/* {props.list &&
                  props.list.map((element: any, index: Number) => {
                    return (
                      <ListItem
                        key={`ann-listitem-${index}`}
                        button
                        onClick={() => {
                          props.onClick(element);
                        }}
                      >
                        <ListItemText
                          className="text-accent"
                          primary={`[${element.date}] ${element.title}`}
                        />
                      </ListItem>
                    );
                  })} */}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default SectionNotices;