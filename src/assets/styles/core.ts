import { palette } from "./palette";

const navButtonStyle = {
  root: {
    minWidth: "80px",
    minHeight: "inherit",
    borderRadius: "0",
    paddingLeft: "16px",
    paddingRight: "16px",
    "&:hover": {
      backgroundColor: "#ff9a00",
      "& $label": {
        color: "#333",
      },
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
  },
  label: {
    color: "#fff",
  },
};

const navDrawerStyle = {
  paper: {
    background: palette.primary,
  },
};

const navDrawerListStyle = {
  root: {
    color: palette.white,
    "&:hover": {
      //borderLeft: "5px solid "+palette.accent
      background: palette.accent,
      color: palette.primary,
    },
  },
  button: {
    color: palette.white,
    "&:hover": {
      //borderLeft: "5px solid "+palette.accent
      background: palette.accent,
      color: palette.primary,
    },
  },
};

const sectionActionStyle = (forDrawer = false) => {
  return {
    root: {
      minHeight: "120px",
      height: "100%",
    },
    details: {
      width: "100%",
      "& .MuiButton-root": {
        //flex: "1",
        height: "100%",
        width: "100%",
      },
      "& .MuiButton-contained": {
        backgroundColor: forDrawer ? palette.accent : palette.primary,
        color: palette.white,
        "&:hover": {
          backgroundColor: palette.accent,
          color: palette.primary,
        },
      },
      "& .MuiButton-outlined": {
        border: `1px solid ${palette.primary}`,
        color: forDrawer ? palette.accent : palette.primary,
        "&:hover": {
          border: "1px solid " + palette.accent,
          color: palette.accent,
        },
      },
    },
  };
};

const formTextFieldStyle = {
  root: {
    "& label.Mui-focused": {
      color: palette.accent,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: palette.primary,
      },
      "&:hover fieldset": {
        borderColor: palette.accent,
      },
      "&.Mui-focused fieldset": {
        borderColor: palette.accent,
      },
    },
  },
};

const formSelectFieldStyle = {
  root: {
    width: "100%",
    "& label.Mui-focused": {
      color: palette.accent,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: palette.primary,
      },
      "&:hover fieldset": {
        borderColor: palette.accent,
      },
      "&.Mui-focused fieldset": {
        borderColor: palette.accent,
      },
    },
  },
};

export {
  navButtonStyle,
  navDrawerStyle,
  navDrawerListStyle,
  sectionActionStyle,
  formTextFieldStyle,
  formSelectFieldStyle,
};
