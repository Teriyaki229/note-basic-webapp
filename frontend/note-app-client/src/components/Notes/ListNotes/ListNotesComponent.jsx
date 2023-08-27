import React, { Component } from "react";
import "./ListNotesComponent.css";
import NoteService from "../../../Service/NoteService";
import { Link } from "react-router-dom";

class ListNotesComponent extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
    };
  }
  componentDidMount() {
    NoteService.getNotes()
      .then((response) => {
        this.setState({ notes: response.data });
      })
      .catch((error) => console.log("Error fetching list of notes: " + error));
  }
  render() {
    return (
      <div className="homepage">
        <h1 className="text-center-homepage">Your Notes</h1>
        <Link to={`/add`}>
        <div className="create-new-note-btn">
          Create a new note
        </div>
        </Link>
        <div className="note-container">
          {this.state.notes.map((note) => (
            <Link to={`/view/${note.visibleId}`} className="note-preview">
              <div key={note.visibleId}>
                <h3 className="preview-title">{note.title}</h3>
                <p className="preview-content">{note.content}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default ListNotesComponent;
