import classes from './IngredModal.module.css'
import close from '../../images/close.svg'
import { useState } from 'react'
import Spinner from '../Spinner'

function IngredModal(props) {

    
    const [name, setname] = useState('')
    const [level, setLevel] = useState(3)

    function onNameChange(event) {
        var theInput = event.target.value
        setname(theInput)
    }
    function onSelect(event) {
        setLevel(parseInt(event.target.value))
    }
    function submit() {
        if (name !== "") {
            props.add(level, name)
            setname('')
            setLevel(3)
        }
    }

    const elements = <ul className={classes.modalUl}>
    <li>
        <span className={classes.span1}>
            Please enter a pet name
        </span>
    </li>
    <li>
        <span className={classes.span4}>
            <input className={classes.input} onChange={props.changing} value={props.petValue} />
        </span>
    </li>
    <li>
        <span>
            <div className={classes.tableBox}>
                <table className={classes.IngredBox}>
                    <tbody>
                        {
                            Object.keys(props.pets).map((pet,index) => (
                                <tr key={index}>
                                    <td>
                                        <div className={classes.levelInd} style={{ backgroundColor: props.pets[pet] === 1 ? '#2AFF19' : props.pets[pet] === 2 ? '#FDF51C' : '#FD1C1C' }}></div>
                                    </td>
                                    <td>
                                        <span className={classes.ingredInd}>{pet}</span>
                                    </td>
                                    <td>
                                        <img src={close} className={classes.closeInd} onClick={() => props.delete(pet)} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/* <tr>
                    <td>
                        <div className={classes.levelInd}></div>
                    </td>
                    <td>
                        <span className={classes.ingredInd}>Chicken</span>
                    </td>
                    <td>
                        <img src={close} className={classes.closeInd} />
                    </td>
                </tr> */}
            <table className={classes.IngredBox1}>
                <tbody>
                    <tr>
                        <td>
                            <select value={level} onChange={onSelect}>
                                <option value='1'>Light reaction</option>
                                <option value='2'>Some reaction</option>
                                <option value='3'>Severe reaction</option>
                            </select>
                        </td>
                        <td>
                            <input value={name} className={classes.IngredName} onChange={onNameChange} />
                        </td>
                        <td>
                            <div className={classes.addIngred} onClick={submit}>Add</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </span>
    </li>
    <li>
        <span>
            <div className={classes.addButton} onClick={props.addPet}>{props.err ? 'Retry' : props.isEditing ? 'Update' : 'Add'}</div>
        </span>
    </li>
</ul>

    return (
        <div className={classes.backDrop}>
            <div className={classes.modal}>
                <div className={classes.closeButton} onClick={props.onCancel} >
                    <img src={close} />
                </div>
                {props.load ? <Spinner /> : elements}
                
            </div>
        </div >
    )
}

export default IngredModal