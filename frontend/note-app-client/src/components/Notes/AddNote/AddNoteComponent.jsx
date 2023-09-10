import React, { useRef, useState } from "react";
import styles from "./AddNoteComponent.module.css";
import Tag from "./Tags";
import Editor from "../../Editor/Editor";
import CustomAlert from "../utils/CustomAlert";
import NoteService from "../../../Service/NoteService";
import ConfirmDialogBox from "../utils/ConfirmDialogBox";

/**
 * A component that allows users to add a note.
 * @returns The AddNoteComponent.
 */
const AddNoteComponent = () => {

  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("red");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const titleRef = useRef("");
  const tagsRef = useRef([]);
  const contentRef = useRef("");
  const clearEditor = useRef(false);
  const deleteTags = useRef(false);

  const noteData = {
    title: "",
    tags: [],
    content: "",
    date_created: "",
  };

  const handleDismissAlert = () => {
    setAlertMessage(null)
  }

  const onConfirm = () => {
    setShowConfirmDialog(false);
    NoteService.addNote(noteData.title, noteData.tags, noteData.content, noteData.date_created)
    .then((response) => {
      if (response.status !== 201) {
        setAlertMessage("Something went wrong!");
        setAlertColor("red");
      }
    })
    .catch((error) => console.log(error));
    
    setAlertColor("green");
    setAlertMessage("Note Added!");
    titleRef.current.value = "";
    clearEditor.current = true;
    deleteTags.current = true;
    setTimeout(() => {
      deleteTags.current = false;
      noteData.tags.length = 0;
      contentRef.current = "";
      clearEditor.current=false;
    }, 500);
  };

  const onCancel = () => {
    setShowConfirmDialog(false);
  };


  function handleSubmitClick() {

    const title = titleRef.current.value;
    const tags = tagsRef.current;
    const content = contentRef.current;

    const d = new Date();
    const hour = d.getHours();
    const minute = d.getMinutes();

    noteData.title = title;
    noteData.tags = tags;
    noteData.content = content;
    noteData.date_created = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} at ${
      hour > 12 ? hour - 12 + ":" + minute + " pm" : hour + ":" + minute + " am"
    }`;

    if (!title.trim() && !tags.length && !content.trim()) {
      setAlertMessage("All fields are empty!");
      setAlertColor("red");
    } else if (!title.trim() && !tags.length) {
      setAlertMessage("Title and tags cannot be empty!");
      setAlertColor("red");
    } else if (!title.trim() && !content.trim()) {
      setAlertMessage("Title and content cannot be empty!");
      setAlertColor("red");
    } else if (!tags.length && !content.trim()) {
      setAlertMessage("Tags and content cannot be empty!");
      setAlertColor("red");
    } else if (!title.trim()) {
      setAlertMessage("You cannot have an empty title!");
      setAlertColor("red");
    } else if (!tags.length) {
      setAlertMessage("You have to at least set one tag!");
      setAlertColor("red");
    } else if (!content.trim()) {
      setAlertMessage("Content cannot be empty!");
      setAlertColor("red");
    } else {
      setShowConfirmDialog(true);
    }
  }

  return (
    <div className={styles.wrapperContainer}>
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onDismiss={handleDismissAlert}
          redOrGreen={alertColor}
        />
      )}
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
        ref={titleRef}
      />
      <br />
      <label className={styles.label}>Tags:</label>
      <Tag
        onTagChange={(event) => (tagsRef.current = event)}
        clearTags={deleteTags.current}
      />
      {showConfirmDialog && (
        <ConfirmDialogBox confirmAction={onConfirm} cancelAction={onCancel} dialogueHeadTitle={'Submit this?'} />
      )}
      <label htmlFor="contentText" className={styles.label}>
        Note it down
      </label>
      <br />
      <Editor
        customOnChange={(event) => (contentRef.current = event)}
        clearContent={clearEditor.current}
      />
      <div id={styles.wrapper}>
        <div id={styles.submitBtn} onClick={handleSubmitClick}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default AddNoteComponent;
