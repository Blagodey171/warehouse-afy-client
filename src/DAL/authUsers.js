import axios from 'axios';
const url = 'http://localhost:3001'
const urlHeroku = 'https://warehouse-afy-server.herokuapp.com'
export const registration = async (login, password, handlerName) => {
    return await axios({
        method: 'post',
        url: `${urlHeroku}/api/registration`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            login, password, handlerName
        },
        withCredentials: true
    });
}

export const authentification = async (login, password, handlerName) => {
    return await axios({
        method: 'post',
        url: `${urlHeroku}/api/login`,
        headers: { 'Content-Type': 'application/json' },
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
        url: `${urlHeroku}/api/logout`,
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
        url: `${urlHeroku}/api/authorization`,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        withCredentials: true
    })
}

