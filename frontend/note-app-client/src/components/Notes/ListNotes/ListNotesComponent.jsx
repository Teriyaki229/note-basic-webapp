import React, { useEffect, useState } from "react";
import "./ListNotesComponent.css";
import NoteService from "../../../Service/NoteService";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import NoteOptions from "../NoteOptions/NoteOptions";
import ConfirmDialogBox from "../utils/ConfirmDialogBox";

/**
 * A functional component that renders a list of notes.
 * @returns The rendered list of notes.
 */
const ListNotesComponent = () => {
  const [note, setNote] = useState({
    notes: [],
  });

  const [hoveredNoteId, setHoveredNoteId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [linkClickableMap, setLinkClickableMap] = useState({});

  useEffect(() => {
    NoteService.getNotes()
      .then((response) => {
        // console.log(response);
        setNote({
          notes: response.data,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  function sanitizeHtmlAndStripHtmlTags(htmlString) {
    const sanitizedHtml = DOMPurify.sanitize(htmlString, {
      USE_PROFILES: { html: true },
    });
    const plainText = sanitizedHtml.replace(/(<([^>]+)>)/gi, "");
    return plainText;
  }

  const handleNoteDelete = () => {
    setShowConfirmDialog(true);
  };

  const handleNoteEdit = () => {
    setShowConfirmDialog(true);
  };

  return (
    <div className="homepage">
      <h1 className="text-center-homepage">Your Notes</h1>
      <Link to={`/add`}>
        <div className="create-new-note-btn">Create a new note</div>
      </Link>
      <div className="note-container">
        {showConfirmDialog && (
          <ConfirmDialogBox
            dialogueHeadTitle={"Are you sure you want to delete this?"}
            message={"You cannot recover the note once you delete it!"}
          />
        )}
        {note.notes &&
          note.notes.map((note) => (
            <div
              onMouseEnter={() => setHoveredNoteId(note.visibleId)}
              onMouseLeave={() => setHoveredNoteId(null)}
            >{
              <Link to={`/view/${note.visibleId}`} className="note-preview">
                <div key={note.visibleId}>
                  <h3 className="preview-title">{note.title}</h3>
                  {hoveredNoteId === note.visibleId && (
                    <NoteOptions
                      onDelete={handleNoteDelete}
                      onEdit={handleNoteEdit}
                      onMouseEnter={() => {
                        setLinkClickableMap(false);
                      }}
                      onMouseLeave={() => {
                        setLinkClickableMap(true);
                      }}
                    />
                  )}
                  <p className="preview-content">
                    {note.content && sanitizeHtmlAndStripHtmlTags(note.content)}
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
