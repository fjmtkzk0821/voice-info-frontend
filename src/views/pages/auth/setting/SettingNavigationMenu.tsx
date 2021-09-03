import { Paper, List, ListItemIcon, ListItemText, Divider, ListItem } from "@material-ui/core";
import { AccountBox, ArtTrack, Edit, Mic } from "@material-ui/icons";
import { withRouter } from "react-router";
import { getString } from "../../../../utils/localization";

function SettingNavigationMenu(props: any) {
    const {history} = props;
    return (
      <Paper variant="outlined">
        <List>
          <ListItem button onClick={(e) => history.push(`/seiyu/${localStorage.getItem("uid")}`)}>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary={getString("ja","link","profile")} />
          </ListItem>
          <Divider/>
          <ListItem button onClick={(e) => history.push('/setting/basic')}>
            <ListItemIcon>
              <ArtTrack />
            </ListItemIcon>
            <ListItemText primary={getString("ja","link","userBasic")} />
          </ListItem>
          <Divider/>
          <ListItem button onClick={(e) => history.push('/setting/detail')}>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary={getString("ja","link","userDetail")} />
          </ListItem>
          <Divider/>
          <ListItem button onClick={(e) => history.push('/setting/sample')}>
            <ListItemIcon>
              <Mic />
            </ListItemIcon>
            <ListItemText primary={getString("ja","link","sampleManagement")} />
          </ListItem>
        </List>
      </Paper>
    );
  }
  
  export default withRouter(SettingNavigationMenu);