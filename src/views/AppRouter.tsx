import { Component } from "react";
import { Route, Switch } from "react-router";
import AuthRoute from "./components/AuthRoute";
import UnAuthRoute from "./components/UnAuthRoute";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import BasicSettingPage from "./pages/auth/setting/BasicSettingPage";
import SettingPage from "./pages/auth/setting/SettingPage";
import HomePage from "./pages/home/HomePage";
import SeiyuSearchPage from "./pages/SeiyuSearchPage";
import ManualPage from "./pages/static/ManualPage";
import PrivacyPage from "./pages/static/PrivacyPage";
import TermsPage from "./pages/static/TermsPage";

class AppRouter extends Component<any, any> {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <UnAuthRoute exact path="/register" component={RegisterPage} />
          <UnAuthRoute exact path="/login" component={LoginPage} />
          <Route exact path="/seiyu" component={SeiyuSearchPage} />
          {/* <Route exact path="/seiyu/:uid" component={SeiyuDetailPage} /> */}
          <AuthRoute exact path="/setting" component={SettingPage} />
          <AuthRoute exact path="/setting/basic" component={BasicSettingPage} />
          <AuthRoute exact path="/setting/detail" component={SettingPage} />
          <AuthRoute exact path="/setting/sample" component={SettingPage} />
          <Route exact path="/about" component={ManualPage} />
          <Route exact path="/manual" component={ManualPage} />
          <Route exact path="/terms" component={TermsPage} />
          <Route exact path="/privacy" component={PrivacyPage} />
        </Switch>
      </div>
    );
  }
}

export default AppRouter;
