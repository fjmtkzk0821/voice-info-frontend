import { Box, Button, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import StylelessRouteLink from "../../../components/StylelessRouteLink";
import { News } from "../../../utils/objects/news";

type IProps = {
  news: News
}

function InformationItem({news}:IProps) {
    return (
      <StylelessRouteLink linkProps={{
        to: `/news/${news.uid}`
      }}>
        <ListItemButton>
        <ListItemIcon>
            <Chip label={news.type} color="primary" size="small"/>
        </ListItemIcon>
        <ListItemText primary={news.title} sx={{
            paddingX: 1
        }}/>
        <Box flexGrow={1} />
        <Typography variant="caption">{news.date.toLocaleDateString()}</Typography>
      </ListItemButton>
      </StylelessRouteLink>
    );
}

export default InformationItem