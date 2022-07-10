import { authentification, registration, logout } from '../DAL/authUsers'
import { setAuthStatusAC } from './appReducer/appReducer'
import { batch } from 'react-redux'
import { AnyAction } from 'redux'

import { AppDispatch } from './store'

const LOGIN = 'LOGIN'
const REGISTRATION = 'REGISTRATION'
const SHOW_ERROR = 'SHOW_ERROR'
const LOGOUT = 'LOGOUT'
const VIEW_USER_DATA_LOGIN = 'VIEW_USER_DATA_LOGIN';

interface Istate  {
    login: string | null,
    token: string | null,
    newUserLogin: string | null,
    errorMessage: string | null,
    errorCode: number | null,
    dataApp: null
}

export interface IerrorObject {
    errorMessage: string | null,
    errorCode: number | null,
    
}

const initialState: Istate = {
    login: null,
    token: null,
    newUserLogin: null,
    errorMessage: null,
    errorCode: null,
    dataApp: null
}


const loginReducer = (state = initialState, action: AnyAction ) => {
    switch(action.type) {
        case LOGIN: {
            return {
                ...state,
                login: action.login,
                token: action.token,
            }
        }
        case LOGOUT: {
            return {
                ...state,
                login: null,
                token: null,
            }
        }
        case REGISTRATION : {
            return {
                ...state,
                newUserLogin: action.login
            }
        }
        case SHOW_ERROR : {
            return {
                ...state,
                errorMessage: action.displayError.errorMessage,
                errorCode: action.displayError.errorCode
            }
        }
        case VIEW_USER_DATA_LOGIN: {
            return {
                ...state,
                dataApp: action.data
            }
        }
        default : {
            return {
                ...state
            }
        }
    }
}



export const loginAC = (login: string, token: string) => {
    return {
        type: LOGIN,
        login,
        token
    }
}
export const logoutAC = () => {
    return {
        type: LOGOUT,
    }
}
export const registrationAC = (login: string) => {
    return {
        type: REGISTRATION,
        login,
    }
}
export const showErrorAC = (errorObject: IerrorObject ) => {
    return {
        type: SHOW_ERROR,
        displayError: errorObject
    }
}
export const viewUserDataAClogin = (data: object) => {
    return {
        type: VIEW_USER_DATA_LOGIN,
        data
    }
}

export const loginThunk = (login: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        let loginRequest = await authentification(login, password)
        if (loginRequest.data.errorMessage) {
            dispatch(showErrorAC(loginRequest.data))
        } else {
            batch(() => {
                dispatch(showErrorAC({
                    errorMessage: null,
                    errorCode: null
                }))
                dispatch(loginAC(loginRequest.data.login, loginRequest.data.accessToken))
                dispatch(setAuthStatusAC(true))
                dispatch(viewUserDataAClogin(loginRequest.data))
            })
            localStorage.setItem('token', loginRequest.data.accessToken)
            localStorage.setItem('login', loginRequest.data.login)
            localStorage.setItem('deviceId', loginRequest.data.deviceId)
        }
    }
}


export const logoutThunk = (userLogin: string, deviceId: string) => {
    return async (dispatch: AppDispatch) => {
        localStorage.clear()
        dispatch(logoutAC())
        const logoutRequest = await logout(userLogin, deviceId)
        if(logoutRequest.data.errorMessage) {
            dispatch(showErrorAC(logoutRequest.data.errorMessage))
        } else {
            dispatch(viewUserDataAClogin(logoutRequest.data))
        } // обработка сообщения logout

    }
}
export const registrationThunk = (login: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        let registrationResponse = await registration(login, password)
        if (registrationResponse.data.errorMessage) {
            dispatch(showErrorAC({
                errorMessage: registrationResponse.data.errorMessage,
                errorCode: 4
            
            }))
        } else {
            console.log(registrationResponse)
            dispatch(registrationAC(registrationResponse.data.newUserLogin))
        }
    }
}


export default loginReducer