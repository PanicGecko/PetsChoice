import {authActions} from './auth'
import {petActions} from './pets'
import Root from './Constants'

export const login = (phone) => {
    return async dispatch => {
        console.log('in login')
        dispatch(authActions.setLoading({load: true}))
        dispatch(authActions.setModal({open:true}))
        const fetchData = async () => {
            const response = await fetch(
                Root + '/user/login',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        phone: phone
                    })
                }
            )
            if(!response.ok){
                throw new Error('Login Failed!')
            }
            console.log('in login response: ' + response)
            const data = await response.json()
            return data
        }
        try {
            console.log('authAction in  login:')
            const loginData = await fetchData();
            console.log('authAction login: success: ' + loginData.code)
            dispatch(authActions.setLoading({load: false}))
            if(loginData.code !== 200) {
                dispatch(authActions.setModal({open:false}))
            }
            
        } catch (error) {
            dispatch(authActions.setLoading({load: false}))
            dispatch(authActions.setModal({open:false}))
        }
    }
}

export const ver_code = (phone, code) => {
    return async dispatch => {
        dispatch(authActions.setLoading({load: true}))
        const fetchData = async () => {
            const response = await fetch(
                Root + '/user/check_ver',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        phone: phone,
                        ver: parseInt(code)
                    })
                }
            )
            if(!response.ok){
                throw new Error('Login Failed!')
            }
            const data = await response.json()
            return data
        }
        try {
            const loginData = await fetchData();
            console.log('in ver_check: code: ' + loginData.code)
            
            dispatch(authActions.setLoading({load: false}))
            if(loginData.code === 201 || loginData.code === 200){
                dispatch(authActions.login({token: loginData.token}))
                dispatch(petActions.setPet({result: loginData.results}))
                console.log('in ver_check: token: ' + loginData.token)
            }
            dispatch(authActions.setModal({open:false}))
            
        } catch (error) {
            dispatch(
                authActions.setLoading({load: false})
            )
            dispatch(authActions.setModal({open:false}))
        }
    }
}