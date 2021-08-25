import classes from './SpinningModal.module.css'

function SpinningModal() {
    return (
        <div className={classes.backDrop}>
            <div className={classes.loader}></div>
        </div>
    )
}

export default SpinningModal