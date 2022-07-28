import { Avatar, Card, CardActionArea, CardHeader, Divider, List, ListItemButton, ListItemText } from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings'

import DefaultSection from "../../../components/DefaultSection";
import { useAppSelector } from "../../../app/hooks";
import { userDataState } from "../../../features/user/authSlice";
import StylelessRouteLink from "../../../components/StylelessRouteLink";
import { getString } from "../../../utils/localization";

function MenuSection() {
  const userData = useAppSelector(userDataState);
  return (
    <Card>
      {/* <CardHeader
        // avatar={<Avatar>O</Avatar>}
        title={`Welcome! [name]`}
        // subheader="Go to my profile"
      /> */}
      {/* <Divider /> */}
      <List dense disablePadding>
        <StylelessRouteLink
          linkProps={{
            to: "/setting/account",
          }}
        >
          <ListItemButton>
            <ListItemText primary={getString("link", "accountSetting")} />
          </ListItemButton>
        </StylelessRouteLink>
        <Divider />
        <StylelessRouteLink
          linkProps={{
            to: userData.isSeiyu
              ? "/setting/seiyu/edit"
              : "/setting/seiyu/register",
          }}
        >
          <ListItemButton>
            <ListItemText primary={getString("link","seiyuSetting")} />
          </ListItemButton>
        </StylelessRouteLink>
        <Divider />
        {/* <ListItemButton>
          <ListItemText primary="Circle Setting" />
        </ListItemButton>
        <Divider /> */}
        {/* <ListItemButton>
          <ListItemText primary="Event Setting" />
        </ListItemButton> */}
      </List>
    </Card>
  );
}

export default MenuSection