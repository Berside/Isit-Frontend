import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (username, email, password) => {
    try {
      const {data} = await $host.post('v1/auth/register', {username, email, password})
      localStorage.setItem('message', data.message)
      console.log(data);
      return data.message;
    } catch (error) {
      throw error;
    }
  }

export const login = async (email, password) => {
    const {data} = await $host.post('v1/auth/login', {email, password})
    console.log(data);
    localStorage.setItem('token', data.access_token)
    localStorage.setItem('email', email)
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Токен не найден в локальном хранилище');
    }
    return jwtDecode(data.access_token)
}

export const check = async () => {
  try {
    const { data } = await $authHost.get('v1/user/current');
    localStorage.setItem('id', data.data.id);
    return data;
  } catch (error) {
    console.error('Ошибка при проверке пользователя:', error);
  }
};

export const FetchUser = async (email) => {
  try {
    const {data} = await $host.get('v1/user/getOne', {
      params: {
          email: email  
          }
      }
    )
    return data.data;
  } catch (error) {
    console.error('Ошибка при проверке пользователя:', error);
  }
}

export const GETadmin = async (Code) => {
  try{
    const { data } = await $authHost.patch(`v1/user/getAdmin?code=${Code}`);
    return data;
  } catch(error) {
    console.log(error)
  }
}