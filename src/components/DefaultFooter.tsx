import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import bg from '../assets/img/logo512.png';
import { openInNewTab } from "../utils/common";
import { getString } from "../utils/localization";
import StylelessRouteLink from "./StylelessRouteLink";

function Copyright(props: any) {
    return (
      <Typography variant="body2" color="textSecondary" align="center" {...props}>
        {"Copyright © "}
        <Link color="inherit" href="https://twitter.com/fjmtkzk0821">
          Fujimoto Kazuki
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

function DefaultFooter() {
    return (
      <Box
        component="footer"
        sx={{
          mt: 4,
          backgroundColor: "white.main",
        }}
      >
        {/* <Box
        component="img"
        src={bg}
          sx={{
            filter: "grayscale(100%)",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: "top",
            maxHeight: "250px"
          }}
        /> */}
        <Container
          maxWidth="md"
          sx={{
            py: 3,
            px: 2,
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                About
              </Typography>
              <Button
                size="small"
                onClick={() => {
                  openInNewTab("https://twitter.com/VOICEINFO_staff");
                }}
              >
                {getString("footer", "about")}
              </Button>
              <Button size="small">{getString("footer", "manual")}</Button>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="text.primary" gutterBottom>
                Legal
              </Typography>
              <StylelessRouteLink
                linkProps={{
                  to: "/static/privacy",
                }}
              >
                <Button size="small">{getString("footer", "privacy")}</Button>
              </StylelessRouteLink>
              <StylelessRouteLink
                linkProps={{
                  to: "/static/termsOfUse",
                }}
              >
                <Button size="small">{getString("footer", "terms")}</Button>
              </StylelessRouteLink>
            </Grid>
            <Grid item xs={12}>
              <Copyright />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
}

export default DefaultFooter