import JoditEditor from "jodit-react";
import { useRef, useState, useEffect } from "react";
import "./Editor.css";
const Editor = ({ customOnChange, clearContent }) => {
  const [content, setContent] = useState("");
  const editor = useRef(null);

  useEffect(() => {
    if (clearContent && editor.current) {
      editor.current.value = "";
    }
  }, [clearContent]);

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={{ theme: "dark" }}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {
          customOnChange && customOnChange(newContent);
        }}
      />
    </div>
  );
};

export default Editor;
