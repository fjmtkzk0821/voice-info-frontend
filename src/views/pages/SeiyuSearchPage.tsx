import {
  Button,
  Card,
  CardContent,
  Container,
  createStyles,
  Grid,
  MenuItem,
  TextField,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { palette } from "../../assets/styles/palette";
import SeiyuQueryFilter from "../../objects/SeiyuQueryFilter";
import { AppDispatch, RootState } from "../../redux/store";
import { getString } from "../../utils/localization";
import AlertMessage from "../components/common/AlertMessage";
import SectionHeader from "../components/common/SectionHeader";
import FormMultiSelectField from "../components/form/FormMultiSelectField";

import { fetchSeiyuDataAsync } from "../../redux/slices/dataStorageSlice";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Pagination } from "@material-ui/lab";
import MessageBlock from "../components/common/MessageBlock";
import { DirectionsWalk } from "@material-ui/icons";
import SeiyuCard from "../components/SeiyuCard";
import NavigationBar from "../components/navigation/NavigationBar";

type IStateProps = {
  isInitialized: Boolean;
  seiyuList: Array<any>;
  config: any;
};

type IDispatchProps = {
  fetchSeiyuDataAsync: any;
};

type IProps = any & IStateProps & IDispatchProps;

interface IState {
  criteria: SeiyuQueryFilter;
  applied: SeiyuQueryFilter;
}

const styles = (theme: Theme) =>
  createStyles({
    buttonActive: {
      border: `1px solid ${palette.accent}`,
      background: palette.accent,
      color: palette.primary,
      "&:hover": {
        border: `1px solid ${palette.accent}`,
        background: palette.accent,
        color: palette.primary,
      },
    },
  });

const DefaultTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: palette.accent,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: palette.primary,
      },
      "&:hover fieldset": {
        borderColor: palette.accent,
      },
      "&.Mui-focused fieldset": {
        borderColor: palette.accent,
      },
    },
  },
})(TextField);

const SubmitButton = withStyles({
  root: {
    height: "100%",
    width: "100%",
    border: "1px solid " + palette.accent,
    color: palette.accent,
    "&:hover": {
      background: palette.accent,
      color: palette.primary,
    },
  },
})(Button);

class SeiyuSearchPage extends Component<
  IProps & WithStyles<typeof styles>,
  IState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      criteria: new SeiyuQueryFilter(),
      applied: new SeiyuQueryFilter(),
    };
    this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentDidMount() {
    if (!this.props.isInitialized) this.props.fetchSeiyuDataAsync();
  }

  handleCriteriaChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(`${event.target.name} ${event.target.value}`);
    this.setState({
      criteria: this.state.criteria.changeCriteria(
        event.target.name,
        event.target.value
      ),
    });
  }

  handleAbleChange(key: string) {
    this.setState({
      criteria: this.state.criteria.changeCriteria("able", {
        ...this.state.criteria.able,
        [key]: !this.state.criteria.able[key],
      }),
    });
  }

  handleHiResChange() {
    this.setState({
      criteria: this.state.criteria.changeCriteria(
        "hires",
        !this.state.criteria.hires
      ),
    });
  }

  updateFilter() {
    this.setState({
      applied: SeiyuQueryFilter.clone(this.state.criteria),
    });
  }

  render() {
    const { classes } = this.props;
    let filtered = (this.props.seiyuList as Array<any>).filter((seiyu) => {
      return this.state.applied.filter(seiyu);
    });
    return (
      <div className="mt-default">
        <NavigationBar />
        <Container>
          <AlertMessage />
          <Grid container spacing={2}>
            <Grid item md={10} sm={10} xs={10}>
              <SectionHeader title={getString("ja", "link", "seiyu")} />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item md={6} sm={5} xs={12}>
                      <DefaultTextField
                        label={getString("ja", "profile", "name")}
                        name="name"
                        value={this.state.criteria.name}
                        onChange={this.handleCriteriaChange}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={3} sm={3} xs={12}>
                      <DefaultTextField
                        select
                        label={getString("ja", "profile", "gender")}
                        variant="outlined"
                        required
                        fullWidth
                        name="gender"
                        value={this.state.criteria.gender}
                        onChange={this.handleCriteriaChange}
                      >
                        <MenuItem value="">--empty--</MenuItem>
                        <MenuItem value="F">F</MenuItem>
                        <MenuItem value="M">M</MenuItem>
                        <MenuItem value="NG">NG</MenuItem>
                      </DefaultTextField>
                    </Grid>
                    <Grid item md={3} sm={4} xs={12}>
                      <FormMultiSelectField>
                        {Object.keys(this.state.criteria.able).map((key) => {
                          return (
                            <Button
                              key={`filter-${key}`}
                              name={key}
                              className={
                                this.state.criteria.able[key]
                                  ? classes.buttonActive
                                  : ""
                              }
                              onClick={(event) => this.handleAbleChange(key)}
                            >
                              {key}
                            </Button>
                          );
                        })}
                      </FormMultiSelectField>
                    </Grid>

                    <Grid item md={5} sm={4} xs={12}>
                      <DefaultTextField
                        label={getString("ja", "profileDetail", "jozu")}
                        name="charactor"
                        value={this.state.criteria.charactor}
                        onChange={this.handleCriteriaChange}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} sm={4} xs={12}>
                      <DefaultTextField
                        label={getString("ja", "profileDetail", "samples")}
                        name="sample"
                        value={this.state.criteria.sample}
                        onChange={this.handleCriteriaChange}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={3} sm={4} xs={12}>
                      <FormMultiSelectField>
                        <Button
                          className={
                            this.state.criteria.hires
                              ? classes.buttonActive
                              : ""
                          }
                          onClick={(event) => this.handleHiResChange()}
                        >
                          {getString("ja", "profileDetail", "hires")}
                        </Button>
                      </FormMultiSelectField>
                    </Grid>
                    <Grid item md={9} sm={9} xs={12}></Grid>
                    <Grid item md={3} sm={3} xs={12}>
                      <SubmitButton
                        variant="outlined"
                        onClick={this.updateFilter}
                      >
                        {getString("ja", "common", "filter")}
                      </SubmitButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            {filtered.length === 0 && (
              <Grid item xs={12}>
                <Card variant="outlined">
                  <MessageBlock
                    icon={<DirectionsWalk fontSize="small" color="disabled" />}
                    message={getString("ja", "message", "noSeiyuFiltered")}
                  />
                </Card>
              </Grid>
            )}
            {filtered.length > 0 &&
              filtered.map((seiyu) => {
                return (
                  <Grid item md={12} sm={12}>
                    <SeiyuCard
                      seiyu={seiyu}
                      sampleFilter={this.state.applied.sample}
                    />
                  </Grid>
                );
              })}
            <Grid item xs={12}>
              <Pagination count={10} variant="outlined" shape="rounded" />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    isInitialized: state.data.seiyuData.init,
    seiyuList: state.data.seiyuData.list,
    config: state.data.seiyuData.config,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators({ fetchSeiyuDataAsync }, dispatch);
}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withStyles(styles)(SeiyuSearchPage));

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(SeiyuSearchPage))
);
