import { Box, Stack, Typography } from "@mui/material";

function Maintenance() {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#333",
          color: "#fff"
        }}
      >
        <Stack justifyContent="center" alignItems="center">
          <Box
            component="img"
            src={`${process.env.PUBLIC_URL}/voice_info_logo.png`}
            sx={{
                width: "250px"
            }}
          ></Box>
          <Typography component="span" variant="caption">
            This service is currently undergoing maintenance
          </Typography>
          <Typography component="span" variant="caption">
            現在、このサービスはメンテナンス中です
          </Typography>
        </Stack>
      </Box>
    );
}

export default Maintenance;