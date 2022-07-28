import { Paper, Typography } from "@mui/material";

type IProps = {
    label: string
}

function PageHeader({label}: IProps) {
    return (
      <Paper
        sx={{
          borderRadius: 10,
          width: "100%",
          textAlign: "center",
          backgroundColor: "primary.main",
          color: "rgba(255,255,255,0.9)",
          marginY: 1
        }}
      >
        <Typography
          variant="button"
          component="h2"
          sx={{
            paddingY: 0.5,
          }}
        >
          {label}
        </Typography>
      </Paper>
    );
}

export default PageHeader