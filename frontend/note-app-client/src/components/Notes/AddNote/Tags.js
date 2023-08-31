import { useState } from "react";
import styles from "./AddNoteComponent.module.css";
import CustomAlert from '../CustomAlert';

const Tag = ({ onTagChange }) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [deletable, setDeletable] = useState({});
  const [alertMessage, setAlertMessage] = useState('');

  const handleTagInput = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && tagInput.length < 30) {
      if (!tags.includes(tagInput)) {
        if (tags.length !== 16) {
          setTags([...tags, tagInput]);
          setTagInput('');
          onTagChange([...tags, tagInput]);
        } else {
          setAlertMessage("You will not set more than 16 tags!");
        }
      } else {
        setAlertMessage("You've already used this tag!");
      }
    } else {
      setAlertMessage("Tag must not be empty and should be 30 characters or less.");
    }
  };

  const toggleDeletable = (tag) => {
    setDeletable((prevDeletable) => ({
      ...prevDeletable,
      [tag]: !prevDeletable[tag],
    }));
  };

  const handleTagRemover = () => {
    const filteredTags = tags.filter((tag) => !deletable[tag]);
    setTags(filteredTags);
    onTagChange(filteredTags);
    setDeletable((prevDeletable) => {
      const updatedDeletable = { ...prevDeletable };
      for (const tag of tags) {
        if (deletable[tag]) {
          delete updatedDeletable[tag];
        }
      }
      return updatedDeletable;
    });
  };

  const handleTooltipHover = () => {
    const tooltip = document.querySelector(`.${styles.tooltip}`);
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
  };

  const handleTooltipLeave = () => {
    const tooltip = document.querySelector(`.${styles.tooltip}`);
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  };

  const handleDismissAlert = ()=>{
    setAlertMessage('');
  }

  return (
    <div>
      {alertMessage && <CustomAlert message={alertMessage} onDismiss={handleDismissAlert} />}
      {tags.map((tag) => (
        <span
          key={tag}
          className={`${styles.tag} ${deletable[tag] ? styles.deletable : ""}`}
          onClick={() => toggleDeletable(tag)}
        >
          {tag}
        </span>
      ))}
      <input
        className={styles.tagInput}
        type="text"
        placeholder="Press enter to add a tag"
        value={tagInput}
        onChange={handleTagInput}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleAddTag();
          }
        }}
      />
      <div className={styles.tooltipContainer}>
        <button className={styles.removeTagButton} onClick={handleTagRemover}>
          Remove Tag
        </button>
        <div
          className={styles.tooltip}
        >
          <span>
            Click on a tag then press the remove tag button to remove it
          </span>
        </div>
        <div className={styles.questionMark}
        onMouseEnter={handleTooltipHover}
        onMouseLeave={handleTooltipLeave}>
          <span>&nbsp; &#63; &nbsp;</span>
        </div>
      </div>
    </div>
  );
};

export default Tag;