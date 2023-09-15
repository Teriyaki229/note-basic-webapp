import styles from "./ConfirmDialogBox.module.css";

/**
 * A reusable component that displays a confirmation dialog box.
 * @param {{Function}} confirmAction - The function to be executed when the user confirms the action.
 * @param {{Function}} cancelAction - The function to be executed when the user cancels the action.
 * @param {{string}} message - The message to be displayed in the dialog box.
 * @param {{string}} dialogueHeadTitle - The title of the dialog box.
 * @returns The confirmation dialog box component.
 */
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
