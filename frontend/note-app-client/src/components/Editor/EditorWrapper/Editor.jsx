import { $getRoot, $getSelection } from "lexical";
import { useEffect, useState } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import exampleTheme from "./EditorTheme";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import styles from './EditorTheme.module.css'

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus();
  }, [editor]);

  return null;
}

function onError(error) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme: exampleTheme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={styles.editorContainer}>
        <div>
          <PlainTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={<div>Type something here...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
}

export default Editor;
