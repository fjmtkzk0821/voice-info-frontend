import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import { ReactNode } from "react";

type ISectionProps = {
    header: string;
    children?: ReactNode;
  };
  
  function InfoSection({header, children}: ISectionProps) {
      return (
        <Card>
          <CardHeader subheader={header} />
          <CardContent
            sx={{
              px: 2,
              py: 0,
            }}
          >
            {children}
          </CardContent>
        </Card>
      );
  }

export default InfoSection;