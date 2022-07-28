import { Card, Box, Typography, Grid, List, ListItemButton, ListItemText, Stack, TextField, MenuItem, Button, ListItemIcon } from "@mui/material";
import CriteriaSection from "./CriteriaSection";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { SeiyuSearchCriteria } from "../../../utils/objects/seiyu";
import CheckIcon from '@mui/icons-material/Check';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { getString } from "../../../utils/localization";

type IProps = {
    onApply: Function,
    cachedCriteria?: SeiyuSearchCriteria,
}

function CriteriaSidePanel({onApply,cachedCriteria}: IProps) {
    const [criteria, setCriteria] = useState(
      cachedCriteria
        ? cachedCriteria
        : new SeiyuSearchCriteria().toObject()
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
          <Grid
            container
            spacing={1}
            justifyContent="center"
            alignItems="start"
          >
            <Grid item xs={12}>
              <CriteriaSection label={getString("profile", "rating")}>
                <List dense disablePadding>
                  {Object.entries({
                    r: getString("profile", "R"),
                    r15: "R15",
                    r18: "R18",
                  }).map((e, index) => (
                    <ListItemButton
                      key={`criteria-lib-${index}`}
                      selected={criteria.restric === e[0]}
                      onClick={() =>
                        handleChange(
                          "restric",
                          criteria.restric === e[0] ? "" : e[0]
                        )
                      }
                    >
                      <ListItemText primary={e[1]} />
                      {criteria.restric === e[0] && <CheckIcon />}
                    </ListItemButton>
                  ))}
                </List>
              </CriteriaSection>
            </Grid>
            <Grid item xs={12}>
              <CriteriaSection label={getString("search", "criteria")}>
                <Stack px={1} py={1.5} spacing={1.5}>
                  <TextField
                    value={criteria.name}
                    label={getString("profile", "name")}
                    size="small"
                    onChange={(event) =>
                      handleChange("name", event.target.value)
                    }
                  />
                  <TextField
                    label={getString("profile", "gender")}
                    select
                    size="small"
                    value={criteria.gender}
                    onChange={(event) =>
                      handleChange("gender", event.target.value)
                    }
                  >
                    <MenuItem value="">--empty--</MenuItem>
                    <MenuItem value="F">{getString("profile", "F")}</MenuItem>
                    <MenuItem value="M">{getString("profile", "M")}</MenuItem>
                    <MenuItem value="NG">NG</MenuItem>
                  </TextField>
                  <TextField
                    label={`${getString("profile", "possible")}/${getString(
                      "profile",
                      "wish"
                    )}`}
                    size="small"
                    value={criteria.vocalType}
                    onChange={(event) =>
                      handleChange("vocalType", event.target.value)
                    }
                  />
                  <TextField
                    label={getString("profile", "samples")}
                    size="small"
                    value={criteria.sampleCat}
                    onChange={(event) =>
                      handleChange("sampleCat", event.target.value)
                    }
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={
                      criteria.hires ? (
                        <CheckBoxIcon />
                      ) : (
                        <CheckBoxOutlineBlankIcon />
                      )
                    }
                    onClick={() => handleChange("hires", !criteria.hires)}
                  >
                    {getString("profile", "hires")}
                  </Button>
                </Stack>
              </CriteriaSection>
            </Grid>
            <Grid item xs={5}>
              <Button
                variant="contained"
                disableElevation
                fullWidth
                onClick={() =>
                  setCriteria(new SeiyuSearchCriteria().toObject())
                }
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