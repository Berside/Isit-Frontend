import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";


export const login = async (username, password) => {
    const {data} = await $host.post('v1/auth/login', {username, password})
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('username', username)
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Токен не найден в локальном хранилище');
    }
    return jwtDecode(data.access_token)
}

export const check = async () => {
  try {
    const token = localStorage.getItem('token');
    console.log(token);
    const { data } = await $authHost.get('v1/user/current');
    localStorage.setItem('id', data.id);
    return data;
  } catch (error) {
    console.error('Ошибка при проверке пользователя:', error);
  }
};

export const FetchUser = async (username) => {
  try {
    const {data} = await $host.get('v1/user/getOne', {
      params: {
          username: username  
          }
      }
    )
     console.log(data)
    return data.data;
  } catch (error) {
    console.error('Ошибка при проверке пользователя:', error);
  }
}