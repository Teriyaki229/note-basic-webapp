import React, { useState, useEffect } from "react";
import styles from "./CustomAlert.module.css";

/**
 * A custom alert component that displays a message for a certain duration and then dismisses itself.
 * @param {object} props - The props for the CustomAlert component.
 * @param {string} props.message - The message to display in the alert.
 * @param {function} props.onDismiss - The function to call when the alert is dismissed.
 * @param {string} props.redOrGreen - Determines the color of the alert. Can be "red" or "green".
 * @returns The CustomAlert component.
 */
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
