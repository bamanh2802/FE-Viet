import axios from "axios";
import API_URL from "./ApiUrl";
import qs from 'qs';

export async function createNewNote(
    projectId: string, 
    title: string = 'Untitled Note',  
    content: string = 'Write something, or press \'/\' for command',    
    chunkIds: string[] = []           
  ) {
    const accessToken = localStorage.getItem('access_token');
  
    const data = qs.stringify({
      project_id: projectId,
      title: title,
      content: content,
      chunk_ids: chunkIds.join(','), 
    });
  
    const response = await axios.post(
      `${API_URL}/api/projects/new-note`,
      data,  
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  
    return response
  }

  export async function getAllNotesByUser (projectId: string){
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.get(
        `${API_URL}/api/notes/all-by-user?user_id=${projectId}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )

    return response
  }

  export async function getNoteById (noteId: string) {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.get(
        `${API_URL}/api/notes/${noteId}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )

    return response
  }

  export async function renameNote(noteId: string, newName: string) {
    const accessToken = localStorage.getItem('access_token');
  
    const response = await axios.put(
      `${API_URL}/api/notes/rename`,
      new URLSearchParams({
        note_id: noteId,
        new_name: newName,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
  
    return response;
  }

  export async function editNote(noteId: string, content: string) {
    const accessToken = localStorage.getItem('access_token');
  
    const response = await axios.put(
      `${API_URL}/api/notes/edit`,
      new URLSearchParams({
        note_id: noteId,
        content: content,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
  
    return response;
  }