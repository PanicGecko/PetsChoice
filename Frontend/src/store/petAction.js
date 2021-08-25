import { petActions } from '../store/pets'
import {authActions} from '../store/auth'
import Root from './Constants'

export const addPet = (name1, ingreds) => {
    return async dispatch => {
        dispatch(petActions.setLoading({ load: true }))
        const name2 = name1.charAt(0).toUpperCase() + name1.slice(1).toLowerCase()
        const body = {name: name2, ingreds: ingreds, link: 0, updated: true}
        fetch(
            Root + '/customize/add',
            {
                method: 'POST',
                headers: new Headers({
                    'authorization': localStorage.getItem('token')
                }),
                body: JSON.stringify(body)
            }
        ).then(response => response.json())
            .then(data => {
                console.log('petAction.js in addPet fetch code: ' + data.code)
                if (data.code === 200) {
                    dispatch(petActions.addPet({pet: body}))
                    dispatch(petActions.setError({error: false}))
                    dispatch(petActions.setLoading({ load: false }))
                    dispatch(petActions.setModal({ modal: false }))
                } else if (data.code === 300){
                    dispatch(petActions.resetPet())
                    dispatch(authActions.resetAuth())
                } else {
                    dispatch(petActions.setError({error: false}))
                    dispatch(petActions.setLoading({ load: false }))
                }
            })
            .catch((error) => {
                console.error('Error in petAction.js in addPet error: ' + error)
                dispatch(petActions.setError({error: true}))
                dispatch(petActions.setLoading({ load: false }))
            })
        
    }
}

export const delIngred = (selection, index) => {
    return async dispatch => {
        dispatch(petActions.isDeleting({delete: true}))
        fetch(
            Root + '/customize/delIngred',
            {
                method: 'POST',
                headers: new Headers({
                    'authorization': localStorage.getItem('token')
                }),
                body: JSON.stringify({
                    selection: selection,
                    index: index
                })
            }
        ).then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                console.log('in delIngred when code = 200')
                dispatch(petActions.deleteIngred({selection: selection, ing: index}))
                dispatch(petActions.isDeleting({delete: false}))
            }else if (data.code === 300){
                dispatch(petActions.resetPet())
                dispatch(authActions.resetAuth())
            } else {
                dispatch(petActions.isDeleting({delete: false}))
            }
        })
        .catch((error) => {
            console.error('Error in petAction.js in addPet error: ' + error)
            dispatch(petActions.isDeleting({delete: false}))
        })
    }
}

export const delPet = (selection) => {
    return async dispatch => {
        dispatch(petActions.isDeleting({delete: true}))
        fetch(
            Root + '/customize/delPet',
            {
                method: 'POST',
                headers: new Headers({
                    'authorization': localStorage.getItem('token')
                }),
                body: JSON.stringify({
                    selection: selection
                })
            }
        ).then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                dispatch(petActions.deletePet())
                dispatch(petActions.isDeleting({delete: false}))
            }else if (data.code === 300){
                dispatch(petActions.resetPet())
                dispatch(authActions.resetAuth())
            } else {
                dispatch(petActions.isDeleting({delete: false}))
            }
        })
        .catch((error) => {
            console.error('Error in petAction.js in delPet error: ' + error)
            dispatch(petActions.isDeleting({delete: false}))
        })
    }
}

export const searchResult = (selection) => {
    return async dispatch => {
        dispatch(petActions.isDeleting({delete: true}))
        fetch(
            Root + '/result/search',
            {
                method: 'POST',
                headers: new Headers({
                    'authorization': localStorage.getItem('token')
                }),
                body: JSON.stringify({
                    selection: selection
                })
            }
        ).then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                dispatch(petActions.setLinks({selection: selection, links: data.result}))
            } else if (data.code === 300){
                dispatch(petActions.resetPet())
                dispatch(authActions.resetAuth())
            } 
         dispatch(petActions.isDeleting({delete: false}))
            
        })
        .catch((error) => {
            console.error('Error in petAction.js in delPet error: ' + error)
            dispatch(petActions.isDeleting({delete: false}))
        })
    }
}

export const searchResults = (selection, page) => {
    return async dispatch => {
        dispatch(petActions.isDeleting({delete: true}))
        fetch(
            Root + '/result/getResults',
            {
                method: 'POST',
                headers: new Headers({
                    'authorization': localStorage.getItem('token')
                }),
                body: JSON.stringify({
                    selection: selection,
                    page: page
                })
            }
        ).then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                if(page === 1){
                    dispatch(petActions.setResults({results: data.results, more: data.more, selection: selection}))
                } else {
                    dispatch(petActions.addResults({results: data.results, more: data.more}))
                }
                dispatch(petActions.isDeleting({delete: false}))
            } else if (data.code === 300){
                dispatch(petActions.resetPet())
                dispatch(authActions.resetAuth())
            } else {
                dispatch(petActions.isDeleting({delete: false}))
            }
        })
        .catch((error) => {
            console.error('Error in petAction.js in delPet error: ' + error)
            dispatch(petActions.isDeleting({delete: false}))
        })
    }
}

export const editPet = (name1, ingreds, selection) => {
    return async dispatch => {
        dispatch(petActions.setLoading({ load: true }))
        const name2 = name1.charAt(0).toUpperCase() + name1.slice(1).toLowerCase()
        const body = {name: name2, ingreds: ingreds, selection: selection}
        fetch(
            Root + '/customize/edit',
            {
                method: 'POST',
                headers: new Headers({
                    'authorization': localStorage.getItem('token')
                }),
                body: JSON.stringify(body)
            }
        ).then(response => response.json())
            .then(data => {
                console.log('petAction.js in addPet fetch code: ' + data.code)
                if (data.code === 200) {
                    dispatch(petActions.editPet({name: name2, ingreds: ingreds, selection: selection}))
                    dispatch(petActions.setError({error: false}))
                    dispatch(petActions.setLoading({ load: false }))
                    dispatch(petActions.setModal({ modal: false }))
                    dispatch(petActions.isEdit({editing: false}))
                }else if (data.code === 300){
                    dispatch(petActions.resetPet())
                    dispatch(authActions.resetAuth())
                } else {
                    dispatch(petActions.setLoading({ load: false }))
                    dispatch(petActions.setError({error: true}))
                }
            })
            .catch((error) => {
                console.error('Error in petAction.js in addPet error: ' + error)
                dispatch(petActions.setError({error: true}))
                dispatch(petActions.setLoading({ load: false }))
            })
        
    }
}
