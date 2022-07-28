import { Grid, CardMedia, Card, CardHeader, Container, Icon, Button, CardContent, Stack, Paper, Typography, CircularProgress, Box, CardActionArea } from "@mui/material"
import DefaultCarousel from "../../components/DefaultCarousel"

// import image1 from "../../assets/img/bg.jpg";
// import image2 from "../../assets/img/bg2.jpg";
// import image3 from "../../assets/img/bg3.jpg";
import InformationSection from "./sections/InformationSection";
import RelatedLinkSection from "./sections/RelatedLinkSection";
import TwitterSection from "./sections/TwitterSection";
import core from '../../assets/jss/core'
import MenuSection from "./sections/MenuSection";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { isAuthenticated } from "../../features/user/authSlice";
import { getCachedSeiyuList, getNews, getPromotion, isInitialized, setIndexData } from "../../features/public/coreSlice";
import { useEffect } from "react";
import { openInNewTab, scroll2Top } from "../../utils/common";
import { dismissMessage, setMessage } from "../../features/messageSlice";
import pubService from "../../services/public";
import axios from "axios";
import { setLoading, dismissLoading } from "../../features/loadingBackdropSlice";
import BaseMessage, { BaseMessageType } from "../../utils/objects/BaseMessage";
import AlertMessage from "../../components/AlertMessage";
import RandomVocalSection from "./sections/RandomVocalSection";
import { Promotion } from "../../utils/objects/promotion";
import { getString } from "../../utils/localization";


function Home() {
  const dispatch = useAppDispatch();
  const isInitialised = useAppSelector(isInitialized);
  const news = useAppSelector(getNews);
  const promotion = useAppSelector(getPromotion);
  const seiyuList = useAppSelector(getCachedSeiyuList);
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
      if(!isInitialised) {
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
              <DefaultCarousel>
                {promotion !== undefined ? (
                  promotion.length > 0 ? (
                    promotion.map((promo, index) => {
                      let tmp = Promotion.fromObject(promo);
                      return (
                        <CardActionArea
                          key={`banner-promo-${index}`}
                          onClick={() => {
                            openInNewTab(tmp.data.url);
                          }}
                        >
                          <CardMedia
                            component="img"
                            width="100%"
                            height="256px"
                            image={(tmp.data as any).cover}
                            alt={tmp.title}
                          />
                        </CardActionArea>
                      );
                    })
                  ) : (
                    <Box
                      display="flex!important"
                      sx={{
                        color: "secondary.main",
                        backgroundColor: "primary.main",
                        width: "100%",
                        height: "256px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography component="span" variant="caption">
                        {getString("message", "nopromo")}
                      </Typography>
                    </Box>
                  )
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "256px",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}
              </DefaultCarousel>
            </Grid>
            <Grid item xs={12}>
              <InformationSection />
            </Grid>
            {/* <Grid item xs={12}>
              <RandomEventSection />
            </Grid> */}
            <Grid item xs={12} sm={12}>
              <RandomVocalSection />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <RandomStudioSection />
            </Grid> */}
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

export default Home