import { AppBar, Avatar, Box, Button, Card, CardActionArea, IconButton, Toolbar, Typography, Drawer, CardContent, Divider, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"

import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import SeiyuIcon from '@mui/icons-material/RecordVoiceOver';
import ApartmentIcon from '@mui/icons-material/Apartment';

import logo from "../../assets/img/onsei_logo_text.png";
import React, { useEffect } from "react";
import LoginRegisterButton from "./components/LoginRegisterButton";
import UserMenuButton from "./components/UserMenuButton";
import { useAppSelector } from "../../app/hooks";
import { isAuthenticated } from "../../features/user/authSlice";
import StylelessRouteLink from "../StylelessRouteLink";
import { getString } from "../../utils/localization";

class NaviDestination {
  display: string;
  route: string;
  icon: React.ReactNode;

  constructor(display: string, route: string, icon: React.ReactNode) {
    this.display = display;
    this.route = route;
    this.icon = icon;
  }
}

function PrimaryAppBar() {
  const isAuth = useAppSelector(isAuthenticated);
  const navigate = useNavigate();
    const [dState, setDState] = React.useState(false);
    const dests = [
      new NaviDestination(getString("link", "home"), "/", <HomeIcon />),
      new NaviDestination(getString("link", "seiyu"), "/seiyu", <SeiyuIcon />),
      // new NaviDestination("Studio", "/", <ApartmentIcon />),
      // new NaviDestination("Events", "/", <EventIcon />)
    ]

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if(event.type === "keydown" || ["Tab", "Shift"].includes((event as React.KeyboardEvent).key)) {
            return;
        }
        setDState(open);
    }

    return (
      <React.Fragment>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Link to="/">
              <img src={logo} alt="voice-info" height={48} />
            </Link>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                paddingX: 2,
              }}
            >
              {dests.map((dest, index) => (
                <Link
                  key={`pc-nav-${index}`}
                  to={dest.route}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button key={`navi-pc-${dest.display}`} color="secondary">
                    {dest.display}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            ></Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {isAuth ? <UserMenuButton /> : <LoginRegisterButton />}
            </Box>
            <Button
              color="secondary"
              variant="outlined"
              sx={{
                display: { xs: "flex", md: "none" },
              }}
              onClick={() => setDState(true)}
            >
              <MenuIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <React.Fragment key="right">
          <Drawer anchor="right" open={dState} onClose={() => setDState(false)}>
            <Box sx={{ width: 250 }}>
              <CardContent>
                {isAuth ? (
                  <UserMenuButton onClick={() => setDState(false)} />
                ) : (
                  <LoginRegisterButton onClick={() => setDState(false)} />
                )}
              </CardContent>
              <Divider variant="middle" />
              <List>
                {dests.map((dest, index) => (
                  <ListItem key={`navi-pt-${dest.display}`} button onClick={() => {
                    navigate(dest.route);
                    setDState(false);
                  }}>
                    <ListItemIcon>{dest.icon}</ListItemIcon>
                    <ListItemText primary={dest.display} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </React.Fragment>
      </React.Fragment>
    );
}

export default PrimaryAppBar