import classes from './Results.module.css'
import Result from './Result'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchResults } from '../store/petAction'

function Results(props) {
    const dispach = useDispatch()
    const results = useSelector((state) => state.pet.results)
    const page = useSelector((state) => state.pet.page)
    const addSign = useSelector((state) => state.pet.addSign)
    const selection = useSelector((state) => state.pet.selection)

    useEffect(() => {
        console.log('in Results.js in useEffect')
        if (results.length === 0) {
            dispach(searchResults(selection, 1))
        }

    }, [selection])

    function keepSearch() {
        dispach(searchResults(selection, page))
    }

    return (
        <ul className={classes.frame}>
            {
                results.map((item, index) => (
                    <li key={index}>
                        <a href={item.url}>
                            <Result foodImg={item.image} foodName={item.name} foodMake={item.made} foodPrice={item.price} foodLvl={item.lvl} />
                        </a>
                    </li>
                ))
            }

            {
                addSign && <li>
                    <div className={classes.nextPage} onClick={keepSearch}>+</div>
                </li>
            }

        </ul>
    )
}

export default Results