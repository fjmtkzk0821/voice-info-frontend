import { makeStyles, Button } from "@mui/material";
import { navButtonStyle } from "../../../assets/styles/core";
import RouterLink from "../common/RouterLink";
import { styled } from "@mui/material/styles";
import { css } from "@emotion/react";
//const useStyles = makeStyles(navButtonStyle);

const NavButtonStyle = {
  minWidth: "80px",
  minHeight: "inherit",
  borderRadius: "0",
  paddingLeft: "16px",
  paddingRight: "16px",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#ff9a00",
    color: "#333",
    "&:after": {
      content: '""',
      bottom: "16px",
      borderBottom: "3px solid #333",
      width: "16px",
      position: "absolute",
    },
  },
  "&:after": {
    content: '""',
    bottom: "16px",
    borderBottom: "3px solid #fff",
    width: "10px",
    position: "absolute",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms ease-out 0ms",
  },
};

export default function NavButton(props: any) {
  //const classes = useStyles();
  const { isLink, children } = props;
  if (isLink) {
    return (
      <Button
        sx={NavButtonStyle}
        color="inherit"
        component={RouterLink(props.to)}
      >
        {children}
      </Button>
    );
  } else {
    return (
      <Button sx={NavButtonStyle} color="inherit" onClick={props.onClick}>
        {children}
      </Button>
    );
  }
}
