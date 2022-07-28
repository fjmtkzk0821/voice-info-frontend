import {
  Box,
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EditorModal from "../../../components/EditorModal";
import HTMLEditBlock from "../../../components/form/HTMLEditBlock";
import {
  setLoading,
  dismissLoading,
} from "../../../features/loadingBackdropSlice";
import { dismissMessage, setMessage } from "../../../features/messageSlice";
import BaseMessage, {
  BaseMessageType,
} from "../../../utils/objects/BaseMessage";
import { FormRow, FormRowDivider } from "../components/FormGridComponents";
import SettingSection from "./components/SettingSection";
import authService from "../../../services/auth";
import { useAppDispatch } from "../../../app/hooks";
import { SeiyuDetailDocument } from "../../../utils/objects/seiyu";
import { openInNewTab, scroll2Top } from "../../../utils/common";
import { cleanAuthHeader } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { getString } from "../../../utils/localization";

function SeiyuProfileEdit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(new SeiyuDetailDocument().toObject());
  // const [equip, setEquip] = useState("");
  const [editorState, setEditorState] = useState({
    value: "",
    open: false,
    selected: "",
  });

  useEffect(() => {
    scroll2Top();
    dispatch(dismissMessage());
    onLoad();
  }, []);

  const handleChange = (key: string, value: any) => {
    setDoc({
      ...doc,
      [key]: value,
    });
  };

  async function onLoad() {
    dispatch(setLoading());
    try {
      const { data } = await authService.getSeiyuProfile();
      setDoc(data.detail);
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

  async function onUpdate() {
    dispatch(setLoading());
    dispatch(dismissMessage());
    try {
      const { code, message, data } = await authService.seiyuDetailUpdate(doc);
      // console.log(data);
      dispatch(setMessage(new BaseMessage(code, message).toObject()));
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
    scroll2Top();
    dispatch(dismissLoading());
  }

  function onSelectedFieldUpdate(value: string) {
    if (editorState.selected.length > 0) {
      if (["reception", "exp"].includes(editorState.selected))
        handleChange(editorState.selected, {
          ...(doc as any)[editorState.selected],
          content: value,
        });
      else handleChange(editorState.selected, value);
      closeEditor();
    }
  }

  function openEditor(field: string, value: string) {
    setEditorState({
      value: value,
      selected: field,
      open: true,
    });
  }

  function closeEditor() {
    setEditorState({
      value: "",
      open: false,
      selected: "",
    });
  }

  return (
    <React.Fragment>
      <EditorModal
        title={getString("profileDetail", editorState.selected)}
        initialValue={editorState.value}
        open={editorState.open}
        onUpdate={onSelectedFieldUpdate}
        onClose={closeEditor}
      />
      <Stack spacing={2}>
        <SettingSection header={getString("profile", "voiceinfo")}>
          <FormRow label={getString("profileDetail", "equip")}>
            <HTMLEditBlock
              defaultValue={doc.equip}
              onClick={() => openEditor("equip", doc.equip)}
            />
          </FormRow>
        </SettingSection>
        <SettingSection header={getString("profileDetail", "reception")}>
          <FormRow label={getString("profileDetail", "receptionDetail")}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  flex: "1 auto",
                  mr: 1,
                }}
              >
                {doc.reception.type === "txt" ? (
                  <HTMLEditBlock
                    defaultValue={doc.reception.content}
                    onClick={() =>
                      openEditor("reception", doc.reception.content)
                    }
                  />
                ) : (
                  <Stack>
                    <TextField
                      size="small"
                      value={doc.reception.content}
                      fullWidth
                      onChange={(event) =>
                        handleChange("reception", {
                          type: doc.reception.type,
                          content: event.target.value,
                        })
                      }
                    />
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        openInNewTab(
                          "https://twitter.com/VOICEINFO_staff/status/1509714023222505478"
                        );
                      }}
                      disableElevation
                    >
                      使用方法
                    </Button>
                  </Stack>
                )}
              </Box>
              <ToggleButtonGroup
                orientation="vertical"
                value={doc.reception.type}
                onChange={(_, value) => {
                  // console.log(value);
                  handleChange("reception", { ...doc.reception, type: value });
                }}
                exclusive
              >
                <ToggleButton value="txt">text</ToggleButton>
                <ToggleButton value="tweet">tweet</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </FormRow>
          <FormRowDivider />
          <FormRow label={getString("profileDetail", "precaution")}>
            <HTMLEditBlock
              defaultValue={doc.precaution}
              onClick={() => openEditor("precaution", doc.precaution)}
            />
          </FormRow>
          <FormRowDivider />
          <FormRow label={getString("profileDetail", "fee")}>
            <HTMLEditBlock
              defaultValue={doc.fee}
              onClick={() => openEditor("fee", doc.fee)}
            />
          </FormRow>
        </SettingSection>
        <SettingSection header={getString("profileDetail", "other")}>
          <FormRow label={getString("profileDetail", "exp")}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  flex: "1 auto",
                  mr: 1,
                }}
              >
                {doc.exp.type === "txt" ? (
                  <HTMLEditBlock
                    defaultValue={doc.exp.content}
                    onClick={() => openEditor("exp", doc.exp.content)}
                  />
                ) : (
                  <Stack>
                    <TextField
                      size="small"
                      fullWidth
                      value={doc.exp.content}
                      onChange={(event) => {
                        handleChange("exp", {
                          type: doc.exp.type,
                          content: event.target.value,
                        });
                      }}
                    />
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        openInNewTab(
                          "https://www.dlsite.com/maniax/blogparts/edit/=/parts/vertical_03"
                        );
                      }}
                      disableElevation
                    >
                      DLsiteへ
                    </Button>
                    <Typography component="p" variant="caption">
                      HTMLコードをここに貼ってください。
                    </Typography>
                  </Stack>
                )}
              </Box>
              <ToggleButtonGroup
                orientation="vertical"
                value={doc.exp.type}
                onChange={(_, value) => {
                  // console.log(value);
                  handleChange("exp", { ...doc.exp, type: value });
                }}
                exclusive
              >
                <ToggleButton value="txt">text</ToggleButton>
                <ToggleButton value="dlsite">dlsite</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </FormRow>
          <FormRowDivider />
          <FormRow label={getString("profileDetail", "other")}>
            <HTMLEditBlock
              defaultValue={doc.other}
              onClick={() => openEditor("other", doc.other)}
            />
          </FormRow>
        </SettingSection>
        <Button onClick={onUpdate} variant="contained" size="large" fullWidth>
          {getString("common", "save")}
        </Button>
      </Stack>
    </React.Fragment>
  );
}

export default SeiyuProfileEdit;
