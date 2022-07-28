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
import { SeiyuDocument, SeiyuSampleDocument } from "../../../utils/objects/seiyu";
import { getRandomInt, getUrlFromStorageBucket } from "../../../utils/common";
import { useAppDispatch } from "../../../app/hooks";
import { play } from "../../../features/audioPlayerSlice";
import StylelessRouteLink from "../../../components/StylelessRouteLink";
import { getString } from "../../../utils/localization";

type IProps = {
  doc: SeiyuDocument;
  sampleCat: string;
};

function VocalItem({ doc, sampleCat }: IProps) {
  const dispatch = useAppDispatch();
  let sample: SeiyuSampleDocument| undefined = undefined;
  if(doc.samples.length > 0) {
    if(sampleCat && sampleCat.length > 0) {
      sample = doc.samples.find((s) => s.cat.includes(sampleCat));
    } else {
      sample = doc.samples[getRandomInt(doc.samples.length)];
    }
  }

  return (
    <Card variant="outlined">
      <Box sx={{ display: "flex", flexDirection: {
        xs: "column",
        sm: "row"
      }, padding: 1 }}>
        <Stack direction={"column"} spacing={1}>
          <Card
            elevation={0}
            sx={{
              minWidth: 128,
              maxWidth: {
                sm: 128
              }
            }}
          >
            <StylelessRouteLink linkProps={{ to: `/seiyu/${doc.uid}` }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height={128}
                  width={128}
                  src={getUrlFromStorageBucket(doc.avatar)}
                  alt="no-img"
                />
              </CardActionArea>
            </StylelessRouteLink>
          </Card>
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#fbeeca",
              color: "#c56601",
              fontWeight: "bold",
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{
                paddingY: 1,
              }}
            >
              {doc.restric.r && <Box component="span">R</Box>}
              {doc.restric.r15 && <Box component="span">R15</Box>}
              {doc.restric.r18 && <Box component="span">R18</Box>}
              {!doc.restric.r && !doc.restric.r15 && !doc.restric.r18 && (
                <Box component="span">---</Box>
              )}
            </Stack>
          </Paper>
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
              <StylelessRouteLink linkProps={{ to: `/seiyu/${doc.uid}` }}>
                <Typography component="span" variant="h6" fontWeight="bold">
                  {doc.name.length > 0 ? doc.name : "---"}
                </Typography>
              </StylelessRouteLink>
              {doc.gender !== "NA" && (
                <Chip label={getString("profile", doc.gender)} size="small" />
              )}
              {doc.hires && (
                <Chip label={getString("profile", "hires")} size="small" />
              )}
            </Stack>
            <Typography
              component="p"
              variant="body2"
              color="textSecondary"
              sx={{ mt: 0.5 }}
            >
              {doc.intro.length > 0 ? doc.intro : "---"}
            </Typography>
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
              <Stack direction="row" sx={{ flexWrap: "wrap", paddingX: 0.5 }}>
                <Chip
                  label={getString("profile", "possible")}
                  size="small"
                  color="primary"
                  sx={{ borderRadius: 1, my: 0.5 }}
                />
                {doc.possible.length > 0 ? (
                  doc.possible.map((t, index) => (
                    <Chip
                      key={`c-${doc.uid}-p-${index}`}
                      label={t}
                      size="small"
                      sx={{ borderRadius: 1, my: 0.5, ml: 0.5 }}
                    />
                  ))
                ) : (
                  <Chip
                    key={`c-${doc.uid}-p-0`}
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
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{
              backgroundColor: "secondary.main",
              color: "primary.main",
              fontWeight: "bold",
              paddingX: 3,
              paddingY: 1.5,
              flex: "0 0 auto",
            }}>
          <Box
            component="span"
            sx={{
              minWidth: "112px"
            }}
          >
            {getString("profile", "samples")}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flex: "1 auto",
            backgroundColor: "primary.main",
          }}
        >
          <Box
            component="span"
            sx={{
              paddingY: 1.5,
              color: "white.main",
              px: 3,
            }}
          >
            {sample ? sample.cat : getString("message", "noSampleMatched")}
          </Box>
          {sample && (
            <IconButton
              onClick={() => {
                if (sample) {
                  dispatch(
                    play({
                      category: sample.cat,
                      restriction: sample.restric,
                      src: getUrlFromStorageBucket(sample.filename),
                    })
                  );
                }
              }}
              color="white"
              sx={{
                height: "100%",
                paddingX: 3,
                borderRadius: 0,
              }}
            >
              <PlayArrowIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </Card>
  );
}

export default VocalItem;
