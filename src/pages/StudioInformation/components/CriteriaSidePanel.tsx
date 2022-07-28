import { Box, Button, Card, Grid, List, ListItemButton, ListItemText, MenuItem, Stack, TextField, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getString } from "../../../utils/localization";
import { SeiyuSearchCriteria } from "../../../utils/objects/seiyu";
import CriteriaSection from "../../VocalSearch/components/CriteriaSection";
import { StudioSearchCriteria } from "../../../utils/objects/studio";
import { useState } from "react";

type IProps = {
    onApply: Function,
    cachedCriteria?: StudioSearchCriteria,
}

function CriteriaSidePanel({onApply,cachedCriteria}: IProps) {
  const [criteria, setCriteria] = useState(
    cachedCriteria ? cachedCriteria : new StudioSearchCriteria().toObject()
  );

  const handleChange = (key: string, value: any) => {
    setCriteria({
      ...criteria,
      [key]: value,
    });
  };

  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingX: 2,
          paddingY: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: "0 0 auto",
            paddingRight: 2,
          }}
        >
          <FilterListIcon fontSize="small" />
        </Box>
        <Typography variant="subtitle2">
          {getString("common", "filter")}
        </Typography>
      </Box>
      <Box
        sx={{
          paddingX: 1,
          paddingY: 1,
        }}
      >
        <Grid container spacing={1} justifyContent="center" alignItems="start">
          <Grid item xs={12}>
            <CriteriaSection label={getString("search", "criteria")}>
              <Stack px={1} py={1.5} spacing={1.5}>
                <TextField
                  value={criteria.name}
                  label={getString("profile", "name")}
                  size="small"
                  onChange={(event) => handleChange("name", event.target.value)}
                />
                <TextField
                  label={getString("profile", "gender")}
                  select
                  size="small"
                  value={criteria.prefecture}
                  onChange={(event) =>
                    handleChange("gender", event.target.value)
                  }
                >
                  <MenuItem value="">--empty--</MenuItem>
                </TextField>
              </Stack>
            </CriteriaSection>
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              onClick={() => setCriteria(new StudioSearchCriteria().toObject())}
            >
              {getString("common", "reset")}
            </Button>
          </Grid>
          <Grid item xs={7}>
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              fullWidth
              onClick={() => {
                onApply(SeiyuSearchCriteria.fromObject(criteria));
              }}
            >
              {getString("common", "filter")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default CriteriaSidePanel;