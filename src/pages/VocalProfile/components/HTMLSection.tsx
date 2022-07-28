import { Typography } from "@mui/material";
import InfoSection from "./InfoSection";

type IProps = {
  dangerouslyHTML: string;
};

function HTMLSection({dangerouslyHTML}:IProps) {
    if (dangerouslyHTML.length === 0) {
      return (
        <Typography component="p" variant="body1">
          ---
        </Typography>
      );
    }
    return <div
    style={{
      overflowWrap: "anywhere"
    }}
    dangerouslySetInnerHTML={{
      __html: dangerouslyHTML,
    }}
  />
}

export default HTMLSection