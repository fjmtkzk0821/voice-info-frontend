import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { palette } from "../../../assets/styles/palette";
import { useAppSelector } from "../../../redux/hooks";
import PCMenu from "./PCMenu";
import PortableMenu from "./PortableMenu";

const useStyle = makeStyles({
  appbarDeco: {
    borderBottom: "5px solid " + palette.accent,
  },
  minHeight: {
    minHeight: "64px",
  },
});

function NavigationBar(props: any) {
  const classes = useStyle();
  const isAuthenticated = useAppSelector((state) => state.user.authenticated);

  return (
    <AppBar className={classes.appbarDeco} position="fixed" elevation={0}>
      <Toolbar className={classes.minHeight}>
        <div className="nav-logo">
          <Link to="/">
            <img src="/images/onsei_logo_text.png" height={48} alt="logo" />
          </Link>
        </div>
        <PCMenu isAuthenticated={isAuthenticated} />
        <PortableMenu isAuthenticated={isAuthenticated} />
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
