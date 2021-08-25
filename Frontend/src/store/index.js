import {configureStore} from '@reduxjs/toolkit'
import authReducer from './auth'
import petReducer from './pets'

const store = configureStore({
    reducer: {
        auth: authReducer,
        pet: petReducer
    },
})


export default store;