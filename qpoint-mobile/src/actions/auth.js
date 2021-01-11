import {SIGN_IN,SIGN_OUT,RESTORE_TOKEN,RESTORE_INFO,CHANGE_PASSWORD, SET_LOADING} from './types'


export const signIn = (data,status) => {
    return{
        type: SIGN_IN,
        payload: {token: data.token ,username: data.username, email: data.email, status, staffId:data.staffId}
    }
}

export const signOut = () => (
    {
        type: SIGN_OUT,
    }
)

export const restoreToken = (token,status) => {
    return {
        type: RESTORE_TOKEN,
        payload: {token,status}
    }
}

export const restoreInfo = (token,data,status) => {
    return {
        type: RESTORE_INFO,
        payload: {token: token ,username: data.username, email: data.email, status, staffId:data.staffId}
    }
}

export const setLoading = () => {
    return {
        type: SET_LOADING,
    }
}

 