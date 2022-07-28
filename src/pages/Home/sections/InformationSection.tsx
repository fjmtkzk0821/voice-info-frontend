import { Card, CardHeader, Icon, CardContent, List, CircularProgress, ListItem, ListItemText } from "@mui/material"
import CampaignIcon from '@mui/icons-material/Campaign'

import InformationItem from '../components/InformationItem'
import DefaultSection from "../../../components/DefaultSection";
import { News } from "../../../utils/objects/news";
import { useAppSelector } from "../../../app/hooks";
import { getNews } from "../../../features/public/coreSlice";
import { getString } from "../../../utils/localization";

function InformationSection() {
  const news = useAppSelector(getNews);
  const list = news !== undefined?news.map((n) => News.fromObject(n)): undefined;
  return (
    <DefaultSection label={getString("link", "information")} icon={<CampaignIcon />}>
      {list !== undefined ? (
        <List dense={true}>
          {list.length > 0 ? (
            list.map((item, index) => <InformationItem key={`li-news-${index}`} news={item}/>)
          ) : (
            <ListItem>
              <ListItemText>
                {getString("message", "nonews")}
              </ListItemText>
            </ListItem>
          )}
        </List>
      ) : (
        <CardContent>
          <CircularProgress />
        </CardContent>
      )}
    </DefaultSection>
  );
}

export default InformationSection