import classes from './Ingredients.module.css'
import Ingredient from './Ingredient'
import {delIngred} from '../store/petAction'
import { useDispatch } from 'react-redux';

function Ingredients(props) {
    const dispatch = useDispatch()
    //Do the deleteItem stuff
    function deleteItem(index) {
        dispatch(delIngred(props.sel, index))
    }

    return (
        <div className={classes.frame}>
            <div className={classes.stuff}>
                {
                    Object.keys(props.pet.ingreds).map((pet, index) => (
                        <Ingredient food={pet} level={props.pet.ingreds[pet]} key={index} deleteThis={deleteItem} />
                    ))
                }
            </div>
            <div className={classes.Add} onClick={props.searching}>{props.pet.updated ? 'Search' : 'Update'}</div>
        </div>
    )
}

export default Ingredients