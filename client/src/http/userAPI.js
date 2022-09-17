import { $authHost, $host } from "./index";
import jwt_decode from 'jwt-decode';


// Описываем запросы к серверу. URL смотри на сервере
export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'});
    localStorage.setItem('token', data.token) // Сохраняем токен в локальном хранилище
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
    // Функция проверяет валидность токена при каждом обновлении страницы, если не валидный — нужно перелогиниться
}