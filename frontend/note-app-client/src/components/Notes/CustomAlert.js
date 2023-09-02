import React, { useState, useEffect } from "react";
import styles from "./CustomAlert.module.css";

const CustomAlert = ({ message, onDismiss, redOrGreen }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onDismiss]);

  return (
    visible && (
      <div
        className={
          redOrGreen === "red"
            ? `${styles.alertError} ${styles.slideIn}`
            : `${styles.alertSuccess} ${styles.slideIn}`
        }
      >
        <p>{message}</p>
      </div>
    )
  );
};

export default CustomAlert;
