import { palette } from "../../../assets/styles/palette";
import { getString } from "../../../utils/localization";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Theme } from "@emotion/react";
import {
  makeStyles,
  Card,
  Grid,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Chip,
  ListItemText,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// const useStyle = makeStyles((theme: Theme) => ({
//   root: {
//     backgroundColor: palette.white,
//     display: "flex",
//     height: "180px",
//     "@media (max-width: 768px)": {
//       // flexDirection: "column",
//       // height: "240px",
//     },
//   },
//   details: {
//     display: "flex",
//     flexDirection: "column",
//     flex: "0 0 15%",
//     margin: "auto",
//     alignItems: "center",
//   },
//   header: {
//     textAlign: "center",
//     color: palette.primary,
//   },
//   overflowAuto: {
//     maxHeight: "164px",
//     overflow: "auto",
//   },
// }));

function SectionNotices() {
  const notices = useAppSelector((state: RootState) => state.homePage.notices);

  return (
    <Card
      sx={{
        backgroundColor: palette.white,
        display: "flex",
        height: "180px",
        "@media (max-width: 768px)": {
          // flexDirection: "column",
          // height: "240px",
        },
      }}
      variant="outlined"
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <CardContent sx={{
            display: "flex",
            flexDirection: "column",
            flex: "0 0 15%",
            margin: "auto",
            alignItems: "center",
          }}>
            <InfoOutlinedIcon
              fontSize="large"
              style={{ color: palette.accent }}
            />
            <Typography component="h5" variant="h5" sx={{
              textAlign: "center",
              color: palette.primary,
            }}>
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
              <List sx={{
                maxHeight: "164px",
                overflow: "auto",
              }}>
                {notices &&
                  notices.map((notice: any, index: Number) => {
                    return (
                      <ListItem
                        key={`li-ann-${index}`}
                        button
                        onClick={() => {
                          // props.onClick(element);
                        }}
                      >
                        <ListItemIcon>
                          <Chip label={notice.type} />
                        </ListItemIcon>
                        <ListItemText
                          className="text-accent"
                          primary={notice.title}
                        />
                        <ListItemText
                          className="text-accent"
                          primary={notice.date}
                        />
                      </ListItem>
                    );
                  })}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default SectionNotices;
