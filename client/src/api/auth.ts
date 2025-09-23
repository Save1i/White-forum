import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function logIn(username: string, password: string) {
  return axios.post(
    `${API_URL}user/log-in`,
    { username, password },
    { withCredentials: true }
  );
}

export async function register(username: string, email: string, password: string) {
  return axios.post(
    `${API_URL}user/create`,
    { username, email, password },
    { withCredentials: true }
  );
}
