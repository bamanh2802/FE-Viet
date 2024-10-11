import API_URL from "./ApiUrl";
import axios from 'axios';
import qs from 'qs';


export async function getDocumentInProject (projectId: string) {
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.get(
        `${API_URL}/api/projects/${projectId}/documents`,
        {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
    return response
}


export async function getImagesInProject (projectId: string) {
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.get(
        `${API_URL}/api/projects/${projectId}/images`,
        {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
    return response
}
export async function getConversationInProject (projectId: string) {
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.get(
        `${API_URL}/api/projects/${projectId}/conversations`,
        {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
    return response
}

export async function getDocumentById (documentId: string) {
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.get(
        `${API_URL}/api/documents/${documentId}`,
        {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
    return response
}

export async function createNewConversation(name: string, projectId: string, documentIds: string[]) {
    const accessToken = localStorage.getItem('access_token');
    
    const data = qs.stringify({
      project_id: projectId,
      name: name,
      document_ids: documentIds.join(',') 
    });
  
    const response = await axios.post(
      `${API_URL}/api/projects/new-conversation`, 
      data,
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
  
    return response; 
}

export async function getProjectById (projectId: string) {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.get(
        `${API_URL}/api/projects/${projectId}`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Authorization': `Bearer ${accessToken}`
              }
        }
    )
    return response
}

export async function getNotesInProject (projectId: string) {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.get(
        `${API_URL}/api/projects/${projectId}/notes`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded', 
                'Authorization': `Bearer ${accessToken}`
              }
        }
    )

    return response
}