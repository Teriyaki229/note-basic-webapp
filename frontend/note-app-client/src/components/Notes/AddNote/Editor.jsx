import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import "./Editor.css";
const Editor = ({customOnChange}) => {
  const [content, setContent] = useState("");
  const editor = useRef(null);

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
