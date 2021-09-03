import {
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Apps } from "@material-ui/icons";
import React, { Fragment } from "react";
import { withRouter } from "react-router";
import {
  navDrawerListStyle,
  navDrawerStyle,
  sectionActionStyle,
} from "../../../assets/styles/core";
import { getString } from "../../../utils/localization";
import RouterLink from "../common/RouterLink";
import NavButton from "./NavButton";

const useStyles = makeStyles({
  root: {
    display: "none",
    minHeight: "inherit",
    "@media (max-width: 960px)": {
      display: "block",
    },
  },
  drawer: {
    width: 250,
  },
  drawerPaper: navDrawerStyle.paper,
  drawerHeader: {
    height: "120px",
    padding: "12px 16px",
  },
  listItemRoot: navDrawerListStyle.root,
  listItemButton: navDrawerListStyle.button,
});

function PortableMenu(props: any) {
  const classes = useStyles();
  const { isAuthenticated } = props;
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    setState({ ...state, [anchor]: open });
  };

  return (
    <div className={classes.root}>
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
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <div className={classes.drawer}>
            <div className={classes.drawerHeader}>
              <DrawerHeader
                isAuth={isAuthenticated}
                history={props.history}
                onClose={toggleDrawer("right", false)}
              />
            </div>
            <Divider variant="middle" />
            <List>
              <ListItem
                classes={{
                  root: classes.listItemRoot,
                  button: classes.listItemButton,
                }}
                button
                component={RouterLink("/")}
                onClick={toggleDrawer("right", false)}
              >
                <ListItemText primary={getString("ja", "link", "home")} />
              </ListItem>
              <ListItem
                classes={{
                  root: classes.listItemRoot,
                  button: classes.listItemButton,
                }}
                button
                component={RouterLink("events")}
                onClick={toggleDrawer("right", false)}
              >
                <ListItemText primary={getString("ja", "link", "event")} />
              </ListItem>
              <ListItem
                classes={{
                  root: classes.listItemRoot,
                  button: classes.listItemButton,
                }}
                button
                component={RouterLink("/seiyu")}
                onClick={toggleDrawer("right", false)}
              >
                <ListItemText primary={getString("ja", "link", "seiyu")} />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </Fragment>
    </div>
  );
}

function DrawerHeader(props: { isAuth: Boolean; history: any; onClose: any }) {
  const style = sectionActionStyle(true);
  const useStyle = makeStyles((theme) => ({
    root: style.root,
    details: style.details,
  }));
  const classes = useStyle();

  if (props.isAuth) {
    return (
      <Grid container className={classes.root}>
        {/* <Grid item md={12} className={classes.details}></Grid> */}
        <Grid
          item
          md={12}
          className={classes.details}
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
      <Grid container className={classes.root}>
        <Grid item md={12} className={classes.details}>
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
          className={classes.details}
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
