import axios from "axios";

const NOTE_HOME_PAGE_URL = "http://localhost:8080/home";
const NOTE_BASE_API_URL = "http://localhost:8080/"

class NoteService {
  getNotes() {
    return axios.get(NOTE_HOME_PAGE_URL);
  }
  getNoteById(id){
    return axios.get(NOTE_BASE_API_URL+id);
  }
  addNote(title, tags, content, date_created){
    return axios.post(NOTE_BASE_API_URL+'add',{
      title: title,
      tags: tags,
      content: content,
      date_created: date_created
    });
  }
}

export default new NoteService();