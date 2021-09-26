import React, { Component } from "react";

export default function DLsiteIframe(props: {uid: string}) {
  let url = `https://asia-northeast1-voice-info.cloudfunctions.net/api/dlsiteLink/${props.uid}`;
  //let url = `http://localhost:5001/voice-info/us-central1/api/dlsiteLink/${props.uid}`;
  return (
    <iframe
      title="dlsite"
      src={url}
      width="100%"
      height={570}
      frameBorder={0}
    ></iframe>
  );
}
