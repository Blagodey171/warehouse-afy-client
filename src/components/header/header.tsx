import React, {useCallback, useMemo} from 'react'
import './header.scss'

import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, useHistory} from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';


import type {RootState} from '../../redux/store'
import { logoutThunk } from '../../redux/loginReducer';
import { setAuthStatusAC } from '../../redux/appReducer/appReducer';
import { InavigationItems } from '../../redux/headerReducer/headerInterface'
import {selectNavItems} from '../../redux/headerReducer/headerReselectFunc'
import {selectAuthStatus} from '../../redux/appReducer/appReselectFunc'

// type OptionsFlags<Type> = {
//     [Property in keyof Type]: boolean
// }
// interface testObj {
//     [key: string]: string
// }
interface IProps {
    // mediaQuery: testObj,
    navigationItems: InavigationItems[]
    authStatus: boolean 
    logoutThunk (login: string, deviceId: string) : void
    setAuthStatusAC (status: boolean) : { type: string }
}

const Header: React.FC<IProps> = React.memo((props) => {
    console.log('render HEADER')
    const history = useHistory()
    // ПЕРЕНЕСТИ ЗНАЧЕНИЯ max-width В РЕДЮСЕР,для исключения ререндера при перериовке родительского компонента
    // let mediaQuery = {
    //     widthForTransformHeader330: "(max-width: 330px)",
    //     widthForTransformHeader530: "(max-width: 530px)",
    //     widthForTransformHeader580: "(max-width: 580px)",
    //     widthForTransformHeader700: "(max-width: 700px)",
    //     widthForTransformHeader900: "(max-width: 900px)",
    // }
    let watchMediaQuery = {
        widthForTransformHeader330: useMediaQuery({ query: "(max-width: 330px)" }),
        widthForTransformHeader530: useMediaQuery({ query: "(max-width: 530px)" }),
        widthForTransformHeader580: useMediaQuery({ query: "(max-width: 580px)" }),
        widthForTransformHeader700: useMediaQuery({ query: "(max-width: 700px)" }),
        widthForTransformHeader900: useMediaQuery({ query: "(max-width: 900px)" }),
    }
    
    

    const menuLinksClass:string = 'header__button'
    const headerLinksClass:string = 'header__item'
    
    const createNavigationElements = (amountElements: number, linkClass: string) => {
        let links = [...props.navigationItems]
        switch (linkClass) {
            case menuLinksClass: {
                const deleteLinks = links.splice(-amountElements, amountElements) // splice возвращает массив удаленных элементов
                return deleteLinks.map(item => <NavLink to={item.link} className={`${linkClass}`} key={item.name}>{item.name}</NavLink>)
            }
            case headerLinksClass: {
                links.splice(-amountElements, amountElements) // splice удаляет элементы из массива(просто изменяет массив)
                return links.map(item => <NavLink to={item.link} className={`${linkClass}`} key={item.name}>{item.name}</NavLink>)
            }
        }
    } 
    const getLengthMenuElements = useMemo(() => {
        return () => {
            // console.log({render: props})
            let values = 0
            Object.values(watchMediaQuery).forEach(value => {
                if (value) values++
            })
            return values
        }
    }, [watchMediaQuery])

    const getMenuElements = useCallback(
        (amountElements: number) => {
            // console.log('menu-elements')
            return createNavigationElements(amountElements, menuLinksClass)
        }
        , [getLengthMenuElements])

    const getHeaderElements = useCallback(
        (amountElements: number) => {
            // console.log('header-elements')
            return createNavigationElements(amountElements, headerLinksClass)
        },
        [getLengthMenuElements])

    const setAllLinksInMenu = useCallback(() => {
        return props.navigationItems.map((item:any) => <NavLink to={item.link} className={menuLinksClass} key={item.name}>{item.name}</NavLink>)
    }, [props.navigationItems])
    
    const logout = (): void => {
        props.logoutThunk(localStorage.getItem('login'), localStorage.getItem('deviceId'))
        props.setAuthStatusAC(false)
        history.push('/login')
    }
    return (
        <header className='header'>
            <nav className='header__navigation'>
                <ul className='header__items'>
                    {
                        !watchMediaQuery.widthForTransformHeader530 ? getHeaderElements(getLengthMenuElements()) : null
                    }
                    <div className='header__menu-container' >
                        <span className='header__menu-name'>Меню</span>
                    </div>
                    {
                        <div className='header__menu-block' >
                            {
                                props.authStatus ? <button onClick={logout} className='header__button'>logout</button> : <NavLink className='header__button' to='/login'>login</NavLink>
                            }
                            <NavLink to='/settings' className='header__button'>Настройки</NavLink>
                            <NavLink to='/registration' className='header__button'>Регистрация</NavLink>
                            {
                                !watchMediaQuery.widthForTransformHeader530 ? getMenuElements(getLengthMenuElements()) : setAllLinksInMenu()
                            }
                        </div>
                    }

                </ul>
            </nav>
        </header>
    )
})
let mapStateToProps = function (state: RootState) {
    console.log('mapstate HEADER')
    return {
        navigationItems: selectNavItems(state),
        authStatus: selectAuthStatus(state),
    }

}

export default compose(
    connect(mapStateToProps, {
        logoutThunk,
        setAuthStatusAC
    })
)(Header)
