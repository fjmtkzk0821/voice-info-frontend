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
  import EmailIcon from '@mui/icons-material/Email';
import { getString } from "../../../utils/localization";
  
  type IProps = {
    doc: SeiyuDocument;
  };
  
  function VocalBasicItem({ doc }: IProps) {
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
              }}
            >
              <CardMedia
                component="img"
                height={128}
                width={128}
                src={getUrlFromStorageBucket(doc.avatar)}
                alt="no-img"
              />
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
              flex: "1 auto",
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
                    icon={<EmailIcon />}
                    label="EMAIL"
                    size="small"
                    color="primary"
                    sx={{ borderRadius: 1, my: 0.5 }}
                  />
                  <Chip
                    label={doc.email.length > 0 ? doc.email : "---"}
                    size="small"
                    sx={{ flex: "1 0 auto", borderRadius: 1, my: 0.5, ml: 0.5 }}
                  />
                </Stack>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Card>
    );
  }
  
  export default VocalBasicItem;
  