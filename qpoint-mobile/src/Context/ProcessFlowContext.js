import {AsyncStorage} from 'react-native'
import createDataContext from './createDataContext'
import qpointApi from '../api/qpointApi'
import {navigate} from '../navigationRef'

const ProcessFlowReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_classes':
            return action.payload
        case 'fetch_behaviours':
            return action.payload
        case 'add_behaviours':
            return action.payload
        case 'fetch_parent_details':
            return action.payload
        case 'fetch_behaviour_records':
            return action.payload;
        default:
            return state   
    }
};

const fetchClasses = dispatch => async () => {
    const response = await qpointApi.post('/class/show-all-classes')
    // console.log(response.data)
    dispatch({type: 'fetch_classes',payload:response.data})
}

const fetchBehaviours = dispatch => async () => {
    const response = await qpointApi.post('/behaviour/show-all-behaviours')
    dispatch({type: 'fetch_behaviours', payload: response.data})
}

const addBehaviours = dispatch => async (behaviourList,studentList,staffId) => {
    const response = await qpointApi.post('/student-behaviour-record/add-behaviours-to-students',{
        behaviourList,
        studentList,
        staffId
    })
    alert("added")
    dispatch({type: 'add_behaviours', payload: response.data})
    navigate('ScanQR')
}

const fetchParentDetails = dispatch => async (parentEmail) => {
    const response = await qpointApi.post('/parent/show-parent-details',{parentEmail})
    
    dispatch({type: 'fetch_parent_details', payload: response.data})
}

const fetchBehaviourRecords = dispatch => async (studentId) => {
    const response = await qpointApi.post('/student-behaviour-record/get-student-behaviour-records',{studentId})
    
    dispatch({type: 'fetch_behaviour_records', payload: response.data})
}

export const {Provider, Context} = createDataContext(
    ProcessFlowReducer,
    {fetchClasses, fetchBehaviours, addBehaviours, fetchParentDetails, fetchBehaviourRecords},
    []
    
)