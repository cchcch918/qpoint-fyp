import React, {useContext} from 'react'
import {View,Text,StyleSheet} from 'react-native'

import AuthForm from '../component/AuthForm'
import {Context} from '../Context/AuthContext'


const SigninScreen = () => {
    const {state, signin} = useContext(Context);

    return(
        <View style = {styles.container}>
           
            <AuthForm
                headerText = 'Sign in to Qpoint'
                errorMessage = {state.errorMessage}
                onSubmit = {signin}
                submitButtonText = 'Sign In'
            />
        </View>
    )
}

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false      
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 200
    },
})

// const SigninScreen = () => {
//     return(
//         <View>
//             <Text>Hello</Text>
//         </View>
//     )
// }

export default SigninScreen;