import React, { useEffect, useState } from "react";
import "./ListNotesComponent.css";
import NoteService from "../../../Service/NoteService";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

function htmlFrom(htmlString) {
  const cleanHtmlString = DOMPurify.sanitize(htmlString, {
    USE_PROFILES: { html: true },
  });
  const html = parse(cleanHtmlString);
  return html;
}

const ListNotesComponent = () => {
  const [note, setNote] = useState({
    notes: [],
  });

  useEffect(() => {
    NoteService.getNotes()
      .then((response) => {
        console.log(response);
        setNote({
          notes: response.data
        })})
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="homepage">
      <h1 className="text-center-homepage">Your Notes</h1>
      <Link to={`/add`}>
        <div className="create-new-note-btn">Create a new note</div>
      </Link>
      <div className="note-container">
        {note.notes && note.notes.map((note) => (
          <Link to={`/view/${note.visibleId}`} className="note-preview">
            <div key={note.visibleId}>
              <h3 className="preview-title">{note.title}</h3>
              <p className="preview-content">
                {note.content && htmlFrom(note.content)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListNotesComponent;
