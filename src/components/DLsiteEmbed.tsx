import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

type IProps = {
  uid: string;
};

function DLsiteEmbed({ uid }: IProps) {
    // const [iframeHeight, setIframeHeight] = useState("0px");
    let url = `https://asia-northeast1-voice-info.cloudfunctions.net/api/public/seiyu/${uid}/dlsite`;
    // let url = `http://localhost:5001/voice-info/asia-northeast1/api/public/seiyu/${uid}/dlsite`;

    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          paddingTop: "100%",
          minHeight: "400px"
        }}
      >
        <iframe
          id="dlsite-embed"
          onLoad={() => {
            const obj = document.getElementById(
              "dlsite-embed"
            ) as HTMLIFrameElement;
            if (obj.contentDocument)
              obj.style.height = obj.contentDocument.body.scrollHeight + "px";
            // setIframeHeight(obj.contentDocument?.body.scrollHeight + "px");
          }}
          title="dlsite"
          src={url}
          frameBorder={0}
          // height="100%"
          // width="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </Box>
    );
}

export default DLsiteEmbed;
