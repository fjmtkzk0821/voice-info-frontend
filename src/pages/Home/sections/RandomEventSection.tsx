import { Card, CardHeader, Icon, CardContent, List } from "@mui/material"
import EventIcon from '@mui/icons-material/Event'

import InformationItem from '../components/InformationItem'
import DefaultSection from "../../../components/DefaultSection";
import TwitterTweetEmbed from "../../../components/TwitterTweetEmbed";

function RandomEventSection() {
  return (
    <DefaultSection label="Rng Event" icon={<EventIcon />}>
      <List dense={true}>
      </List>
    </DefaultSection>
  );
}

export default RandomEventSection