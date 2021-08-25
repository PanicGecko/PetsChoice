
import classes from './App.module.css';
import { useEffect } from 'react'
import Welcome from './pages/welcome'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from './store/auth'
import {petActions} from './store/pets'
import Root from './store/Constants'

function App() {

  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth.token)

  useEffect(() => {
    if (navigator.cookieEnabled) {
      const token = localStorage.getItem('token') || ''
      console.log('welcome.js in useEffect token: ' + token)
      if (token !== '') {
        fetch(Root + '/user/check_login',
          {
            method: 'POST',
            headers: new Headers({
              'authorization': token
            })
          }
        ).then(response => response.json())
          .then(data => {
            console.log('in fetch code: ' + data.code)
            if (data.code === 200) {
              dispatch(authActions.login({ token: token }))
              dispatch(petActions.setPet({ result: data.results }))
            } else {
              dispatch(authActions.login({ token: '' }))
            }
          })
          .catch((error) => {
            console.error('Error in welcome.js error: ' + error)
            dispatch(authActions.login({ token: '' }))
          })
      }
    }
  }, [])

  return (
    <div className={classes.App}>
    {
      auth === '' ? <Welcome /> : <Home />
    }
    </div>
  );
}

export default App;
