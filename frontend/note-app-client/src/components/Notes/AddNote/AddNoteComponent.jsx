import React, { useRef, useState } from "react";
import styles from "./AddNoteComponent.module.css";
import Tag from "./Tags";
import Editor from "../../Editor/Editor";
import CustomAlert from "../CustomAlert";
import NoteService from "../../../Service/NoteService";


const AddNoteComponent = () => {
  const handleDismissAlert = () => {
    setAlertMessage("");
  };
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("red");
  
  const titleRef = useRef("");
  const tagsRef = useRef([]);
  const contentRef = useRef("")

  function handleSubmitClick() {
    const title = titleRef.current.value;
    const tags = tagsRef.current;
    const content = contentRef.current;
    
    const d = new Date();
    const hour = d.getHours();
    const minute = d.getMinutes();
    const date_created = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} at ${hour > 12 ? hour-12+":"+ minute+" pm" : hour+":"+ minute+" am"}`;
    if (!title.trim() && !tags.length && !content.trim()) {
      setAlertMessage("All fields are empty!");
    } else if (!title.trim() && !tags.length) {
      setAlertMessage("Title and tags cannot be empty!");
    } else if (!title.trim() && !content.trim()) {
      setAlertMessage("Title and content cannot be empty!");
    } else if (!tags.length && !content.trim()) {
      setAlertMessage("Tags and content cannot be empty!");
    } else if (!title.trim()) {
      setAlertMessage("You cannot have an empty title!");
    } else if (!tags.length) {
      setAlertMessage("You have to at least set one tag!");
    } else if (!content.trim()) {
      setAlertMessage("Content cannot be empty!");
    } else {
      NoteService.addNote(title, tags, content, date_created)
        .then((response)=> {
          if(response.status===201){
            setAlertColor("green");
            setAlertMessage("Note Added!");
            titleRef.current.value="";
            // editorContentRef.current="";
            // tagsRef.current=[];
          }
          else{
            setAlertColor("red")
            setAlertMessage("Something went wrong!")
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className={styles.wrapperContainer}>
      {alertMessage && (
        <CustomAlert message={alertMessage} onDismiss={handleDismissAlert} redOrGreen={alertColor} />
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
      <Tag onTagChange={(event) => (tagsRef.current = event)} />
      <label htmlFor="contentText" className={styles.label}>
        Note it down
      </label>
      <br />
      <Editor customOnChange={(event) => (contentRef.current = event)}/>
      <div id={styles.wrapper}>
        <div id={styles.submitBtn} onClick={handleSubmitClick}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default AddNoteComponent;
