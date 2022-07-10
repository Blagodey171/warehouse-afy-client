import React, { useEffect } from 'react'
import './login.scss'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import type {RootState} from '../../redux/store'
import { settingsValidation } from '../../settings-validation/settings-validation'
import { loginThunk, IerrorObject, showErrorAC } from '../../redux/loginReducer'
import Toast from './toastLogin/toastLogin'


interface IauthenticationData {
    login: string
    password: string
}
interface Iprops {
    authStatus: boolean
    token: string
    errorMessage: string,
    errorCode: number,
    dataApp: object,
    loginThunk(login:string, password:string) : void,
    showErrorAC(errorObject: IerrorObject) : {
        type: string,
        displayError: IerrorObject
    }
}



const Login:React.FC<Iprops> = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const authentication = (data:IauthenticationData) => {
        props.loginThunk(data.login, data.password)
    }
    const errorCodeReset = () => {
        props.showErrorAC({
            errorCode: null,
            errorMessage: null
        })
    }

    const toastHandler = () => {
        
    }
    
    if (props.authStatus) {  
        return <Redirect to='/goods-arrivals'/>
    }
    
    return (
        <section className='login-container'>
            <h1 className='login-container__section-title'>Вход</h1>

            {
                props.errorMessage ?
                <Toast errorMessage={props.errorMessage} positiveToastHandler={toastHandler} errorCode={props.errorCode} errorCodeReset={errorCodeReset}/>
                : null
            }
            <div className='login-container__form-container'>
                <form onSubmit={handleSubmit(authentication)} className='login-form'>

                    <label className='login-form__label' htmlFor='login'>Login / Логин</label>
                    <input autoComplete='false' className='login-form__menu-item' {...register('login', { required: true, maxLength: settingsValidation.maxLenght, minLength: settingsValidation.minLenght })} />
                    {errors.login?.type === 'maxLength' && <p>Максимальная длина логина 20 символа</p>}
                    {errors.login?.type === 'minLength' && <p>Миниимальная длина логина 5 символов</p>}
                    {errors.login?.type === 'required' && <p>Обязательно поле</p>}


                    <label className='login-form__label' htmlFor="password">Password / Пароль</label>
                    <input autoComplete='false' type='password' className='login-form__menu-item' {...register('password', { required: true, maxLength: settingsValidation.maxLenght, minLength: settingsValidation.minLenght })} />
                    {errors.password?.type === 'maxLength' && <p>Максимальная длина логина 20 символа</p>}
                    {errors.password?.type === 'minLength' && <p>Миниимальная длина логина 5 символов</p>}
                    {errors.password?.type === 'required' && <p>Обязательно поле</p>}
                    <input type='submit'/>
                </form>
            </div>
        </section>
    )
}

let mapStateToProps = function (state: RootState) {
    return {
        authStatus: state.appReducer.authStatus,
        token: state.loginReducer.token,
        errorMessage: state.loginReducer.errorMessage,
        errorCode: state.loginReducer.errorCode,
        dataApp: state.loginReducer.dataApp,
    }
}
export default compose(
    connect(mapStateToProps, {
        loginThunk,
        showErrorAC
    }),
)(Login)