import React, { Component } from "react";
import Editor from "../../Editor/EditorWrapper/Editor";

class AddNoteComponent extends Component {
  render() {
    return (
      <div>
        <Editor />
        <div className="create-new-note-btn">Submit</div>
      </div>
    );
  }
}

export default AddNoteComponent;
