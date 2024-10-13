import API_URL from "./ApiUrl";
import axios from 'axios';



export async function SignIn(username:string, password:string) {
    const response = await axios.post(
        `${API_URL}/api/auth/login`,
        new URLSearchParams({
            grant_type: 'password',
            username: username,
            password: password,
            scope: '',
            client_id: 'string',
            client_secret: 'string',
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json',
            },
        }
    );

    return response.data;
}

export async function Logout() {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token'); // Cần đảm bảo rằng bạn đã lưu refresh token ở đây
    const response = await axios.post(
        `${API_URL}/api/auth/logout`, 
            {
                refresh_token: refreshToken, // Gửi refresh token trong body
            },
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
    )
}

export async function refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token'); 
    
    if (!refreshToken) {
        return Promise.reject('No refresh token available');
    }

    try {
        // Gửi yêu cầu POST đến API refresh
        const response = await axios.post(
            `${API_URL}/api/auth/refresh`,
            {
                refresh_token: refreshToken, 
            },
            {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        );
        console.log(response)

        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
        }

        return response.data; 
    } catch (error) {
        console.error('Error refreshing token:', error);
        return Promise.reject(error); 
    }
}

export async function getAllProjects() {
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.get(
        `${API_URL}/api/projects`,
        {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
    return response
}

export async function getAllProjectsWithInfo () {
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.get(
        `${API_URL}/api/projects-with-info`,
        {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
    return response
}

export async function createProject(name: string) {
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.post(
        `${API_URL}/api/projects/create?name=${name}`, {
        },
        {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        }
    )
    return response
}


export async function getProjectById(projectId: string) {
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.post(
        `${API_URL}/api/projects/${projectId}`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
    return response
}

export async function deleteProjectById(projectId: string) {
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.post(
        `${API_URL}/api/projects/delete?project_id=${projectId}`,
        {

        }, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
    return response
}

export async function renameProjectById(projectId: string, newName: string){
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.post(
        `${API_URL}/api/projects/rename?project_id=${projectId}&new_name=${newName}`, 
        {
        },
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

export async function getUser (){
    const accessToken = localStorage.getItem('access_token')
    const response = await axios.get(
        `${API_URL}/api/users/me`, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
    return response
}
