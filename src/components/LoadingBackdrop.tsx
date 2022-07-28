import { Backdrop, CircularProgress, Theme } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { loadingState } from "../features/loadingBackdropSlice";

export default function LoadingBackdrop() {
    const state = useAppSelector(loadingState);
    return (
      <Backdrop
        sx={{
          color: "white.main",
          zIndex: (theme: Theme) => theme.zIndex.drawer + 2,
        }}
        open={state}
      >
          <CircularProgress color="inherit"/>
      </Backdrop>
    );
}