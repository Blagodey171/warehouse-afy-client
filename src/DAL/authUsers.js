import axios from 'axios';
const url = 'http://localhost:3001'
const urlHeroku = 'https://warehouse-afy-server.herokuapp.com'
const urlbeget = 'http://213.139.209.42:3001'
const currentURL = url
export const registration = async (login, password) => {
    return await axios({
        method: 'post',
        url: `${currentURL}/api/registration`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            login, password
        },
        withCredentials: true
    })
}
export const authentification = async (login, password ) => {
    return await axios({
        method: 'post',
        url: `${currentURL}/api/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            login,
            password,
        },
        withCredentials: true
    })
}
export const logout = async (login, deviceId) => {
    return await axios({
        method: 'post',
        url: `${currentURL}/api/logout`,
        headers: { 'Content-Type': 'application/json' },
        data: {
            login,
            deviceId
        },
        withCredentials: true
    })
}

export const authorization = async (token, login, deviceId) => {
    return await axios({
        method: 'post',
        url: `${currentURL}/api/authorization`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: {
            login,
            deviceId
        },
        withCredentials: true
    })
}
