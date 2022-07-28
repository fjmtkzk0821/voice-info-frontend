import { Backdrop, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import DefaultEditor from "./DefaultEditor";
import { useEffect, useRef, useState } from "react";
import { getString } from "../utils/localization";

type IProps = {
  title: string,
  initialValue: string,
  open: boolean,
  onUpdate?: Function,
  onClose: Function
}

function EditorModal({title, initialValue, open, onUpdate, onClose}: IProps) {
    const [content, setContent] = useState(initialValue);
    const editorRef = useRef<any>(undefined);

    useEffect(() => {
      setContent(initialValue);
    }, [initialValue]);

    return (
      <Backdrop
        open={open}
        sx={{
          zIndex: 999,
        }}
      >
        <Card sx={{
          maxWidth: "80%",
          maxHeight: "90%",
          overflow: "auto"
        }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              py: 1,
              px: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{
                flex: "1 0 auto",
              }}
            >
              {getString("common", "edit")}: {title}
            </Typography>
            <IconButton onClick={() => onClose()}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent dividers>
            <DefaultEditor
              editorRef={editorRef}
              initialValue={content}
              onChange={setContent}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                if (onUpdate !== undefined) onUpdate(content);
                setContent("");
              }}
            >
              update
            </Button>
          </DialogActions>
        </Card>
      </Backdrop>
    );
}

export default EditorModal