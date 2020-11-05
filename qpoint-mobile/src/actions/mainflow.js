import {SET_INITIAL_FILTER} from './types'

export const setInitialFilter = (data) => {
    return{
        type: SET_INITIAL_FILTER,
        payload: {filteredData: data}
    }
}

