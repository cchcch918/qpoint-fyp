import {AsyncStorage} from 'react-native'
import createDataContext from './createDataContext'
import qpointApi from '../api/qpointApi'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            return { errorMessage: '', token: action.payload}
        case 'add_error':
            return {...state, errorMessage: action.payload}
        // case 'clear_error_message':
        //     return { ...state, errorMessage: '' };
        // case 'signout':
        //     return {token:null, errorMessage:''}
        default:
            return state   
    }
};

// const tryLocalSignin = dispatch => async () => {
//     const token = await AsyncStorage.getItem('token')
//     if(token) {
//         dispatch({type:'signin',payload: token})
//         navigate('TrackList')
//     }   else {
//         navigate('Signup')
//     }
// }

// const clearErrorMessage = dispatch => () => {
//     dispatch({ type: 'clear_error_message' });
//   };



// const signout =  (dispatch) => async () => {
//     await AsyncStorage.removeItem('token');
//     dispatch({type:'signout'})
//     navigate('loginFlow')
// }

// const signup = (dispatch) =>  async ( {email,password}, callback ) => {
//     try{
//         const response = await trackerApi.post('/auth/register',{email,password});
//         await AsyncStorage.setItem('token',response.data.token);
//         dispatch({ type: 'signin', payload: response.data.token })

//         navigate('TrackList');
//     } catch (err) {
//         dispatch({type: 'add_error',payload: 'Something went wrong with sign up'})
//     }
// };

const signin = (dispatch) => async ({username,password}) => {
    try {
        const response = await qpointApi.post('/auth/login',{username,password});
        await AsyncStorage.setItem('token',response.data.token);
        dispatch({ type: 'signin', payload: response.data.token })
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        })
    }
}





export const {Provider, Context} = createDataContext(
    authReducer,
    {signin},
    { token: null, errorMessage: '' }
)