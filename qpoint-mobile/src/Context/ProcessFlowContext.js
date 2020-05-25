import {AsyncStorage} from 'react-native'
import createDataContext from './createDataContext'
import qpointApi from '../api/qpointApi'
import {navigate} from '../navigationRef'

const ProcessFlowReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_classes':
            return action.payload
        default:
            return state   
    }
};

const fetchClasses = dispatch => async () => {
    const response = await qpointApi.post('/class/show-all-classes')
    // console.log(response.data)
    dispatch({type: 'fetch_classes',payload:response.data})
}

export const {Provider, Context} = createDataContext(
    ProcessFlowReducer,
    {fetchClasses},
    []
    
)