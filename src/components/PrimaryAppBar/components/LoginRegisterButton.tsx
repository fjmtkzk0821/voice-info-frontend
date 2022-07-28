import { AccountCircle } from "@mui/icons-material";
import { Card, CardActionArea, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getString } from "../../../utils/localization";

type IProps = {
  onClick?: Function
}

function LoginRegisterButton({onClick}: IProps) {
  const navigate = useNavigate();
    return (
      <Card
        elevation={1}
        sx={{
          bgcolor: "secondary.main",
        }}
      >
        <CardActionArea
          // component={Link}
          // to="/auth/signin"
          sx={{ textDecoration: "none", color: "inherit" }}
          onClick={() => {
            if (onClick) onClick();
            navigate("/auth/signin");
          }}
        >
          <Box
            sx={{
              display: "flex",
              paddingX: 1,
              paddingY: 1,
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <AccountCircle />
            <Typography
              variant="button"
              sx={{
                paddingX: 0.5,
                textAlign: "right",
              }}
            >
              {getString("link", "login")} / {getString("link", "register")}
            </Typography>
          </Box>
        </CardActionArea>
      </Card>
    );
}

export default LoginRegisterButton