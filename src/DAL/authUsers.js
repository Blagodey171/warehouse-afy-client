import axios from 'axios';
const url = 'http://localhost:3001'
const urlHeroku = 'https://warehouse-afy-server.herokuapp.com'
const urlbeget = 'http://213.139.209.42:3001'
const currentURL = urlHeroku
export const registration = async (login, password, handlerName) => {
    return await axios({
        method: 'post',
        url: `${currentURL}/api/registration`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            login, password, handlerName
        },
        withCredentials: true
    })
}
export const authentification = async (login, password, handlerName) => {
    return await axios({
        method: 'post',
        url: `${currentURL}/api/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            login,
            password,
            handlerName
        },
        withCredentials: true
    })
}
export const logout = async (login, handlerName) => {
    return await axios({
        method: 'post',
        url: `${currentURL}/api/logout`,
        headers: { 'Content-Type': 'application/json' },
        data: {
            login,
            handlerName
        },
        withCredentials: true
    })
}

export const authorization = async (token) => {
    return await axios({
        method: 'post',
        url: `${currentURL}/api/authorization`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true
    })
}

