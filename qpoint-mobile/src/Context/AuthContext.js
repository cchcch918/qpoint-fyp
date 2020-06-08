import {AsyncStorage} from 'react-native'
import createDataContext from './createDataContext'
import qpointApi from '../api/qpointApi'
import {navigate} from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            return action.payload
            // return {token: action.payload.token, status: action.payload.status}
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'signout':
            return {token:null, errorMessage:''}
        case 'changepassword':
            return action.payload
        default:
            return state   
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')
    const status = await AsyncStorage.getItem('status')
    const email = await AsyncStorage.getItem('email')
    const username = await AsyncStorage.getItem('username')
    const staffId = await AsyncStorage.getItem('staffId')
    const parentId = await AsyncStorage.getItem('parentId')
    if(token) {
        
        if (status === 'staff'){
            dispatch({type:'signin',payload: {token,status,email,username,staffId} })
            navigate(`${status}Screen`)
        }
        if (status === 'parent'){
            dispatch({type:'signin',payload: {token,status,email,parentId} })
            navigate(`${status}Screen`)
        }
    }   else {
        navigate('Signin')
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
  };



const signout =  (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type:'signout'})
    navigate('Signin')
}

const changePassword = (dispatch) => async({email,curPassword,newPassword}) => {
    // console.log(email,curPassword,newPassword)
    const response = await qpointApi.post('parent/change-parent-password', {
        parentEmail: email,
        oldPassword: curPassword,
        newPassword: newPassword
    })
    console.log(response.data)
    dispatch({type: 'changepassword', payload: response.data})
    navigate('Home')
}

const signin = (dispatch) => async ({username,password,status}) => {
    if(status === 'staff'){
        try {
            const response = await qpointApi.post(`/${status}/auth/login`,{username,password});
            await AsyncStorage.setItem('token',response.data.token);
            await AsyncStorage.setItem('status',status);
            await AsyncStorage.setItem('email',response.data.email);
            await AsyncStorage.setItem('username',username);
            await AsyncStorage.setItem('staffId',response.data.staffId.toString());
            dispatch({ type: 'signin', payload: 
                {
                    email: response.data.email, 
                    staffId: response.data.staffId, 
                    token: response.data.token, 
                    username
                }
            })
            // dispatch({ type: 'signin', payload: {token :response.data.token, status} })
            navigate(`${status}Screen`)
        } catch (err) {
            console.log(err)
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with sign in'
            })
        }
    }
    else if (status === 'parent'){
        try {
            const response = await qpointApi.post(`/${status}/parent-login`,{
                parentEmail: username,
                password
            });
            
            await AsyncStorage.setItem('token',response.data.token);
            await AsyncStorage.setItem('status',status);
            await AsyncStorage.setItem('email',response.data.email);
            await AsyncStorage.setItem('parentId',response.data.parentId.toString());
            dispatch({ type: 'signin', payload: 
                {
                    email: response.data.email, 
                    parentId: response.data.parentId, 
                    token: response.data.token, 
                }
            })
            navigate(`${status}Screen`)
        } catch (err) {
            console.log(err)
            dispatch({
                type: 'add_error',
                payload: 'Something went wrong with sign in'
            })
        }
    }
}





export const {Provider, Context} = createDataContext(
    authReducer,
    {signin,clearErrorMessage,tryLocalSignin,signout,changePassword},
    { token: null, errorMessage: '', status:'',staffId: '', parentId: ''}
    
)