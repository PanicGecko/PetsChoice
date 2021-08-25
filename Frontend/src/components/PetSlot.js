import classes from './PetSlot.module.css'
import next from '../images/next.svg'

function PetSlot(props) {
    return (
        <div className={classes.frame1}>
            <div className={classes.flex1}>
                <div className={classes.child}>
                    <span>{props.pet.name}</span>
                    <div className={classes.nextBut}>
                        <img src={next}/>
                    </div>
                </div>
                <div className={classes.child}>
                    <p>
                        Ingredients:<br />
                        {Object.keys(props.pet.ingreds).join(', ')}
                        {/* Chicken, Rice, Turkey, Brown Rice, Tomato */}
                    </p>
                </div>
                <div className={classes.child}>
                    <span>Results: {props.pet.link}</span>
                </div>
            </div>
        </div>
    )
}

export default PetSlot