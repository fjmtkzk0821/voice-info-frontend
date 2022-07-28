import {
  Box,
  Card,
  Container,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import core from "../../assets/jss/core";
import PageHeader from "../../components/PageHeader";

import VocalItem from "./components/VocalItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import React, { useEffect, useState } from "react";
import {
  dismissLoading,
  setLoading,
} from "../../features/loadingBackdropSlice";
import { dismissMessage, setMessage } from "../../features/messageSlice";
import axios from "axios";
import BaseMessage, { BaseMessageType } from "../../utils/objects/BaseMessage";
import pubService from "../../services/public";
import { SeiyuDocument, SeiyuSearchCriteria } from "../../utils/objects/seiyu";
import { scroll2Top, shuffle } from "../../utils/common";
import CriteriaSidePanel from "./components/CriteriaSidePanel";
import { getCachedCriteria, getCachedSeiyuList, isInitialized, setCachedSeiyuList, setIndexData, setSearchCriteria } from "../../features/public/coreSlice";
import { getString } from "../../utils/localization";

function VocalSearch() {
  const dispatch = useAppDispatch();
  const isInitialised = useAppSelector(isInitialized);
  const seiyuList = useAppSelector(getCachedSeiyuList);
  const cachedCriteria = useAppSelector(getCachedCriteria);
  const [docs, setDocs] = useState<SeiyuDocument[]>([]);
  const [filtered, setFiltered] = useState<SeiyuDocument[]>([]);
  const [criteria, setCriteria] = useState<SeiyuSearchCriteria>(
    new SeiyuSearchCriteria()
  );
  const [currentIndex, setCurrentIndex] = useState(1);
  const PAGE_COUNT = 8;

  useEffect(() => {
    scroll2Top();
    dispatch(dismissMessage());
    onLoad();
  }, []);

  async function onLoad() {
    dispatch(setLoading());
    dispatch(dismissMessage());
    let c: SeiyuSearchCriteria| null = null;
    if(cachedCriteria) {
      c = SeiyuSearchCriteria.fromObject(cachedCriteria);
      setCriteria(c);
    }
    try {
      let tmp = [];
      if(!seiyuList || !isInitialised) {
        const { data } = await pubService.getIndexComponents();
        tmp = shuffle(data.seiyu as any[]);
        dispatch(
          setIndexData({
            news: data.news,
            promotion: data.promo,
            link: data.link,
            seiyu: tmp,
          })
        );
        tmp = tmp.map((doc) => SeiyuDocument.fromObject(doc));
      } else {
        tmp = seiyuList.map((doc) => SeiyuDocument.fromObject(doc));
      }
      setDocs(tmp);
      setFiltered(c?tmp.filter((doc) => c?.isMatch(doc)):tmp);
      // setFiltered(shuffle(c?tmp:tmp.filter((doc) => criteria.isMatch(doc))));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { code, message } = err.response?.data;
        dispatch(
          setMessage(
            new BaseMessage(code, message, BaseMessageType.ERROR).toObject()
          )
        );
      }
    }
    dispatch(dismissLoading());
  }

  function handleIndexChange(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentIndex(value);
    scroll2Top();
  }

  return (
    <Container maxWidth="lg" sx={core.mainContainer}>
      <PageHeader label={getString("link", "seiyu")} />
      <Grid container spacing={2} justifyContent="center" alignItems="start">
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <CriteriaSidePanel cachedCriteria={cachedCriteria} onApply={(criteria: SeiyuSearchCriteria) => {
            setCriteria(criteria);
            dispatch(setSearchCriteria(criteria.toObject()));
            // setFiltered(shuffle<SeiyuDocument>(docs.filter((doc) => criteria.isMatch(doc))));
            setFiltered(docs.filter((doc) => criteria.isMatch(doc)));
          }}/>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={9}
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          {filtered.length > 0 ? (
            filtered
              .slice(
                (currentIndex - 1) * PAGE_COUNT,
                currentIndex * PAGE_COUNT - 1
              )
              .map((doc, index) => (
                <Grid key={`sb-li-${doc.uid}`} item xs={12}>
                  <VocalItem doc={doc} sampleCat={criteria.sampleCat}/>
                </Grid>
              ))
          ) : (
            <Grid item xs={12}>
              <Card>
                <Box
                  sx={{
                    textAlign: "center",
                    py: 3,
                  }}
                >
                  <Typography
                    component="p"
                    variant="caption"
                    sx={{
                      fontSize: "1rem",
                      color: "gray",
                    }}
                  >
                    {getString("message", "noSeiyuFiltered")}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          )}
          <Grid item>
            <Paper>
              <Pagination
                page={currentIndex}
                count={Math.ceil(filtered.length / PAGE_COUNT)}
                variant="outlined"
                shape="rounded"
                sx={{
                  padding: 1,
                }}
                onChange={handleIndexChange}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default VocalSearch;
