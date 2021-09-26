import { Component } from "react";
import { Route, Switch } from "react-router";
import { useAppDispatch } from "../redux/hooks";
import { logoutAsync, setAuthHeader, setUser } from "../redux/slices/userSlice";
import { apiSetAuthHeader } from "../utils/services/api";
import AuthRoute from "./components/AuthRoute";
import UnAuthRoute from "./components/UnAuthRoute";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import BasicSettingPage from "./pages/auth/setting/BasicSettingPage";
import SampleManPage from "./pages/auth/setting/seiyu/SampleManPage";
import SettingPage from "./pages/auth/setting/SettingPage";
import HomePage from "./pages/home/HomePage";
import SeiyuSearchPage from "./pages/SeiyuSearchPage";
import ManualPage from "./pages/static/ManualPage";
import PrivacyPage from "./pages/static/PrivacyPage";
import TermsPage from "./pages/static/TermsPage";
import jwtDecode from "jwt-decode";
import SeiyuProfilePage from "./pages/SeiyuProfilePage";
import DetailSettingPage from "./pages/auth/setting/DetailSettingPage";
import LoadingBackdrop from "./components/common/LoadingBackdrop";
import AudioPlayer from "./components/common/AudioPlayer";

function AppRouter(props: any) {
  const token = localStorage.getItem("FBaseIdToken");
  const dispatch = useAppDispatch();
  if (token) {
    const decodedToken = jwtDecode(token) as any;
    // console.log(`${decodedToken.exp * 1000} ${Date.now()} ${decodedToken.exp * 1000 < Date.now()}`);
    if (decodedToken.exp * 1000 < Date.now()) {
      dispatch(logoutAsync());
      window.location.href = "/authtimeout";
    } else {
      localStorage.setItem("FBaseIdToken", token);
      apiSetAuthHeader(token);
      dispatch(setUser({ uid: decodedToken.user_id }));
      localStorage.setItem("uid", decodedToken.user_id);
    }
  }

  return (
    <div>
      <LoadingBackdrop />
      <AudioPlayer />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <UnAuthRoute exact path="/register" component={RegisterPage} />
        <UnAuthRoute exact path="/login" component={LoginPage} />
        <Route exact path="/seiyu" component={SeiyuSearchPage} />
        <Route exact path="/seiyu/:uid" component={SeiyuProfilePage} />
        <AuthRoute exact path="/setting" component={SettingPage} />
        <AuthRoute exact path="/setting/basic" component={BasicSettingPage} />
        <AuthRoute exact path="/setting/detail" component={DetailSettingPage} />
        <AuthRoute exact path="/setting/sample" component={SampleManPage} />
        <Route exact path="/about" component={ManualPage} />
        <Route exact path="/manual" component={ManualPage} />
        <Route exact path="/terms" component={TermsPage} />
        <Route exact path="/privacy" component={PrivacyPage} />
      </Switch>
    </div>
  );
}

export default AppRouter;
