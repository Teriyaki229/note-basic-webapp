import styles from "./NoteOptions.module.css";

const NoteOptions = ({onDelete, onEdit}) => {
  return (
    <div>
      <div className={styles.iconTrash}>
      <div className={styles.trashLid} style={{backgroundColor: '#E5E9EA'}}></div>
        <div className={styles.trashContainer} style={{backgroundColor: '#E5E9EA'}}></div>
        <div className={styles.trashLine1}></div>
        <div className={styles.trashLine2}></div>
        <div className={styles.trashLine3}></div>
      </div>
      <div className={styles.pencilWrapper}>
      <div className={styles.pencil} style={{backgroundColor: '#E5E9EA'}}></div>
      </div>
    </div>
  );
};

export default NoteOptions;
