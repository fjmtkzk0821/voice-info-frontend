import { Button, makeStyles } from "@material-ui/core";
import { navButtonStyle } from "../../../assets/styles/core";
import RouterLink from "../common/RouterLink";

const useStyles = makeStyles(navButtonStyle);

export default function NavButton(props: any) {
  const classes = useStyles();
  const { isLink, children } = props;
  if (isLink) {
    return (
      <Button
      classes={{
        root: classes.root,
        label: classes.label,
      }}
        color="inherit"
        component={RouterLink(props.to)}
      >
        {children}
      </Button>
    );
  } else {
    return (
      <Button
        classes={{
          root: classes.root,
          label: classes.label,
        }}
        color="inherit"
        onClick={props.onClick}
      >
        {children}
      </Button>
    );
  }
}
