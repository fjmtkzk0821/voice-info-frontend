import {
  Box,
  Container,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchDataAsync } from "../../../redux/slices/homePageSlice";
import { getString } from "../../../utils/localization";
import SectionAction from "./SectionAction";
import SectionList from "./SectionList";
import SectionNotices from "./SectionNotices";
import {
  AccountTree,
  Mic,
  EventNoteOutlined,
  EmojiFoodBeverageSharp,
  Bathtub,
} from "@material-ui/icons";
import { palette } from "../../../assets/styles/palette";
import AlertMessage from "../../components/common/AlertMessage";
import MessageBlock from "../../components/common/MessageBlock";
import NavigationBar from "../../components/navigation/NavigationBar";
import { AppDispatch, RootState } from "../../../redux/store";
import { clearAlertSync } from "../../../redux/slices/alertMessageSlice";

class HomePage extends Component<any, any> {
  // constructor(props: any) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.clearAlertSync();
    if (!this.props.isInitialized) this.props.fetchDataAsync();
  }

  render() {
    return (
      <div className="mt-default">
        <NavigationBar />
        <Container>
          <AlertMessage />
          <Grid container spacing={2}>
            <Grid item sm={9} xs={12}>
              <SectionNotices />
            </Grid>
            <Grid item sm={3} xs={12}>
              <SectionAction />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <SectionList
                title={getString("ja", "home", "seiyuBlock")}
                icon={
                  <Mic fontSize="large" style={{ color: palette.accent }} />
                }
              >
                {this.props.seiyuList.length > 0 ? (
                  <Box></Box>
                ) : (
                  <MessageBlock
                    icon={
                      <EmojiFoodBeverageSharp
                        fontSize="small"
                        color="disabled"
                      />
                    }
                    message={getString("ja", "message", "noSeiyu")}
                  />
                )}
                <ListItem
                  button
                  onClick={() => this.props.history.push("/seiyu")}
                >
                  <ListItemIcon>
                    <AccountTree></AccountTree>
                  </ListItemIcon>
                  <ListItemText>
                    {getString("ja", "link", "seiyu")}へ
                  </ListItemText>
                </ListItem>
              </SectionList>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <SectionList
                title="イベント"
                icon={
                  <EventNoteOutlined
                    fontSize="large"
                    style={{ color: palette.accent }}
                  />
                }
              >
                <MessageBlock
                  icon={<Bathtub fontSize="small" color="disabled" />}
                  message="COMING SOON"
                />
              </SectionList>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    isInitialized: state.homePage.init,
    notices: state.homePage.notices,
    seiyuList: state.homePage.seiyuList,
    alert: state.alertMessage.message,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({ fetchDataAsync, clearAlertSync }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
