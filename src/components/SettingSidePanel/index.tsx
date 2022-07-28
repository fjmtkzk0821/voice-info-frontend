import { Card, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDataState } from "../../features/user/authSlice";
import { cleanAuthHeader } from "../../services/api";
import StylelessRouteLink from "../StylelessRouteLink";
import { getString } from "../../utils/localization";

class SettingGroup {
    header: string;
    map: Map<string, string>;

    constructor(header: string, map: Map<string, string>) {
        this.header = header;
        this.map = map;
    }
}

const accountSG = new SettingGroup(getString("link", "account"), new Map([
  ["/setting/account",getString("link", "accountSetting")]
]));
const nonSeiyuSG = new SettingGroup("声優情報", new Map([
  ["/setting/seiyu/register", getString("link","seiyuReg")],
]));

const seiyuSG = new SettingGroup(getString("link", "seiyuSetting"), new Map([
  ["/setting/seiyu/edit",getString("link", "seiyuBasic")],
  ["/setting/seiyu/profile",getString("link", "seiyuDetail")],
  ["/setting/seiyu/sample",getString("link", "sampleManagement")],
  // ["/setting/seiyu/link","Social Link"],
]));

const circleSG = new SettingGroup("Circle情報", new Map([
  ["/setting/circle/edit","プロフィール設定"],
]));

const eventSG = new SettingGroup("Event", new Map([
  ["/setting/event/edit","Event Edit"],
]));

function SettingSidePanel() {
    const userData = useSelector(userDataState);
    const navigate = useNavigate();
    const sgList = userData && userData.isSeiyu
      ? [accountSG, seiyuSG] //circleSG, eventSG
      : [accountSG, nonSeiyuSG]; //circleSG, eventSG
    return (
      <Card>
        {userData.isSeiyu && <List dense>
          <StylelessRouteLink linkProps={{
            to: `/seiyu/${userData.uid}`
          }}>
          <ListItemButton>
            <ListItemIcon
              sx={{
                minWidth: 32,
              }}
            >
              <ContactPageIcon />
            </ListItemIcon>
            <ListItemText>{getString("link", "profile")}</ListItemText>
          </ListItemButton>
          </StylelessRouteLink>
        </List>}
        {sgList
          .map((group, index) => {
            return [
              <Divider key={`sgl-divi-${index}`} />,
              <List
                key={`sgl-${index}`}
                subheader={
                  <ListSubheader
                    sx={{
                      lineHeight: 3,
                      color: "secondary.main",
                      fontWeight: "bold",
                    }}
                  >
                    {group.header}
                  </ListSubheader>
                }
                disablePadding
                dense
              >
                {Array.from(group.map.entries()).map((val, iindex) => (
                  <Link
                    key={`sgl-lib-${index}-${iindex}`}
                    to={val[0]}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <ListItemButton LinkComponent={Link}>
                      <ListItemText>{val[1]}</ListItemText>
                    </ListItemButton>
                  </Link>
                ))}
              </List>,
            ];
          })
          .flat()}
        <Divider />
        <List dense>
          <ListItemButton onClick={() => {
            cleanAuthHeader();
            navigate("/");
          }}>
            <ListItemIcon
              sx={{
                minWidth: 32,
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>{getString("link", "logout")}</ListItemText>
          </ListItemButton>
        </List>
      </Card>
    );
}

export default SettingSidePanel