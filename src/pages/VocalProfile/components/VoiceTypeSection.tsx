import { Card, CardContent, Box, Paper, Stack, Chip } from "@mui/material";
import React from "react";
import { getString } from "../../../utils/localization";

type IProps = {
    able: string[],
    wish: string[],
}

function VoiceTypeSection({able, wish}: IProps) {
    if(!(able.length > 0 || wish.length > 0)) {
        return <React.Fragment></React.Fragment>;
    }
    return (
      <Card>
        <CardContent
          sx={{
            p: "8px!important",
          }}
        >
          {able.length > 0 && (
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
                  {able.map((t, index) => (
                    <Chip
                      key={`cp-${index}`}
                      label={t}
                      size="small"
                      sx={{ borderRadius: 1, my: 0.5, ml: 0.5 }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Box>
          )}
          {wish.length > 0 && (
            <Box sx={{ pt: 1 }}>
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
                    label={getString("profile", "wish")}
                    size="small"
                    color="primary"
                    sx={{ borderRadius: 1, my: 0.5 }}
                  />
                  {wish.map((t, index) => (
                    <Chip
                      key={`cw-${index}`}
                      label={t}
                      size="small"
                      sx={{ borderRadius: 1, my: 0.5, ml: 0.5 }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Box>
          )}
        </CardContent>
      </Card>
    );
}

export default VoiceTypeSection;