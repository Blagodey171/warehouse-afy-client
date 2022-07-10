import {RootState} from '../store'

export const selectNavItems = (state: RootState) => state.headerReducer.navItems