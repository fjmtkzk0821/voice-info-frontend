import {
  Container,
  Grid,
  Paper,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItem,
} from "@material-ui/core";
import { AccountBox, ArtTrack, Edit, ExitToApp, Mic } from "@material-ui/icons";
import { Component } from "react";
import { bindActionCreators } from "redux";
import { AppDispatch } from "../../../../redux/store";
import { getString } from "../../../../utils/localization";
import SectionHeader from "../../../components/common/SectionHeader";
import { logoutAsync } from "../../../../redux/slices/userSlice";
import { connect } from "react-redux";

class SettingPage extends Component<any, any> {
  render() {
      const {history} = this.props;
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item md={12} sm={12} xs={12}>
            <SectionHeader title={getString("ja", "link", "setting")} />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Paper variant="outlined">
              <List>
                <ListItem
                  button
                  onClick={(e) =>
                    history.push(
                      `/seiyu/${localStorage.getItem("uid")}`
                    )
                  }
                >
                  <ListItemIcon>
                    <AccountBox />
                  </ListItemIcon>
                  <ListItemText primary={getString("ja", "link", "profile")} />
                </ListItem>
                <Divider variant="inset" />
                <ListItem
                  button
                  onClick={(e) => history.push("/setting/basic")}
                >
                  <ListItemIcon>
                    <ArtTrack />
                  </ListItemIcon>
                  <ListItemText
                    primary={getString("ja", "link", "userBasic")}
                  />
                </ListItem>
                <Divider variant="inset" />
                <ListItem
                  button
                  onClick={(e) => history.push("/setting/detail")}
                >
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText
                    primary={getString("ja", "link", "userDetail")}
                  />
                </ListItem>
                <Divider variant="inset" />
                <ListItem
                  button
                  onClick={(e) => history.push("/setting/sample")}
                >
                  <ListItemIcon>
                    <Mic />
                  </ListItemIcon>
                  <ListItemText
                    primary={getString("ja", "link", "sampleManagement")}
                  />
                </ListItem>
                <Divider variant="inset" />
                <ListItem
                  button
                  onClick={(e) => this.props.logoutAsync(history)}
                >
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary={getString("ja", "link", "logout")} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {/* <AdsComponent
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-1962860048148021"
                data-ad-slot="3953961762"
                data-ad-format="auto"
                data-full-width-responsive="true"
              /> */}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({logoutAsync}, dispatch);
}

export default connect(null, mapDispatchToProps)(SettingPage);