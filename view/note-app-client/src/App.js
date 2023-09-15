import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListNotesComponent from "./components/Notes/ListNotes/ListNotesComponent";
import HeaderComponent from "./components/Notes/utils/HeaderComponent";
import ViewNoteComponent from "./components/Notes/ViewNote/ViewNoteComponent";
import AddNoteComponent from "./components/Notes/AddNote/AddNoteComponent";
import './index.css';
import EditNoteComponent from "./components/Notes/EditNote/EditNote";
function App() {
  return (
    <div>
      <HeaderComponent />
      <Router>
        <Routes>
          <Route path="/" element={<ListNotesComponent />} />
          <Route path="/view/:id" element={<ViewNoteComponent />} />
          <Route path="/add" element={<AddNoteComponent />} />
          <Route path="/edit/:id" element={<EditNoteComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
