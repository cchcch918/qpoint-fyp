import React, {useContext,useState} from 'react'
import {View,StyleSheet} from 'react-native'
import {Text, Button, Input} from 'react-native-elements'
import Spacer from '../component/spacer'
import {Context} from '../Context/AuthContext'



const changePasswordScreen = ({navigation}) => {
    const {state,changePassword} = useContext(Context)
    const email = state.email
    const [curPassword,setCurPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')
    return <>
        
            <Spacer>
                <Text h3>Change Password</Text>
            </Spacer>
            <Input 
                secureTextEntry
                label = 'Current Password' 
                value = {curPassword}
                onChangeText = {setCurPassword}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Spacer/>
            <Input 
                secureTextEntry
                label = 'New Password' 
                value = {newPassword}
                onChangeText = {setNewPassword}
                autoCapitalize = 'none'
                autoCorrect = {false}
            />
            <Spacer/>
            <Spacer>
                <Button title = 'Update Password' onPress={() => {
                    changePassword({email,curPassword,newPassword})
                }} />
                
            </Spacer>

        
    </>
}

changePasswordScreen.navigationOptions = {
    title: 'Change Password',
    headerStyle: {
        backgroundColor: '#ffe6cc',
        
      },
}

const styles = StyleSheet.create({
    
})

export default changePasswordScreen;