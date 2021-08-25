import classes from './Ingredient.module.css'
import close from '../images/close.svg'

function Ingredient(props) {
    return (
        <div className={classes.frame}>
            <div className={classes.level} style={{backgroundColor: props.level === 1 ? '#2AFF19' : props.level === 2 ? '#FDF51C' : '#FD1C1C'}}></div>
            <p>{props.food}</p>
            <img src={close} className={classes.icon} onClick={() => props.deleteThis(props.food)} />
            
        </div>
    )
}

export default Ingredient