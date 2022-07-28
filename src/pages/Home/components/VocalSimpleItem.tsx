import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardMedia,
    Chip,
    Grid,
    IconButton,
    Paper,
    Stack,
    Typography,
  } from "@mui/material";
  import noImg from "../../../assets/img/no_img.jpg";
  import PlayArrowIcon from "@mui/icons-material/PlayArrow";
  import { SeiyuDocument } from "../../../utils/objects/seiyu";
  import { getUrlFromStorageBucket } from "../../../utils/common";
  import { useAppDispatch } from "../../../app/hooks";
  import { play } from "../../../features/audioPlayerSlice";
  import StylelessRouteLink from "../../../components/StylelessRouteLink";
import { getString } from "../../../utils/localization";
  
  type IProps = {
    doc: SeiyuDocument;
  };
  
  function VocalSimpleItem({ doc }: IProps) {
    // const dispatch = useAppDispatch();
    return (
      <Card variant="outlined">
        <StylelessRouteLink linkProps={{ to: `/seiyu/${doc.uid}` }}>
          <CardActionArea>
            <Box sx={{ display: "flex", flexDirection: {
        xs: "column",
        sm: "row"
      }, padding: 1 }}>
              <Stack direction={"column"} spacing={1}>
                <Card
                  elevation={0}
                  sx={{
                    minWidth: 96,
                    maxWidth: {
                      sm: 96
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height={96}
                    width={96}
                    src={getUrlFromStorageBucket(doc.avatar)}
                    alt="no-img"
                  />
                </Card>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  flex: "1 0",
                  flexDirection: "column",
                  ml: 1,
                }}
              >
                <Box sx={{ flex: "1 0 auto" }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography component="span" variant="h6" fontWeight="bold">
                      {doc.name.length > 0 ? doc.name : "---"}
                    </Typography>
                    {doc.gender !== "NA" && (
                      <Chip label={getString("profile", doc.gender)} size="small" />
                    )}
                    {doc.hires && <Chip label={getString("profile", "hires")} size="small" />}
                  </Stack>
                </Box>
                <Box>
                    <Paper
                      variant="outlined"
                      sx={{
                        border: `1 solid`,
                        borderColor: "primary.main",
                        // borderRadius: 8,
                      }}
                    >
                      <Stack
                        direction="row"
                        sx={{ flexWrap: "wrap", paddingX: 0.5 }}
                      >
                        <Chip
                          label={getString("profile", "rating")}
                          size="small"
                          color="primary"
                          sx={{ borderRadius: 1, my: 0.5 }}
                        />
                        {doc.restric.r && (
                          <Chip
                            label={getString("profile", "R")}
                            size="small"
                            sx={{ borderRadius: 1, my: 0.5, ml: 0.5 }}
                          />
                        )}
                        {doc.restric.r15 && (
                          <Chip
                            label="r15"
                            size="small"
                            sx={{ borderRadius: 1, my: 0.5, ml: 0.5 }}
                          />
                        )}
                        {doc.restric.r18 && (
                          <Chip
                            label="r18"
                            size="small"
                            sx={{ borderRadius: 1, my: 0.5, ml: 0.5 }}
                          />
                        )}
                        {!doc.restric.r &&
                          !doc.restric.r15 &&
                          !doc.restric.r18 && (
                            <Chip
                              label="---"
                              size="small"
                              sx={{ borderRadius: 1, my: 0.5, ml: 0.5 }}
                            />
                          )}
                      </Stack>
                    </Paper>
                  </Box>
              </Box>
            </Box>
          </CardActionArea>
        </StylelessRouteLink>
      </Card>
    );
  }
  
  export default VocalSimpleItem;
  