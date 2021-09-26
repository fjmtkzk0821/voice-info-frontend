import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { IJodit, Jodit } from "jodit";
// import 'jodit/build/jodit.min.css';

const config: IJodit["options"] = {
  ...Jodit.defaultOptions,
  //   minHeight: 200,
  readonly: false,
  toolbarButtonSize: "middle",
  tabIndex: 1,
  toolbar: true,
  // //   saveModeInCookie: false,
  //   saveModeInStorage: false,
  //   showCharsCounter: false,
  //   showWordsCounter: false,
  //   width: "auto",
  //   height: "auto",
  //   toolbar: true,
  //   uploader: {
  //     insertImageAsBase64URI: false,
  //   },
  spellcheck: false,
  enter: "div",
  buttons:
    "source,bold,italic,underline,strikethrough,ul,ol,indent,outdent,left,font,fontsize,paragraph,brush,image,hr,table,link,symbol,about".split(
      ","
    ),
  disablePlugins:
    "video,file,select-cells,resize-cells,search,mobile,drag-and-drop-element,drag-and-drop,fullsize,copy-format,sticky,print,preview,error-messages,iframe,inline-popup,table-keyboard-navigation,tooltip,media",
  //   askBeforePasteHTML: true,
};

export default function DefaultEditor(props: any) {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  //   if (!CommonTools.isStringNullOrEmpty(props.value)) setContent(props.content);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onBlur={(newContent) => {
        setContent(newContent);
        props.onChange(newContent);
      }}
      //   tabIndex={1}
      //   onBlur={(event) => {
      //     // event.preventDefault();
      //     // event.stopPropagation();
      //     // let value = event.target.innerHTML;
      //     // setContent(editor.current.value);
      //     // props.onChange(editor.current.value);
      //   }}
      onChange={(content) => {
        // props.onChange(content);
        //   if(editor && editor.current)
        //     editor.current.value = c;
      }}
    />
  );
}
