import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import core from "../../assets/jss/core";
import DefaultCardContent from "../../components/DefaultCardContent";
import DefaultSection from "../../components/DefaultSection";
import EmailIcon from '@mui/icons-material/Email'
import StylelessRouteLink from "../../components/StylelessRouteLink";

function SignUpFinish() {
    return (
      <Container maxWidth="md" sx={core.mainContainer}>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={12} sm={7} md={6}>
            <DefaultSection icon={<EmailIcon />} label={"Sign up completed."}>
              <DefaultCardContent>
                <Stack>
                  <Typography component="p" variant="body1">
                    A verification email was sent. Please check the email to
                    activate your account
                  </Typography>
                  <StylelessRouteLink
                    linkProps={{
                      to: "/auth/signin",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      disableElevation
                      fullWidth
                      sx={{
                        mt: 2,
                      }}
                    >
                      Goto Login
                    </Button>
                  </StylelessRouteLink>
                </Stack>
              </DefaultCardContent>
            </DefaultSection>
          </Grid>
        </Grid>
      </Container>
    );
}

export default SignUpFinish;