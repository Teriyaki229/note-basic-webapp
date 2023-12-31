import { useParams } from "react-router-dom";
import Editor from "../../Editor/Editor";
import { useEffect, useRef, useState } from "react";
import NoteService from "../../../Service/NoteService";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import styles from "../AddNote/AddNoteComponent.module.css";
import CustomAlert from "../utils/CustomAlert";
import Tag from "../AddNote/Tags";
import ConfirmDialogBox from "../utils/ConfirmDialogBox";

const EditNoteComponent = () => {
  const { id } = useParams();
  // const [note, setNote] = useState({});

  const titleRef = useRef("");
  const tagsRef = useRef([]);
  const contentRef = useRef("");

  const [noteData, setNoteData] = useState({
    title: "",
    tags: [],
    content: "",
    date_created: "",
  });

  useEffect(() => {
    NoteService.getNoteById(id)
      .then((response) => {
        setNoteData(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    tagsRef.current = noteData.tags;
    contentRef.current = noteData.content;
    // titleRef.current = noteData.title;
    console.log(
      "TagsRef on mount:",
      tagsRef.current,
      "contentRef on mount:",
      contentRef.current,
      "titleRef on mount:",
      titleRef.current.value,
      "note on mount: ",
      noteData
    );
  }, [noteData.tags, noteData.content, noteData.title]);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("red");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDismissAlert = () => {
    setAlertMessage(null);
  };

  const handleSubmitClick = () => {
    console.log('titleRef.current', titleRef.current.value)
    const title = titleRef.current.value;
    const tags = tagsRef.current;
    const content = contentRef.current;

    const d = new Date();
    const hour = d.getHours();
    const minute = d.getMinutes();

    // noteData.tags = tags;
    // noteData.content = content;
    // noteData.date_created = ;

    console.log(
      "noteData.title:",
      noteData.title,
      "noteData.tags:",
      noteData.tags,
      "noteData.content:",
      noteData.content,
      "noteData.date_created:",
      noteData.date_created
    );

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
      console.log("title:", title, "tags:", tags, "content:", content);

      setNoteData({
        title: title,
        tags: tags,
        content: content,
        date_created: `${d.getDate()}/${
          d.getMonth() + 1
        }/${d.getFullYear()} at ${
          hour > 12
            ? hour - 12 + ":" + minute + " pm"
            : hour + ":" + minute + " am"
        }`,
      });
    }
  };

  const onConfirm = () => {
    setShowConfirmDialog(false);

    console.log(
      "titleRef",
      titleRef.current,
      "contentRef",
      contentRef.current,
      "tagsRef",
      tagsRef.current,
      "title:",
      noteData.title,
      "tags:",
      noteData.tags,
      "content:",
      noteData.content,
      "date_created:",
      noteData.date_created
    );

    NoteService.editNotebyId(
      id,
      noteData.title,
      noteData.tags,
      noteData.content,
      noteData.date_created
    )
      .then((response) => {
        if (response.status !== 201) {
          setAlertMessage("Something went wrong!");
          setAlertColor("red");
        }
      })
      .catch((error) => console.log(error));

    setAlertColor("green");
    setAlertMessage("Note Added!");
  };

  const onCancel = () => {
    setShowConfirmDialog(false);
  };

  const htmlFrom = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString, {
      USE_PROFILES: { html: true },
    });
    return parse(cleanHtmlString);
  };

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
        defaultValue={noteData.title}
      />
      <br />
      <label className={styles.label}>Tags:</label>
      <Tag
        setPreviousTags={noteData.tags}
        onTagChange={(event) => (tagsRef.current = event)}
      />
      {showConfirmDialog && (
        <ConfirmDialogBox
          confirmAction={onConfirm}
          cancelAction={onCancel}
          dialogueHeadTitle={"Submit this?"}
        />
      )}
      <label htmlFor="contentText" className={styles.label}>
        Note it down
      </label>
      <br />
      <Editor
        setEditorContent={noteData.content}
        customOnChange={(event) => (contentRef.current = event)}
      />
      <div id={styles.wrapper}>
        <div id={styles.submitBtn} onClick={handleSubmitClick}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default EditNoteComponent;
