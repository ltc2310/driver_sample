export const types = {
    ADD_DRIVER : 'ADD_DRIVER',
    EDIT_DRIVER : 'EDIT_DRIVER',
    REMOVE_DRIVER: 'REMOVE_DRIVER',
}

export const actions = {

    addDriver : ( driver ) => {
        return { type : types.ADD_DRIVER , driver }
    },

    editDriver : ( payload ) => {
        return {type: types.EDIT_DRIVER, payload }
    },

    removeDriver : ( id ) => {
        return {type: types.REMOVE_DRIVER, id }
    }
}