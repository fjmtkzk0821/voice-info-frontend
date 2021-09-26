import { css } from "@emotion/react";
import { makeStyles, CircularProgress } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

// const useStyles = makeStyles({
//   backdrop: {
//     color: "#fff",
//     opacity: 1,
//   },

//   backdropContainer: {
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     display: "flex",
//     zIndex: 999,
//     position: "fixed",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "rgba(0, 0, 0, 0.5)",
//     "-webkit-tap-highlight-color": "transparent",
//   },
//   hidden: {
//     display: "none",
//   },
// });

const Backdrop = styled(Box)({
  color: "#fff",
});

const BackdropContainer = styled("div")({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  zIndex: 999,
  position: "fixed",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0, 0, 0, 0.5)",
  "-webkit-tap-highlight-color": "transparent",
});

export default function LoadingBackdrop(props: any) {
  //const classes = useStyles();
  const status = useAppSelector((state: RootState) => state.backdrop.status);
  return (
    <Backdrop display={status ? "block" : "none"}>
      <BackdropContainer>
        <CircularProgress color="inherit" />
      </BackdropContainer>
    </Backdrop>
  );
}
