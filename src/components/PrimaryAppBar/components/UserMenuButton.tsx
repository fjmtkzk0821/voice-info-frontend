import { AccountCircle } from "@mui/icons-material"
import { Card, CardActionArea, Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { getString } from "../../../utils/localization";
import StylelessRouteLink from "../../StylelessRouteLink";

type IProps = {
  onClick?: Function
}

function UserMenuButton({onClick}: IProps) {
  const navigate = useNavigate();
    return (
      <div>
        <Card
          elevation={1}
          sx={{
            bgcolor: "secondary.main",
          }}
        >
          {/* <StylelessRouteLink linkProps={{ to: "/setting/account" }}> */}
            <CardActionArea
              onClick={() => {
                if (onClick) onClick();
                navigate("/setting/account");
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
                <Typography
                  variant="button"
                  sx={{
                    paddingX: 0.5,
                    textAlign: "right",
                  }}
                >
                  {getString("link", "account")}
                </Typography>
              </Box>
            </CardActionArea>
          {/* </StylelessRouteLink> */}
        </Card>
      </div>
    );
}

export default UserMenuButton