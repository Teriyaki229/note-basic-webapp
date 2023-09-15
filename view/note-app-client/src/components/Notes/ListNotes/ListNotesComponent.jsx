import React, { useEffect, useState } from "react";
import "./ListNotesComponent.css";
import NoteService from "../../../Service/NoteService";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import NoteOptions from "../NoteOptions/NoteOptions";
import ConfirmDialogBox from "../utils/ConfirmDialogBox";
import CustomAlert from "../utils/CustomAlert";

/**
 * A functional component that renders a list of notes.
 * @returns The rendered list of notes.
 */
const ListNotesComponent = () => {
  const [note, setNote] = useState({
    notes: [],
  });

  const [hoveredNoteId, setHoveredNoteId] = useState(null);
  const [dialogProps, setDialogProps] = useState(null);
  const [alertColor, setAlertColor] = useState("green");
  const [alertMessage, setAlertMessage] = useState(null);

  const handleDismissAlert = () => {
    setAlertMessage(null)
  }

  useEffect(() => {
    NoteService.getNotes()
      .then((response) => {
        // console.log(response);
        setNote({
          notes: response.data,
        });
      })
      .catch((error) => console.log(error));
  }, [note]);

  function sanitizeHtmlAndStripHtmlTags(htmlString) {
    const sanitizedHtml = DOMPurify.sanitize(htmlString, {
      USE_PROFILES: { html: true },
    });
    const plainText = sanitizedHtml.replace(/(<([^>]+)>)/gi, "");
    return plainText;
  }

  const handleNoteDelete = (e) => {
    e.preventDefault();
    const deleteNote = () => {
      console.log('Deleting note with id', hoveredNoteId);
      NoteService.deleteNotebyId(hoveredNoteId)
        .then((response) => {
          if (response.status === 200) {
            setAlertMessage("Note deleted!");
            setAlertColor("green");
          }
        })
        .catch((error) => console.log(error));
    };

    setDialogProps({
      dialogueHeadTitle: "Delete Note",
      message: "Are you sure you want to delete this note?",
      confirmAction: () => {
        deleteNote();
        setDialogProps(null);
      },
      cancelAction: () => {
        setDialogProps(null);
      },
    });
  };

  const handleNoteEdit = (e) => {
    e.preventDefault();
    const editNote = () => {
      window.location.href = `/edit/${hoveredNoteId}`
      // console.log(hoveredNoteId);
    };

    setDialogProps({
      dialogueHeadTitle: "Edit Note",
      message: "",
      confirmAction: () => {
        editNote();
        setDialogProps(null);
      },
      cancelAction: () => {
        setDialogProps(null);
      },
    });
  };

  return (
    <div className="homepage">
      <h1 className="text-center-homepage">Your Notes</h1>
      <Link to={`/add`}>
        <div className="create-new-note-btn">Create a new note</div>
      </Link>
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onDismiss={handleDismissAlert}
          redOrGreen={alertColor}
        />
      )}
      <div className="note-container">
        {dialogProps && (
          <ConfirmDialogBox
            dialogueHeadTitle={dialogProps.dialogueHeadTitle}
            message={dialogProps.message}
            confirmAction={dialogProps.confirmAction}
            cancelAction={dialogProps.cancelAction}
          />
        )}
        {note.notes &&
          note.notes.map((note) => (
            <div
              onMouseEnter={() => setHoveredNoteId(note.visibleId)}
              onMouseLeave={() => setHoveredNoteId(null)}
            >
              {
                <Link to={`/view/${note.visibleId}`} className="note-preview">
                  <div key={note.visibleId}>
                    <h3 className="preview-title">{note.title}</h3>
                    {hoveredNoteId === note.visibleId && (
                      <NoteOptions
                        onDelete={(event) => handleNoteDelete(event)}
                        onEdit={(event) => handleNoteEdit(event)}
                      />
                    )}
                    <p className="preview-content">
                      {note.content &&
                        sanitizeHtmlAndStripHtmlTags(note.content)}
                    </p>
                  </div>
                </Link>
              }
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListNotesComponent;
