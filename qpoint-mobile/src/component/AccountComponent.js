import React, {useState,useContext} from 'react'
import {Text, Button, Input} from 'react-native-elements'
import {StyleSheet,TouchableOpacity,View} from 'react-native'
import Spacer from './spacer'
import {Context as AuthContext} from '../Context/AuthContext'
import { Entypo } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 



const AccountComponent = ({navigation}) => {
    const {signout} = useContext(AuthContext);

    return (
        <View>
            <View>
                <TouchableOpacity style = {styles.iconText}
                    onPress = {() => {navigation.navigate('changePassword')}}
                >
                    <Entypo name="lock" size={24} color="black" /> 
                    <Text>Change Password</Text>
                    
                </TouchableOpacity>
            </View>
            <Spacer/>
            <TouchableOpacity
                onPress = {signout}
                style = {styles.iconText}
            >   
                <SimpleLineIcons name="logout" size={24} color="black" />
                <Text>Log out</Text>
            </TouchableOpacity>
            
        </View>
    )

};

const styles = StyleSheet.create({
    iconText: {
        flexDirection: 'row', 
        

    }
    
})

export default AccountComponent;