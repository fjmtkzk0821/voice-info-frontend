import { Card, CardContent, List } from "@mui/material"
import DefaultSection from "../../../components/DefaultSection"
import ApartmentIcon from '@mui/icons-material/Apartment'
import TwitterTweetEmbed from "../../../components/TwitterTweetEmbed";

function RandomStudioSection() {
    return (
      <DefaultSection label="Rng Studio" icon={<ApartmentIcon />}>
        {/* <List dense={true}></List> */}
      </DefaultSection>
    );
}

export default RandomStudioSection