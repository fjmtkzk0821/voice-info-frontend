import { CardActionArea, CardContent, Grid, List, Stack } from "@mui/material"
import LinkIcon from '@mui/icons-material/Link'

import DefaultSection from "../../../components/DefaultSection";
import { useAppSelector } from "../../../app/hooks";
import { getRelatedLink } from "../../../features/public/coreSlice";
import RelatedLink from "../../../utils/objects/RelatedLink";
import { getString } from "../../../utils/localization";
import { openInNewTab } from "../../../utils/common";

function RelatedLinkSection() {
  const raw = useAppSelector(getRelatedLink);
  let relatedLink: RelatedLink[] = [];
  if(raw) {
    relatedLink = raw.map((r) => RelatedLink.fromObject(r));
  }

  return (
    <DefaultSection label={getString("link", "link")} icon={<LinkIcon />}>
      <CardContent>
        <Grid container spacing={1}>
          {relatedLink.map((rl, index) => (
            <Grid key={`a-rl-${index}`} item xs={6} md={12}>
              <a onClick={() => {
              openInNewTab(rl.url);
            }}>
              <img
                src={rl.cover}
                style={{ width: "100%" }}
              ></img>
            </a>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </DefaultSection>
  );
}

export default RelatedLinkSection