import {createSlice} from '@reduxjs/toolkit'

const initalState = {
    pets: [],
    loading: false,
    modal: false,
    error: false,
    selection: 0,
    deleting: false,
    viewType: false,
    results: [],
    page: 1,
    addSign: false,
    isEdit: false,
    sideMenu: false
}

const petSlice = createSlice({
    name: 'pets',
    initialState: initalState,
    reducers: {
        resetPet(state) {
            state.pets = []
            state.loading = false
            state.modal = false
            state.error = false
            state.selection = 0
            state.deleting = false
            state.viewType = false
            state.results = []
            state.page = 1
            state.addSign = false
            state.isEdit = false
        },
        setPet(state, action) {
            state.pets = action.payload.result
        },
        setLoading(state, action) {
            state.loading = action.payload.load
        },
        addPet(state, action) {
            state.pets.push(action.payload.pet)
            if(state.pets.length > 1)
            state.selection += 1
        },
        setModal(state, action) {
            state.modal = action.payload.modal
        },
        setError(state, action) {
            state.error = action.payload.error
        },
        setSelection(state, action) {
            state.selection = action.payload.select
            state.results = []
            state.page = 1
            state.addSign = false
            state.sideMenu = false
        },
        deleteIngred(state, action) {
            delete state.pets[action.payload.selection].ingreds[action.payload.ing]
            if(state.pets[action.payload.selection].link.length !== 0) {
                state.pets[action.payload.selection].updated = false
            }
        },
        isDeleting(state, action) {
            state.deleting = action.payload.delete
        },
        deletePet(state, action) {
            state.pets.splice(state.selection, 1)
            if(state.selection !== 0) {
                state.selection -= 1
            }
        },
        setViewType(state, action) {
            state.viewType = action.payload.viewtype
        },
        setResults(state, action) {
            if(action.payload.results.length > 0) {
                state.results = action.payload.results
                if(action.payload.more === 1) {
                    state.addSign = true
                    state.page += 1
                    state.pets[action.payload.selection].updated = false
                }
            }
        },
        addResults(state, action) {
            state.results.push(...action.payload.results)
            if(action.payload.more === 1) {
                state.addSign = true
                state.page += 1
            } else {
                state.addSign = false
            }
        },
        isEdit(state, action) {
            state.isEdit = action.payload.editing
        },
        editPet(state, action) {
            state.pets[action.payload.selection].name = action.payload.name
            state.pets[action.payload.selection].ingreds = action.payload.ingreds
            if(state.pets[action.payload.selection].updated === true && state.pets[action.payload.selection].link.length > 0){
                state.pets[action.payload.selection].updated = false
            }
        },
        setSideMenu(state, action) {
            state.sideMenu = action.payload.sideMenu
        },
        setLinks(state, action) {
            state.pets[action.payload.selection].link = action.payload.links
        }
    }
})

export const petActions = petSlice.actions
export default petSlice.reducer