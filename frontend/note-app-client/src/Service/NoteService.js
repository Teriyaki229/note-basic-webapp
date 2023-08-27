import axios from "axios";

const NOTE_BASE_API_URL = "http://localhost:8080/home";
const NOTE_VIEW_BY_ID_URL = "http://localhost:8080/"

class NoteService {
  getNotes() {
    return axios.get(NOTE_BASE_API_URL);
  }
  getNoteById(id){
    return axios.get(NOTE_VIEW_BY_ID_URL+id)
  }
}

export default new NoteService();