import {SIGN_IN,SIGN_OUT, RESTORE_TOKEN, RESTORE_INFO} from '../actions/types'

const initialState = {
    userToken: null,
    isLoading: true,
    isStaff: false,
    username: null,
    email: null,
    staffId: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case RESTORE_TOKEN:
            if(action.payload.status === 'staff'){
                return{
                    ...state,
                    userToken: action.payload.token,
                    isLoading: false,
                    isStaff: true,
                }
            }else
                return{
                    ...state,
                    userToken: action.payload.token,
                    isLoading: false,
                    isStaff: false
                }

        case RESTORE_INFO:
            if(action.payload.status === 'staff'){
                return{
                    ...state,
                    userToken: action.payload.token,
                    isLoading: false,
                    isStaff: true,
                    username: action.payload.username,
                    email: action.payload.email,
                    staffId: action.payload.staffId
                }
            }else
                return{
                    ...state,
                    userToken: action.payload.token,
                    email: action.payload.email,
                    isLoading: false,
                    isStaff: false
                }
                
        case SIGN_IN:
            if(action.payload.status === 'staff'){
                return{
                    ...state,
                    userToken: action.payload.token,
                    isLoading: false,
                    isStaff: true,
                    username: action.payload.username,
                    email: action.payload.email,
                    staffId: action.payload.staffId
                }
            }else
                return{
                    ...state,
                    userToken: action.payload.token,
                    isLoading: false,
                    isStaff: false,
                    username: action.payload.username,
                    email: action.payload.email
                }
        case SIGN_OUT:
            return {
                ...state,
                userToken: null,
                userName: null,
                isLoading: false,
                username: null,
                email: null,
                staffId: null
            };
        default:
            return state;
    }
}

export default authReducer;