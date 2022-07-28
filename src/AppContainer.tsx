import jwtDecode, { JwtPayload } from "jwt-decode";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { setInitialized } from "./features/public/coreSlice";
import { loadUserData } from "./features/user/authSlice";
import DefaultLayout from "./layouts/DefaultLayout";
import SettingLayout from "./layouts/SettingLayout";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import SignUpFinish from "./pages/authentication/SignUpFinish";
import Home from "./pages/Home";
import InformationNews from "./pages/InformationNews";
import Nothing from "./pages/Nothing";
import PrivacyPolicy from "./pages/other/PrivacyPolicy";
import TermsOfUse from "./pages/other/TermsOfUse";
import AccountSetting from "./pages/setting/AccountSetting";
import SeiyuInfoEdit from "./pages/setting/seiyu/InfoEdit";
import SeiyuLinkEdit from "./pages/setting/seiyu/LinkEdit";
import SeiyuProfileEdit from "./pages/setting/seiyu/ProfileEdit";
import SeiyuRegister from "./pages/setting/seiyu/register";
import SeiyuSampleEdit from "./pages/setting/seiyu/SampleEdit";
import VocalProfile from "./pages/VocalProfile";
import VocalSearch from "./pages/VocalSearch";
import { setAuthHeader } from "./services/api";

function AppContainer() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if(accessToken) {
          const decoded = jwtDecode<any>(accessToken);
          // console.log(decoded);
          if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("accessToken");
            window.location.href = "/";
          } else {
              setAuthHeader(accessToken);
              dispatch(loadUserData({
                  accessToken: accessToken,
                  uid: decoded.user_id,
                  email: decoded.email
              }));
          }
        }
        dispatch(setInitialized(true));
    }, []);

    return (
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="news/:uid" element={<InformationNews />}/>
              <Route path="auth">
                <Route path="signin" element={<SignIn />} />
                <Route path="signup">
                  <Route index element={<SignUp />} />
                  <Route path="complete" element={<SignUpFinish />}/>
                </Route>
                <Route path="forgot" element={<ForgotPassword />} />
              </Route>
              <Route path="seiyu">
                <Route index element={<VocalSearch />} />
                <Route path=":uid" element={<VocalProfile />} />
              </Route>
              <Route path="setting" element={<SettingLayout />}>
                <Route path="account" element={<AccountSetting />} />
                <Route path="seiyu">
                  <Route path="register" element={<SeiyuRegister />} />
                  <Route path="edit" element={<SeiyuInfoEdit />} />
                  <Route path="profile" element={<SeiyuProfileEdit />} />
                  <Route path="sample" element={<SeiyuSampleEdit />} />
                  <Route path="link" element={<SeiyuLinkEdit />} />
                </Route>
              </Route>
              <Route path="static">
                <Route path="privacy" element={<PrivacyPolicy />}/>
                <Route path="termsOfUse" element={<TermsOfUse />}/>
              </Route>
            </Route>
            <Route path="*" element={<Nothing />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    );
}

export default AppContainer;
