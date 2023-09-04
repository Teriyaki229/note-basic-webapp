import React, { useEffect, useState } from "react";
import "./ListNotesComponent.css";
import NoteService from "../../../Service/NoteService";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import NoteOptions from "../NoteOptions/NoteOptions";

/**
 * A functional component that renders a list of notes.
 * @returns The rendered list of notes.
 */
const ListNotesComponent = () => {
  const [note, setNote] = useState({
    notes: [],
  });

  const [showOptions, setShowOptions] = useState(false);

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

  return (
    <div className="homepage">
      <h1 className="text-center-homepage">Your Notes</h1>
      <Link to={`/add`}>
        <div className="create-new-note-btn">Create a new note</div>
      </Link>
      <div className="note-container" onMouseEnter={()=>setShowOptions(true)} onMouseLeave={()=>setShowOptions(false)}>
        {note.notes &&
          note.notes.map((note) => (
            <Link to={`/view/${note.visibleId}`} className="note-preview">
              <div key={note.visibleId}>
                <h3 className="preview-title">{note.title}</h3>{showOptions && (<NoteOptions />)}
                <p className="preview-content">
                  {note.content && sanitizeHtmlAndStripHtmlTags(note.content)}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ListNotesComponent;