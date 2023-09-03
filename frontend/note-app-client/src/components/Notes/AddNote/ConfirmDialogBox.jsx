import styles from "./ConfirmDialogBox.module.css";

const ConfirmDialogBox = ({confirmAction, cancelAction, message, dialogueHeadTitle}) => {
  return (
    <div className={styles.confirm}>
      <h1>{dialogueHeadTitle}</h1>
      <p>
        {message}
      </p>
      <button onClick={cancelAction}>Cancel</button>
      <button onClick={confirmAction}>Confirm</button>
    </div>
  );
};

export default ConfirmDialogBox;
