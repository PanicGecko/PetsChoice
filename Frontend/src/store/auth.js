import { createSlice } from '@reduxjs/toolkit'

const initalState = {
    phone: '',
    token: '',
    loading: false,
    modal: false
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: initalState,
    reducers: {
        resetAuth(state) {
            state.phone = ''
            state.token = ''
            state.loading = false
            state.modal = false
            if (navigator.cookieEnabled) {
                localStorage.removeItem('token')
            }
        },
        login(state, action) {
            state.token = action.payload.token
            if (navigator.cookieEnabled) {
                localStorage.setItem('token', action.payload.token)
            }
        },
        logout(state) {
            state.token = ''
            state.phone = ''
        },
        setPhone(state, action) {
            state.phone = action.payload.phone
        },
        setLoading(state, action) {
            state.loading = action.payload.load
        },
        setModal(state, action) {
            state.modal = action.payload.open
        },
        setLogged(state, action) {
            state.isLoggedIn = action.payload.log
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer