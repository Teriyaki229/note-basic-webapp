import React, { useState, useEffect } from "react";
import NoteService from "../../../Service/NoteService";
import { useParams } from "react-router-dom";
import "./ViewNoteComponent.css";
import parse from 'html-react-parser';
import DOMPurify from "dompurify";

function ViewNoteComponent() {
  const { id } = useParams();
  const [note, setNote] = useState({});

  useEffect(() => {
    NoteService.getNoteById(id)
      .then((response) => {
        setNote(response.data);
      })
      .catch((error) => console.log("Error fetching note: " + error));
  }, [id]);

  const htmlFrom = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString,
      { USE_PROFILES: { html: true } });
    const html = parse(cleanHtmlString);
    return html;
}

  return (
    <div className="container">
      <h2 className="note-title">{note.title}</h2>
      <p className="note-content">{note.content && htmlFrom(note.content)}</p>
      <div className="info">
        <p className="note-date-created">Date Created: {note.date_created}</p>
        <p className="note-last-modified">Last Modified: {note.last_modified}</p>
        <div className="tags">
          <strong>Tags:</strong>
          <ul className="taglistcontainer">
            {note.tags &&
              note.tags.map((tag, index) => (
                <li key={index} className="tag">
                  {tag}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewNoteComponent;
