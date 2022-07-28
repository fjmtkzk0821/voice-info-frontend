import JoditEditor from 'jodit-react';
import 'jodit/build/jodit.min.css';
import { useRef } from "react";

const config = {
  minHeight: 200,
  readonly: false,
  toolbarButtonSize: "middle",
  saveModeInCookie: false,
  saveModeInStorage: false,
  showCharsCounter: false,
  showWordsCounter: false,
  width: "auto",
  height: "550",
  toolbar: true,
  uploader: {
    insertImageAsBase64URI: true,
  },
  spellcheck: false,
  enter: "div",
  buttons:
    "source,bold,italic,underline,strikethrough,ul,ol,indent,outdent,left,font,fontsize,paragraph,brush,image,hr,table,link,symbol,about".split(
      ","
    ),
  disablePlugins:
    "video,file,select-cells,resize-cells,search,mobile,drag-and-drop-element,drag-and-drop,fullsize,copy-format,sticky,print,preview,error-messages,iframe,inline-popup,table-keyboard-navigation,tooltip,media",
  askBeforePasteHTML: true,
};

type IProps = {
  editorRef: any,
  initialValue: string,
  onChange: Function
}

function DefaultEditor({ editorRef, initialValue, onChange }: IProps) {
  return <JoditEditor ref={editorRef} value={initialValue} config={config} onBlur={content => onChange(content)} />
}

export default DefaultEditor