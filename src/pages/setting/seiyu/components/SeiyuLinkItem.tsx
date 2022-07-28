import { Card, IconButton, CardContent, Grid, TextField, ToggleButtonGroup, ToggleButton, MenuItem } from "@mui/material";
import { FormRow, FormRowDivider } from "../../components/FormGridComponents";
import CloseIcon from '@mui/icons-material/Close';
import { SeiyuSocialLinkDocument } from "../../../../utils/objects/seiyu";

type IProps = {
    link: SeiyuSocialLinkDocument
}

function SeiyuLinkItem({link}:IProps) {
    return <Card>
    <IconButton size="small"><CloseIcon /></IconButton>
    <CardContent>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        rowSpacing={2}
      >
        <FormRow label="プラットフォーム">
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <TextField size="small" select fullWidth>
                  <MenuItem value="">--other--</MenuItem>
                  <MenuItem value="">--other--</MenuItem>
                  <MenuItem value="">--other--</MenuItem>
                  <MenuItem value="">--other--</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={7}>
              <TextField size="small" fullWidth />
            </Grid>
          </Grid>
        </FormRow>
        <FormRowDivider />
        <FormRow label="URL">
          <TextField size="small" fullWidth />
        </FormRow>
        <FormRowDivider />
        <FormRow label="表示">
          <ToggleButtonGroup
            size="small"
            sx={{
              float: "right",
            }}
          >
            <ToggleButton value="on">する</ToggleButton>
            <ToggleButton value="off">しない</ToggleButton>
          </ToggleButtonGroup>
        </FormRow>
      </Grid>
    </CardContent>
  </Card>
}

export default SeiyuLinkItem;