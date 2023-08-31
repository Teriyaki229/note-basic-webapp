import React, { Component, useRef, useState } from "react";
import styles from "./AddNoteComponent.module.css";
import Tag from "./Tags";
import Editor from "./Editor";

function handleSubmitClick() {}

function useFieldOnChange(event, id) {
  const noteRef = useRef({
    title: "",
    tags: [],
    content: "",
  });
  noteRef.current({
    [id]: id==="titleInput" ? event.target.value : event,
  })
  console.log(noteRef.current)
}

class AddNoteComponent extends Component {
  render() {
    return (
      <div className={styles.wrapperContainer}>
        <h2>What's on Your Mind Today?</h2>
        <br />
        <label htmlFor="titleInput" className={styles.label}>
          Title
        </label>
        <br />
        <input
          className={styles.inputField}
          type="text"
          id="titleInput"
          name="titleInput"
          placeholder="Type a title here"
          onChange={(event) => useFieldOnChange(event, "titleInput")}
        />
        <br />
        <label className={styles.label}>Tags:</label>
        <Tag onTagChange={(event) => useFieldOnChange(event, "tags")} />
        <label htmlFor="contentText" className={styles.label}>
          Note it down
        </label>
        <br />
        <Editor customOnChange={(event) => useFieldOnChange(event, "editor")} />
        <div id={styles.wrapper}>
          <div id={styles.submitBtn} onClick={handleSubmitClick}>
            Submit
          </div>
        </div>
      </div>
    );
  }
}

export default AddNoteComponent;
