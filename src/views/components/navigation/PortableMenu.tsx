/** @jsxImportSource @emotion/react */
import { Apps } from "@mui/icons-material";
import {
  Drawer,
  Divider,
  ListItem,
  ListItemText,
  Grid,
  Button,
  List
} from "@mui/material";
import { styled } from "@mui/system";
import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { palette } from "../../../assets/styles/palette";
import { getString } from "../../../utils/localization";
import RouterLink from "../common/RouterLink";
import NavButton from "./NavButton";

// const useStyles = makeStyles({
//   root: {
//     display: "none",
//     minHeight: "inherit",
//     "@media (max-width: 960px)": {
//       display: "block",
//     },
//   },
//   drawer: {
//     width: 250,
//   },
//   drawerPaper: navDrawerStyle.paper,
//   drawerHeader: {
//     height: "120px",
//     padding: "12px 16px",
//   },
//   listItemRoot: navDrawerListStyle.root,
//   listItemButton: navDrawerListStyle.button,
// });

const StyledContainer = styled("div")(({ theme }) => ({
  display: "none",
  minHeight: "inherit",
  "@media (max-width: 960px)": {
    display: "block",
  },
}));

const DrawerContainer = styled("div")({
  width: "250px",
});

const DrawerHeaderContainer = styled("div")({
  height: "120px",
  padding: "12px 16px",
});

const ListItemStyle = {
  color: palette.white,
  "&:hover": {
    //borderLeft: "5px solid "+palette.accent
    background: palette.accent,
    color: palette.primary,
  },
  "& .MuiListItem-button": {
    color: palette.white,
    "&:hover": {
      //borderLeft: "5px solid "+palette.accent
      background: palette.accent,
      color: palette.primary,
    },
  },
};

function PortableMenu(props: any) {
  //const classes = useStyles();
  const { isAuthenticated } = props;
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    setState({ ...state, [anchor]: open });
  };

  return (
    <StyledContainer>
      <Fragment key="right">
        <NavButton to="/setting" onClick={toggleDrawer("right", true)}>
          <Apps />
        </NavButton>
        {/* <Button
          className={classes.navButton}
          color="inherit"
          onClick={toggleDrawer("right", true)}
        >
          <Apps />
        </Button> */}
        <Drawer
          sx={{
            "& .MuiDrawer-paper": {
              background: palette.primary,
            },
          }}
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <DrawerContainer>
            <DrawerHeaderContainer>
              <DrawerHeader
                isAuth={isAuthenticated}
                history={props.history}
                onClose={toggleDrawer("right", false)}
              />
            </DrawerHeaderContainer>
            <Divider variant="middle" />
            <List>
              <ListItem
                sx={ListItemStyle}
                button
                component={RouterLink("/")}
                onClick={toggleDrawer("right", false)}
              >
                <ListItemText primary={getString("ja", "link", "home")} />
              </ListItem>
              <ListItem
                sx={ListItemStyle}
                button
                component={RouterLink("events")}
                onClick={toggleDrawer("right", false)}
              >
                <ListItemText primary={getString("ja", "link", "event")} />
              </ListItem>
              <ListItem
                sx={ListItemStyle}
                button
                component={RouterLink("/seiyu")}
                onClick={toggleDrawer("right", false)}
              >
                <ListItemText primary={getString("ja", "link", "seiyu")} />
              </ListItem>
            </List>
          </DrawerContainer>
        </Drawer>
      </Fragment>
    </StyledContainer>
  );
}

function DrawerHeader(props: { isAuth: Boolean; history: any; onClose: any }) {
  const rootStyle = {
    minHeight: "120px",
    height: "100%",
  };
  const detailStyle = {
    width: "100%",
    "& .MuiButton-root": {
      //flex: "1",
      height: "100%",
      width: "100%",
    },
    "& .MuiButton-contained": {
      backgroundColor: palette.accent,
      color: palette.white,
      "&:hover": {
        backgroundColor: palette.accent,
        color: palette.primary,
      },
    },
    "& .MuiButton-outlined": {
      border: `1px solid ${palette.primary}`,
      color: palette.accent,
      "&:hover": {
        border: "1px solid " + palette.accent,
        color: palette.accent,
      },
    },
  };
  // const style = sectionActionStyle(true);
  // const useStyle = makeStyles((theme) => ({
  //   root: style.root,
  //   details: style.details,
  // }));
  // const classes = useStyle();

  if (props.isAuth) {
    return (
      <Grid container sx={rootStyle}>
        {/* <Grid item md={12} className={classes.details}></Grid> */}
        <Grid
          item
          md={12}
          sx={detailStyle}
          onClick={(e) => {
            props.onClose();
            props.history.push("/setting");
          }}
        >
          <Button variant="outlined" disableElevation>
            {getString("ja", "link", "setting")}
          </Button>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container sx={rootStyle}>
        <Grid item md={12} sx={detailStyle}>
          <Button
            variant="contained"
            disableElevation
            onClick={(e) => {
              props.onClose();
              props.history.push("/register");
            }}
          >
            {getString("ja", "link", "register")}
          </Button>
        </Grid>
        <Grid
          item
          md={12}
          sx={detailStyle}
          onClick={(e) => {
            props.onClose();
            props.history.push("/login");
          }}
        >
          <Button variant="outlined" disableElevation>
            {getString("ja", "link", "login")}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(PortableMenu);
