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