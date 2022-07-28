import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import { ReactNode } from "react";

type ISectionProps = {
    header: string;
    children?: ReactNode;
  };
  
  function SettingSection({header, children}: ISectionProps) {
      return (
        <Card>
          <CardHeader subheader={header} />
          <CardContent
            sx={{
              px: 2,
              py: 0,
            }}
          >
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              rowSpacing={2}
            >
              {children}
            </Grid>
          </CardContent>
        </Card>
      );
  }

export default SettingSection;