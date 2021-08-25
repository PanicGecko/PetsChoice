import classes from './Result.module.css'

function Result(props) {

    const bcolor = props.foodLvl === 0 ? '#2AFF19' : props.foodLvl === 1 ? '#FDF51C' : '#FD1C1C'

    return (
        <div className={classes.frame}>
            <div className={classes.left}>
                <img src={'https://' + props.foodImg} />
            </div>
            <p className={classes.foodName}>
                {props.foodName}
                </p>
            <p className={classes.foodBrand}>by: {props.foodMake}</p>
            <p className={classes.foodPrice}>{props.foodPrice}</p>
            <div className={classes.button}>
                Chewy
            </div>
            <div className={classes.label} style={{backgroundColor: bcolor}}></div>
        </div>
    )
}

export default Result