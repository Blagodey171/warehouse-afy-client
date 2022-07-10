import React, { useEffect } from 'react'
import './toastLogin.scss'

interface Iprops {
    errorMessage: string,
    errorCode: number,
    positiveToastHandler?() : void,
    errorCodeReset?() : void
}

const Toast: React.FC<Iprops> = React.memo((props) => {
    useEffect(() => {
        return () => {
            props.errorCodeReset()
        }
    }, [])
    
    console.log(props)
    return (
        <div className='toast-block'>
            <span className='toast-block__message'>{props.errorMessage}</span>
            {
                props.errorCode === 1 
                ? 
                <>
                    <b>Сбросить вход на учетную запись со всех устройств?</b>

                    <div className='toast-block__question'>
                        <button className='toast-block__positive' onClick={props.positiveToastHandler}>Принять</button>
                        <button className='toast-block__negative' onClick={props.errorCodeReset}>Отклонить</button>
                    </div>
                </>
                : null
            }
        </div>
    )
})

export default Toast