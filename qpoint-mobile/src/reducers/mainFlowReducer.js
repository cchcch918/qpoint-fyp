import {SET_INITIAL_FILTER} from '../actions/types'

const initialState = {
    filteredData: []
}

const mainFlowReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_INITIAL_FILTER:
            return{
                ...state,
                filteredData: action.payload
            }
       
        default:
            return state;
    }
}

export default mainFlowReducer;