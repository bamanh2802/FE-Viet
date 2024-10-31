import axios from "axios";

import API_URL from "./ApiUrl";
import axiosInstance from "./axiosInterceptor";

export async function SignIn(username: string, password: string) {
  const response = await axios.post(
    `${API_URL}/api/auth/login`,
    new URLSearchParams({
      grant_type: "password",
      username: username,
      password: password,
      scope: "",
      client_id: "string",
      client_secret: "string",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
    },
  );

  return response;
}

export async function getAllProjects() {
  const response = await axiosInstance.get(`/api/projects`);

  return response; // Trả về data từ response
}

export async function getAllProjectsWithInfo() {
  const response = await axiosInstance.get(`/api/projects-with-info`);

  return response; // Trả về data từ response
}

export async function getUser() {
  const response = await axiosInstance.get(`/api/users/me`);

  return response; // Trả về data từ response
}

export async function getAllDocumentByUser() {
  const response = await axiosInstance.get(`/api/documents`);

  return response; // Trả về data từ response
}

export async function getAllConversationByUser() {
  const response = await axiosInstance.get(`/api/conversations`);

  return response; // Trả về data từ response
}

export async function refreshToken() {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const response = await axios.post(
    `${API_URL}/api/auth/refresh`,
    {
      refresh_token: refreshToken,
    },
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  console.log(response);

  return response;
}

export async function Logout() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    return { error: "No refresh token found." };
  }

  const response = await axios.post(`${API_URL}/api/auth/logout`, {
    refresh_token: refreshToken,
  }, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return response.data; 
}


export async function createProject(name: string) {
  const accessToken = localStorage.getItem("access_token");
  const response = await axios.post(
    `${API_URL}/api/projects/create?name=${name}`,
    {},
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response;
}

export async function getProjectById(projectId: string) {
  const accessToken = localStorage.getItem("access_token");
  const response = await axios.post(`${API_URL}/api/projects/${projectId}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}

export async function deleteProjectById(projectId: string) {
  const accessToken = localStorage.getItem("access_token");
  const response = await axios.post(
    `${API_URL}/api/projects/delete?project_id=${projectId}`,
    {},
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response;
}

export async function renameProjectById(projectId: string, newName: string) {
  const accessToken = localStorage.getItem("access_token");
  const response = await axios.post(
    `${API_URL}/api/projects/rename?project_id=${projectId}&new_name=${newName}`,
    {},
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response;
}

export async function updateUserInfor(
  email: string,
  firstName: string,
  lastName: string,
) {
  const accessToken = localStorage.getItem("access_token");

  const response = await axios.put(
    `${API_URL}/api/users/update_user`,
    {
      email: email,
      first_name: firstName,
      last_name: lastName,
    },
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response;
}

export async function changePassword(oldPassword: string, newPassword: string) {
  const accessToken = localStorage.getItem("access_token");

  const response = await axios.put(
    `${API_URL}/api/users/change_password`,
    {
      old_password: oldPassword,
      new_password: newPassword,
    },
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response;
}

export async function createUser(
  userName: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string,
) {
  const accessToken = localStorage.getItem("access_token"); // Lấy access token nếu có

  const response = await axios.post(
    `${API_URL}/api/users/create_user`,
    {
      username: userName,
      password: password,
      email: email,
      first_name: firstName,
      last_name: lastName,
      // Không cần truyền dob nếu nó là optional
    },
    {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}), // Thêm Authorization header nếu có
      },
    },
  );

  return response.data;
}
