import { css } from "@emotion/react";
import { styled } from "@mui/material";
import { getString } from "../../../utils/localization";
import NavButton from "./NavButton";

// const useStyles = makeStyles({
//   root: {
//     display: "block",
//     minHeight: "inherit",
//     "@media (max-width: 960px)": {
//       display: "none",
//     },
//   },
// });

const StyledContainer = styled("div")(({ theme }) => ({
  display: "block",
  minHeight: "inherit",
  "@media (max-width: 960px)": {
    display: "none",
  },
}));

export default function PCMenu(props: any) {
  //const classes = useStyles();
  const { isAuthenticated } = props;
  return (
    <StyledContainer>
      <NavButton to="/" isLink>
        {getString("ja", "link", "home")}
      </NavButton>
      <NavButton to="/events" isLink>
        {getString("ja", "link", "event")}
      </NavButton>
      <NavButton to="/seiyu" isLink>
        {getString("ja", "link", "seiyu")}
      </NavButton>

      {!isAuthenticated && (
        <NavButton to="/login" isLink>
          {getString("ja", "link", "login")}
        </NavButton>
      )}
      {!isAuthenticated && (
        <NavButton to="/register" isLink>
          {getString("ja", "link", "register")}
        </NavButton>
      )}
      {isAuthenticated && (
        <NavButton to="/setting" isLink>
          {getString("ja", "link", "setting")}
        </NavButton>
      )}
    </StyledContainer>
  );
}
