import axios from "axios";


const NOTE_BASE_API_URL = `http://localhost:8080/`

/**
 * A service class for API calls.
 */
class NoteService {
  getNotes() {
    return axios.get(NOTE_BASE_API_URL);
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
  deleteNotebyId(id){
    console.log("id deleted is: "+id);
    return axios.delete(NOTE_BASE_API_URL+id)
  }
  editNotebyId(id, title, tags, content, date_created){
    return axios.patch(NOTE_BASE_API_URL+id,{
      title: title,
      tags: tags,
      content: content,
      date_created: date_created
    });
  }
}

export default new NoteService();