import API_URL from "./ApiUrl";
import axios from 'axios';


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




