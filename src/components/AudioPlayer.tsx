import { Card, CardHeader, IconButton, Theme, Typography } from "@mui/material"
import { Box } from "@mui/system"
import CloseIcon from '@mui/icons-material/Close'
import { createRef, useEffect, useState } from "react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { closePlayer, currentAudio, playerState } from "../features/audioPlayerSlice";
import { getString } from "../utils/localization";

function AudioPlayer() {
    const dispatch = useAppDispatch();
    const [playerRef] = useState(React.createRef<HTMLAudioElement>());
    const audioObj = useAppSelector(currentAudio);
    const displayState = useAppSelector(playerState);

    useEffect(() => {
      if(playerRef.current) {
        playerRef.current.pause();
        playerRef.current.load();
        playerRef.current.play();
      }
    }, [playerRef,audioObj]);

    return (
      <Card
        sx={{
          minWidth: 180,
          position: "fixed",
          display: displayState ? "flex" : "none",
          zIndex: (theme: Theme) => theme.zIndex.drawer - 1,
          bottom: "15px",
          right: "15px",
          //   borderRadius: "24px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            action={
              <IconButton onClick={() => dispatch(closePlayer())}>
                <CloseIcon fontSize="small" />
              </IconButton>
            }
            title={audioObj ? audioObj.category : "undefined"}
            titleTypographyProps={{
              variant: "subtitle1",
            }}
            subheader={
              audioObj
                ? getString("profile", audioObj.restriction.toUpperCase())
                : "undefined"
            }
            subheaderTypographyProps={{
              variant: "caption",
            }}
            sx={{
              py: 1,
              px: 1.5,
            }}
          />
          <Box
            sx={{
              p: 1,
            }}
          >
            {audioObj === undefined ? (
              <Typography component="span">no source is select</Typography>
            ) : (
              <audio controls controlsList="nodownload" ref={playerRef}>
                <source src={audioObj?.src} />
                Your browser does not support the audio element.
              </audio>
            )}
          </Box>
        </Box>
      </Card>
    );
}

export default AudioPlayer