import { Button, Grid, Stack } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import DefaultCardContent from "../../components/DefaultCardContent";
import DefaultSection from "../../components/DefaultSection";
import PageHeader from "../../components/PageHeader";
import { setLoading, dismissLoading } from "../../features/loadingBackdropSlice";
import { dismissMessage, setMessage } from "../../features/messageSlice";
import { loadUserData } from "../../features/user/authSlice";
import authService from '../../services/auth';
import { scroll2Top } from "../../utils/common";
import BaseMessage, { BaseMessageType } from "../../utils/objects/BaseMessage";
import UserDocument from "../../utils/objects/user";
import PasswordIcon from '@mui/icons-material/Password';
import InformationSection from "../Home/sections/InformationSection";
import { useNavigate } from "react-router-dom";
import { cleanAuthHeader } from "../../services/api";
import { getString } from "../../utils/localization";

function AccountSetting() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    async function onload() {
        dispatch(setLoading());
        try {
        const { data } = await authService.getAccountSetting();
        dispatch(loadUserData(UserDocument.fromObject(data.user).toObject()));
        } catch (err) {
        if (axios.isAxiosError(err)) {
            const { code, message } = err.response?.data;
            if(code === "auth/id-token-expired") {
              cleanAuthHeader();
              navigate("/");
            }
            dispatch(
            setMessage(
                new BaseMessage(code, message, BaseMessageType.ERROR).toObject()
            )
            );
        }
        }
        dispatch(dismissLoading());
    }

    useEffect(() => {
        scroll2Top();
        dispatch(dismissMessage());
        onload();
    }, [])

    return (
      <Grid
        item
        container
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={12}>
          <PageHeader label={getString("link", "accountSetting")} />
        </Grid>
        {/* <Grid item xs={12}>
          <InformationSection />
        </Grid> */}
        <Grid item xs={12}>
          <DefaultSection icon={<PasswordIcon />} label={"Comming soon."}>
            {/* <DefaultCardContent>
              <Button
                variant="contained"
                size="large"
                disableElevation
                fullWidth
                sx={{
                  my: 1,
                }}
              >
                Goto change password page
              </Button>
            </DefaultCardContent> */}
          </DefaultSection>
        </Grid>
      </Grid>
    );
}

export default AccountSetting;