import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchDataAsync } from "../../../redux/slices/homePageSlice";
import { getString } from "../../../utils/localization";
import SectionAction from "./SectionAction";
import SectionList from "./SectionList";
import SectionNotices from "./SectionNotices";
import { palette } from "../../../assets/styles/palette";
import AlertMessage from "../../components/common/AlertMessage";
import MessageBlock from "../../components/common/MessageBlock";
import NavigationBar from "../../components/navigation/NavigationBar";
import { AppDispatch, RootState } from "../../../redux/store";
import { clearAlertSync } from "../../../redux/slices/alertMessageSlice";
import SimpleSeiyuCard from "../../components/SimpleSeiyuCard";
import { Container, Grid, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import EmojiFoodBeverageSharpIcon from "@mui/icons-material/EmojiFoodBeverageSharp";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import BathtubIcon from "@mui/icons-material/Bathtub";

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
                  <MicIcon fontSize="large" style={{ color: palette.accent }} />
                }
              >
                {this.props.seiyuList.length > 0 ? (
                  this.props.seiyuList.map((seiyu: any, index: number) => (
                    <SimpleSeiyuCard
                      key={`card-home-seiyu-${index}`}
                      avatar={seiyu.avatar.link}
                      name={seiyu.name}
                      desc={seiyu.intro}
                      onClick={() => {
                        this.props.history.push(`/seiyu/${seiyu.uid}`);
                      }}
                    />
                  ))
                ) : (
                  <MessageBlock
                    icon={
                      <EmojiFoodBeverageSharpIcon
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
                    <AccountTreeIcon />
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
                  <EventNoteOutlinedIcon
                    fontSize="large"
                    style={{ color: palette.accent }}
                  />
                }
              >
                <MessageBlock
                  icon={<BathtubIcon fontSize="small" color="disabled" />}
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
