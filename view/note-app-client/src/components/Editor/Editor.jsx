import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import "./Editor.css";
/**
 * A component that represents an editor.
 * @param {{function}} customOnChange - A custom function to handle the onChange event of the editor.
 * @param {{function}} clearContent - A function to clear the content of the editor.
 * @param {{String}} setEditorContent - A String to set the content of the editor with the provided String.
 * @returns The Editor component.
 */
const Editor = ({ customOnChange, clearContent, setEditorContent }) => {
  const [content, setContent] = useState("");
  const editor = useRef(null);

  // useEffect(() => {
  //   if (clearContent && editor.current) {
  //     editor.current.value = "";
  //   }
  // }, [clearContent]);
  // not entirely sure if i should opt for if instead of useEffect

  if(clearContent){
    editor.current.value="";
  }

  if(setEditorContent){
    editor.current.value=setEditorContent;
  }

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
