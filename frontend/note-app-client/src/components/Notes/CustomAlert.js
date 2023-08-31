import React, { useState, useEffect } from "react";
import styles from "./CustomAlert.module.css";

const CustomAlert = ({ message, onDismiss }) => {
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
      <div className={`${styles.alert} ${styles.slideIn}`}>
        <p>{message}</p>
      </div>
    )
  );
};

export default CustomAlert;
