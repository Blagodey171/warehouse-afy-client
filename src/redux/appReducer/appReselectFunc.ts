import { RootState } from "../store"

export const selectAuthStatus = (state: RootState) => state.appReducer.authStatus