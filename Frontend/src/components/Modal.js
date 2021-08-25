import classes from './Modal.module.css'
import close from '../images/close.svg'
import Spinner from './Spinner'
import {useDispatch} from 'react-redux'
import {login, ver_code} from '../store/authAction'
import { useState } from 'react';

function Modal(props) {

    const dispatch = useDispatch();
    const [code, setCode] = useState('')

    function closeHandler() {
        props.onCancel();
    }

    function resendHandler() {
        console.log('in Model resendHandler: phone: ' + props.phone)
        dispatch(login(props.phone))
    }

    function handleInput(event) {
        var theInput = event.target.value
        setCode(theInput)
        if(theInput.length === 4){
            console.log('in Modal handleInput ' + theInput)
            dispatch(ver_code(props.phone, theInput))
        }
    }

    const elements = <ul className={classes.modalUl}>
    <li><span className={classes.span1}>We just texted you</span></li>
    <li><span className={classes.span2}>Please enter the verification code we just sent to {props.phone}.</span></li>
    <li>
        <span className={classes.span4}>
            <input autoFocus onChange={handleInput} value={code} className={classes.input} type="number" maxLength="4" placeholder="0000"/>
        </span>
    </li>
    <li onClick={resendHandler}><span className={classes.span3}>Didn't get a code?</span></li>
</ul>

    return (
        <div className={classes.backDrop}>
                <div className={classes.modal}>
                    <div className={classes.closeButton} onClick={closeHandler}>
                        <img src={close}/>
                    </div>
                    {props.load ? <Spinner/> : elements}
                    
                </div>
            </div>
    )
}

export default Modal