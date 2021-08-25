import classes from './welcome.module.css'
import logo from '../images/logo.svg'
import lock from '../images/lock.svg'
import proPic from '../images/user.svg'
import { useState } from 'react'
import Modal from '../components/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../store/authAction'
import { authActions } from '../store/auth';

function Welcome() {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.auth.loading)
    const modal = useSelector((state) => state.auth.modal)
    const [phoneNumber, setPhoneNumber] = useState('')

    function handleChange(event) {
        console.log('handlechange')
        var theNum = event.target.value
        if (theNum.length < 15) {
            theNum = theNum.replace(/\D+/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            setPhoneNumber(theNum);
        }
    }

    function closeModalHandler() {
        // setModalIsOpen(false)
        dispatch(authActions.setModal({ open: false }))
    }

    function submitHandler(event) {
        event.preventDefault();
        dispatch(authActions.setModal({ open: true }))
        dispatch(login(phoneNumber))
    }

    return (
        <div>
            <div className={classes.logo}>
                <img src={logo} alt='logo' className={classes.imgs} />
            </div>
            <div className={classes.content}>
                <div className={classes.proPic}>
                    <img src={proPic} alt='profile' className={classes.pic} />
                </div>
                <div className={classes.create}>
                    Create your account
                </div>
                <form onSubmit={submitHandler}>
                    <div className={classes.phoneDiv}>
                        <input className={classes.phoneInput} type="text" value={phoneNumber} onChange={handleChange} placeholder="Mobile number *" />
                    </div>
                    <p className={classes.sign}>Already have an account? Sign In</p>
                    <button className={classes.contButton}>
                        <div className={classes.conButton}>
                            <img src={lock} alt='' className={classes.lockImg} />
                        </div>
                        <span className={classes.cont}>Continue</span>
                    </button>
                </form>
                <p className={classes.tagText}>We’ll send you a verification code via SMS.</p>
            </div>

            {modal && <Modal onCancel={closeModalHandler} load={loading} phone={phoneNumber} />}

        </div>
    )
}

export default Welcome