import classes from './Home.module.css'
import logo from '../images/logo.svg'
import menu from '../images/menu.svg'
import profilepic from '../images/user.svg'
import edit from '../images/edit.svg'
import PetSlot from '../components/PetSlot'
import Results from '../components/Results'
import Ingredients from '../components/Ingredients'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import SpinningModal from '../components/home/SpinningModal'
import IngredModal from '../components/home/IngredModal'
import { addPet, delPet, searchResult, editPet } from '../store/petAction'
import { petActions } from '../store/pets'
import { authActions } from '../store/auth'

function Home() {
    const dispatch = useDispatch()
    const pets = useSelector((state) => state.pet.pets)
    const modal = useSelector((state) => state.pet.modal)
    const loading = useSelector((state) => state.pet.loading)
    const error = useSelector((state) => state.pet.error)
    const selection = useSelector((state) => state.pet.selection)
    const isDelete = useSelector((state) => state.pet.deleting)
    const viewType = useSelector((state) => state.pet.viewType)
    const isEdit = useSelector((state) => state.pet.isEdit)
    const sideMenu = useSelector((state) => state.pet.sideMenu)
    const [newPet, setNewPet] = useState('')
    const [petModal, setPetModal] = useState({})
    const [matches, setMatches] = useState(window.matchMedia("(max-width: 700px)").matches)

    useEffect(() => {
        console.log('Home.js in useEffects updating')

    })

    useEffect(() => {
        const handler = e => setMatches(e.matches)
        window.matchMedia("(max-width: 700px)").addListener(handler)
    }, [])

    function onModal() {
        dispatch(petActions.setModal({ modal: true }))
    }

    function onCancel() {
        dispatch(petActions.setModal({ modal: false }))
        setPetModal({})
        setNewPet('')
        dispatch(petActions.isEdit({ editing: false }))
    }

    function addingPetModal(event) {
        var theInput = event.target.value
        setNewPet(theInput)
        console.log('Home.js addingPetModal')
    }

    function addNewPet() {
        if (newPet.trim() === '') {
            dispatch(petActions.setError({ error: true }))
        } else {
            if (isEdit === true) {
                dispatch(editPet(newPet, petModal, selection))
            } else {
                dispatch(addPet(newPet, petModal))
            }
            setPetModal({})
            setNewPet('')
        }

    }
    function addIngred(level, name) {
        let newArr = { ...petModal }

        newArr[name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()] = level
        setPetModal(newArr)
    }

    function deleteIngred(pet) {
        let newArr = () => {
            let result = {}
            for (var key in petModal) {
                if (key !== pet) {
                    result[key] = petModal[key]
                }
            }
            return result
        }
        setPetModal(newArr);
    }
    function makeSelection(index) {
        dispatch(petActions.setSelection({ select: index }))
    }
    function showResults() {
        console.log('Home.js showresults')
        dispatch(petActions.setViewType({ viewtype: true }))
    }
    function showIngred() {
        dispatch(petActions.setViewType({ viewtype: false }))
    }
    function deletePet() {
        dispatch(delPet(selection))
    }
    function beginSearching() {
        dispatch(searchResult(selection))
    }
    function editPetModal() {
        setNewPet(pets[selection].name)
        setPetModal(pets[selection].ingreds)
        dispatch(petActions.setModal({ modal: true }))
        dispatch(petActions.isEdit({ editing: true }))
    }
    function logout() {
        dispatch(petActions.resetPet())
        dispatch(authActions.resetAuth())
    }

    function menuClicked() {
        dispatch(petActions.setSideMenu({sideMenu: true}))
    }

    function cancelMenu() {
        console.log('side pressed')
        dispatch(petActions.setSideMenu({sideMenu: false}))
    }

    const emptyPet = <div className={classes.emptyBlock}>
        <p>Start by adding a new pet!</p>
        <div onClick={onModal}>Add</div>
    </div>

    const isEmpty = pets.length === 0 ? true : false

    return (
        <div className={classes.outer}>
            <div className={classes.header}>
                <div className={classes.logo}>
                    <img src={logo} alt='logo' />
                </div>
                {/* <div className={classes.cat}>
                    <span>Category</span>
                </div> */}
                <div className={classes.cust}>
                    <span>Customize</span>
                </div>
                <div className={classes.profile} onClick={logout}>
                    <img src={profilepic} alt='Logout' />
                </div>
            </div>
            <div className={classes.body}>
                <div className={classes.sideMenuBack} style={{ display: sideMenu ? 'block' : 'none' }} onClick={cancelMenu}></div>
                <div className={classes.leftBody} >
                    <div className={classes.leftHeader}>
                        <span>Pets</span>
                        <span onClick={onModal}>+</span>
                    </div>
                    <ul className={classes.petList}>
                        {
                            pets.map((item, index) => (
                                <li key={index} onClick={() => makeSelection(index)}>
                                    <PetSlot pet={item} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {
                    matches && <div className={classes.leftBody1} style={{ display: sideMenu ? 'block' : 'none' }} >
                        <div className={classes.leftHeader}>
                            <span>Pets</span>
                            <span onClick={onModal}>+</span>
                        </div>
                        <ul className={classes.petList}>
                            {
                                pets.map((item, index) => (
                                    <li key={index} onClick={() => makeSelection(index)}>
                                        <PetSlot pet={item} />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }

                <div className={classes.rightBody}>
                    {
                        isEmpty ? emptyPet : <div className={classes.petHeader}>
                            <div>
                                <span className={classes.petName}>{pets[selection].name}</span>
                            </div>
                            <div>
                                <div className={classes.petEditButton} onClick={editPetModal}>
                                    <img src={edit} alt='edit' />
                                    <span>Edit</span>
                                </div>
                                <div className={classes.petDeleteButton} onClick={deletePet}>
                                    Delete
                        </div>
                            </div>
                            <div>
                                <span style={{ color: viewType ? 'black' : '#7E8589' }} onClick={showResults}>Result</span>
                                <span style={{ color: viewType ? '#7E8589' : 'black' }} onClick={showIngred}>Ingredients</span>
                            </div>
                        </div>

                    }
                    {isEmpty ? null : viewType ? <Results pet={pets[selection]} /> : <Ingredients searching={beginSearching} pet={pets[selection]} sel={selection} />}
                </div>
            </div>
            {modal && <IngredModal isEditing={isEdit} petValue={newPet} changing={addingPetModal} err={error} load={loading} addPet={addNewPet} pets={petModal} add={addIngred} delete={deleteIngred} onCancel={onCancel} />}
            {isDelete && <SpinningModal />}
            <div className={classes.fixedMenu} onClick={menuClicked}>
                <img src={menu} />
            </div>
        </div>
    )
}

export default Home