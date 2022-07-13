import React, { useEffect, createContext, MouseEvent, useMemo} from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Route, useHistory } from 'react-router-dom'
import {useMediaQuery} from 'react-responsive'
import type { RootState } from '../../redux/store'

import { verifyUserTokenThunk, displayLoadingPageAC } from '../../redux/appReducer/appReducer'
import type { IappState } from '../../redux/appReducer/appReducer'

import './app.scss';
import Header from '../header/header'
import Login from '../login/login'
import Registration from '../registration/registration'
import LoadingPage from '../loading/loadingpage'
import { loginHoc } from '../../HOC/redirect'
const GoodsArrivals = React.lazy(() => import('../goods-arrivals/goods-arrivals'))

export const mediaQueryContext = createContext({})

interface Iprops extends IappState {
    dataApp: object
    verifyUserTokenThunk(token: string, login: string, deviceId:string): Promise<void>
    displayLoadingPageAC(status: boolean): object
}
// Добавить ХОК-редирект роутам(кроме регистрации)

const App: React.FC<Iprops> = (props) => {

    const history = useHistory()
    
    const closeMenuBlock = (e: MouseEvent) => {
        const menuBlock = document.querySelector('.header__menu-block')
        const menuName = document.querySelector('.header__menu-name')
        if (e.target === menuName) {
            menuBlock.classList.toggle('view')
        } else if (menuBlock.classList.contains('view')) {
            menuBlock.classList.remove('view')
        }
    }
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.verifyUserTokenThunk(localStorage.getItem('token'), localStorage.getItem('login'), localStorage.getItem('deviceId')) 
        } else {
            history.push('/login')
        }
    }, [])

    console.log(props)
    return (
        <div className='app' onClick={closeMenuBlock}>
                <Header />
            <main className='content'>
                {
                    props.displayLoadingPage
                        ? <LoadingPage />
                        : <>
                            <React.Suspense fallback={<div>...Loading...</div>}>
                                <Route exact path='/goods-arrivals' render={() => <GoodsArrivals />} />
                            </React.Suspense>
                            <Route exact path='/registration' render={() => <Registration />} />
                            <Route exact path='/login' render={() => <Login />} />
                        </>
                }
            </main>

        </div>


    )
}
// подключение библиотеки reselect!
let mapStateToProps = (state: RootState) => {
    console.log('mapstate APP')
    return {
        displayLoadingPage: state.appReducer.displayLoadingPage,
        dataApp: state.loginReducer.dataApp, // для просмотра пропсов - потом удалить
    }
}
export default compose(
    connect(mapStateToProps, {
        verifyUserTokenThunk,
        displayLoadingPageAC
    }),
)(App)
