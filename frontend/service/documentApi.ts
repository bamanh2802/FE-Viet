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