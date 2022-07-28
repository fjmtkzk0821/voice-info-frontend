import { Card, CardContent, CardHeader, Chip, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import core from "../assets/jss/core";
import AlertMessage from "../components/AlertMessage";
import { setLoading, dismissLoading } from "../features/loadingBackdropSlice";
import { dismissMessage, setMessage } from "../features/messageSlice";
import { getNews, setIndexData } from "../features/public/coreSlice";
import { isAuthenticated } from "../features/user/authSlice";
import { scroll2Top } from "../utils/common";
import BaseMessage, { BaseMessageType } from "../utils/objects/BaseMessage";
import InformationSection from "./Home/sections/InformationSection";
import MenuSection from "./Home/sections/MenuSection";
import RelatedLinkSection from "./Home/sections/RelatedLinkSection";
import TwitterSection from "./Home/sections/TwitterSection";
import pubService from "../services/public";
import { useParams } from "react-router-dom";
import { News } from "../utils/objects/news";

function InformationNews() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const news = useAppSelector(getNews);
  const isAuth = useAppSelector(isAuthenticated);

  useEffect(() => {
    scroll2Top();
    dispatch(dismissMessage());
    onLoad();
  }, []);

  async function onLoad() {
    dispatch(setLoading());
    dispatch(dismissMessage());
    try {
      if(!(news)) {
        const { data } = await pubService.getIndexComponents();
        dispatch(
          setIndexData({
            news: data.news,
            promotion: data.promo,
            link: data.link,
            seiyu: data.seiyu,
          })
        );
        // console.log(data);
      }
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

  function findNews(): News| undefined {
    if(params.uid && news) {
        return news?.map((n) => News.fromObject(n)).find((n) => n.uid === params.uid);
    }
    return undefined;
  }

  const currentNews = findNews();
//   console.log(currentNews);

    return (
      <Container maxWidth="md" sx={core.mainContainer}>
        <Grid
          container
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="start"
        >
          <Grid item xs={12}>
            <AlertMessage />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            container
            spacing={2}
            justifyContent="center"
            alignItems="start"
          >
            <Grid item xs={12}>
              {currentNews ? (
                <Card>
                  <CardHeader
                    avatar={<Chip label={currentNews.type} />}
                    title={currentNews.title}
                    subheader={currentNews.date.toLocaleDateString()}
                  />
                  <CardContent>
                    <div
                      dangerouslySetInnerHTML={{ __html: currentNews.content }}
                    />
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent>
                    <Typography component="p" variant="body1">
                      News not found.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            container
            spacing={2}
            alignItems="start"
            justifyContent="start"
          >
            {isAuth && (
              <Grid item xs={12}>
                <MenuSection />
              </Grid>
            )}
            {/* <Grid item xs={12}>
              <ToolsSection />
            </Grid> */}
            <Grid item xs={12}>
              <RelatedLinkSection />
            </Grid>
            <Grid item xs={12}>
              <TwitterSection />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
}

export default InformationNews;