import axios from "axios";
import API_URL from "./ApiUrl";


export async function uploadDocument(projectId: string, selectedFiles: File[]) {
    const accessToken = localStorage.getItem('access_token');
    
    const formData = new FormData();
    selectedFiles.forEach((file: File) => formData.append('file', file));
    formData.append('project_id', projectId);
  
    const response = await axios.post(
      `${API_URL}/api/projects/new-document`,
      formData,
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
  
    return response;
  }

export async function getDocumentsByConversation(conversation_id: string) {
  const accessToken = localStorage.getItem('access_token');

  const response = await axios.get(
    `${API_URL}/api/conversations/${conversation_id}/documents`,{
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  return response

}

export async function getChunkDocument(documentId: string) {
  const accessToken = localStorage.getItem('access_token');
  
  const response = await axios.get(
    `${API_URL}/api/documents/${documentId}/chunks`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )

  return response
}

export async function getConversationByDocument(documentId: string) {
  const accessToken = localStorage.getItem('access_token');

  const response = await axios.get(
    `${API_URL}/api/conversations/${documentId}/get-by-doc`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${accessToken}`
      }
    }
  )
  return response
}