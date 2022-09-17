import axios from "axios"

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}` // Получаем токен из локального хранилища
    return config
}

$authHost.interceptors.request.use(authInterceptor) // Токен будет подставляться при каждом запросе

export {
    $host,
    $authHost
}