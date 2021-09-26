import React, { Component } from "react";

import { Close } from "@mui/icons-material";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { disposeAudio } from "../../../redux/slices/audioPlayerSlice";
import { bindActionCreators } from "redux";
import { createStyles, Card, CardHeader, Box, IconButton, withStyles,Theme } from "@mui/material";
import { css, withTheme } from "@emotion/react";

// const styles = (theme: Theme) => createStyles({
//     root: {
//       maxWidth: 345,
//       position: "fixed",
//       display: "flex",
//       zIndex: 5,
//       bottom: "15px",
//       right: "15px",
//       borderRadius: "24px"
//     },
//     details: {
//       display: "flex",
//       flexDirection: "column",
//     },
//     content: {
//       flex: "1 0 auto",
//     },
//     controls: {
//       display: "flex",
//       alignItems: "center",
//       paddingLeft: theme.spacing(1),
//       paddingBottom: theme.spacing(1),
//     },
//   });

class AudioPlayer extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      sid: null,
      audioRef: React.createRef(),
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.audioPlayer.current == null) {
      return null;
    }
    if (nextProps.audioPlayer.current.sid !== prevState.sid) {
      return {
        sid: nextProps.audioPlayer.current.sid,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: any) {
    if (
      this.props.audioPlayer.current != null &&
      prevProps.audioPlayer.current == null
    ) {
      this.state.audioRef.current.pause();
      this.state.audioRef.current.load();
      this.state.audioRef.current.play();
    }
    if (
      this.props.audioPlayer.current != null &&
      prevProps.audioPlayer.current != null
    ) {
      if (
        prevProps.audioPlayer.current.sid !==
        this.props.audioPlayer.current.sid
      ) {
        this.state.audioRef.current.pause();
        this.state.audioRef.current.load();
        this.state.audioRef.current.play();
      }
    }
  }

  render() {
    const { theme, audioPlayer } = this.props;
    if (audioPlayer.enable) {
      return (
        <Card sx={{
          maxWidth: 345,
          position: "fixed",
          display: "flex",
          zIndex: 5,
          bottom: "15px",
          right: "15px",
          borderRadius: "24px"
        }}>
          <div css={css`
            display: flex;
            flex-direction: column;
          `}>
            <CardHeader
              avatar={<Box></Box>}
              action={
                <IconButton
                  onClick={() => {
                    this.state.audioRef.current.pause();
                    this.props.disposeAudio();
                  }}
                >
                  <Close />
                </IconButton>
              }
              title={audioPlayer.current.title}
              subheader={audioPlayer.current.actor}
            />
            <Box p={1}>
              <audio controls controlsList="nodownload" ref={this.state.audioRef}>
                <source src={audioPlayer.current.source} />
                Your browser does not support the audio element.
              </audio>
            </Box>
          </div>
        </Card>
      );
    }
    return <div></div>;
  }
}

function mapStateToProps(state: RootState) {
  return {
      audioPlayer: state.audioPlayer
  }
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return bindActionCreators({disposeAudio}, dispatch);
}

export default withTheme(connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioPlayer));
