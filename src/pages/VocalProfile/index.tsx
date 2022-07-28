import { Box, Button, Card, CircularProgress, Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import core from "../../assets/jss/core";
import AlertMessage from "../../components/AlertMessage";
import { setLoading, dismissLoading } from "../../features/loadingBackdropSlice";
import { dismissMessage, setMessage } from "../../features/messageSlice";
import { getUrlFromStorageBucket, openInNewTab, scroll2Top } from "../../utils/common";
import BaseMessage, { BaseMessageType } from "../../utils/objects/BaseMessage";
import { SeiyuDocument, SeiyuDetailDocument, SeiyuSampleDocument } from "../../utils/objects/seiyu";
import pubService from "../../services/public";
import VocalBasicItem from "./components/VocalBasicItem";
import InfoSection from "./components/InfoSection";
import VoiceTypeSection from "./components/VoiceTypeSection";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { play } from "../../features/audioPlayerSlice";
import HTMLSection from "./components/HTMLSection";
import DLsiteEmbed from "../../components/DLsiteEmbed";
import TwitterTweetEmbed from "../../components/TwitterTweetEmbed";
import { cleanAuthHeader } from "../../services/api";
import { getString } from "../../utils/localization";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function VocalProfile() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [basic, setBasic] = useState<SeiyuDocument | undefined>(undefined);
    const [detail, setDetail] = useState<SeiyuDetailDocument | undefined>(undefined);
    const [samples, setSamples] = useState<SeiyuSampleDocument[] | undefined>(undefined);

    useEffect(() => {
      scroll2Top();
      dispatch(dismissMessage());
      onLoad();
    }, []);

    async function onLoad() {
      dispatch(setLoading());
      dispatch(dismissMessage());
      try {
          if(params.uid) {
            const { data } = await pubService.getSeiyuProfile(params.uid);
            // console.log(data);
            setBasic(SeiyuDocument.fromObject(data.profile.basic));
            setDetail(SeiyuDetailDocument.fromObject(data.profile.detail));
            setSamples(
              (data.profile.samples as any[]).map((s) =>
                SeiyuSampleDocument.fromObject(s)
              )
            );
          }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const { code, message } = err.response?.data;
          if(code === "auth/id-token-expired") {
            cleanAuthHeader();
          }
          dispatch(
            setMessage(
              new BaseMessage(code, message, BaseMessageType.ERROR).toObject()
            )
          );
        }
      }
      dispatch(dismissLoading());
    }

    if(!(basic || detail || samples)) {
        return <CircularProgress />;
    }
    return (
      <Container maxWidth="lg" sx={core.mainContainer}>
        <Grid container spacing={2} justifyContent="center" alignItems="start">
          <Grid item xs={12}>
            <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={() => {
              navigate(-1);
              scroll2Top();
            }} disableElevation>
              {getString("common", "back")}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <AlertMessage />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {basic && (
                <React.Fragment>
                  <VocalBasicItem doc={basic} />
                  <VoiceTypeSection able={basic.possible} wish={basic.wish} />
                </React.Fragment>
              )}
              {detail && (
                <React.Fragment>
                  <InfoSection
                    header={getString("profileDetail", "precaution")}
                  >
                    <HTMLSection dangerouslyHTML={detail.precaution} />
                  </InfoSection>
                  <InfoSection header={getString("profileDetail", "fee")}>
                    <HTMLSection dangerouslyHTML={detail.fee} />
                  </InfoSection>
                  <InfoSection header={getString("profileDetail", "equip")}>
                    <HTMLSection dangerouslyHTML={detail.equip} />
                  </InfoSection>
                  <InfoSection
                    header={getString("profileDetail", "other")}
                  >
                    <HTMLSection dangerouslyHTML={detail.other} />
                  </InfoSection>
                </React.Fragment>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            {basic && (
              <Stack spacing={2}>
                <InfoSection header={getString("profile", "link")}>
                  <Stack spacing={1}>
                    {basic.personal.length > 0 && (
                      <Button
                        variant="contained"
                        disableElevation
                        onClick={() => {
                          openInNewTab(basic.personal);
                        }}
                      >
                        {getString("profile", "page")}
                      </Button>
                    )}
                    {basic.twitter.length > 0 && (
                      <Button
                        variant="contained"
                        disableElevation
                        onClick={() => {
                          openInNewTab(basic.twitter);
                        }}
                        sx={{
                          background: "#1DA1F2",
                          "&:hover": {
                            backgroundColor: "#00B6F1",
                          },
                        }}
                      >
                        twitter
                      </Button>
                    )}
                  </Stack>
                </InfoSection>
                <InfoSection header={getString("profile", "samples")}>
                  <List dense disablePadding>
                    {samples ? (
                      samples.map((s, index) => (
                        <ListItemButton
                          key={`li-s-${index}`}
                          onClick={() => {
                            dispatch(
                              play({
                                category: s.cat,
                                restriction: s.restric,
                                src: getUrlFromStorageBucket(s.filename),
                              })
                            );
                          }}
                        >
                          <ListItemIcon>
                            <GraphicEqIcon />
                          </ListItemIcon>
                          <ListItemText>{s.cat}</ListItemText>
                        </ListItemButton>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemIcon>
                          <GraphicEqIcon />
                        </ListItemIcon>
                        <ListItemText>
                          {getString("message", "noSampleMatched")}
                        </ListItemText>
                      </ListItem>
                    )}
                  </List>
                </InfoSection>
                <InfoSection
                  header={getString("profileDetail", "receptionDetail")}
                >
                  {detail ? (
                    detail.reception.type === "txt" ? (
                      <HTMLSection dangerouslyHTML={detail.reception.content} />
                    ) : (
                      <TwitterTweetEmbed src={detail.reception.content ?? ""} />
                    )
                  ) : (
                    <div></div>
                  )}
                </InfoSection>

                {detail ? (
                  detail.exp.type === "txt" ? (
                    <InfoSection
                      header={getString("profileDetail", "exp")}
                    >
                      <HTMLSection dangerouslyHTML={detail.exp.content} />
                    </InfoSection>
                  ) : (
                    <DLsiteEmbed uid={params.uid ?? ""} />
                  )
                ) : (
                  <div></div>
                )}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>
    );
}

export default VocalProfile;