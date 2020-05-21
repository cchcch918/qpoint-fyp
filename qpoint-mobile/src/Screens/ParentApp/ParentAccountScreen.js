import React, {useContext} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import {Button} from 'react-native-elements'
import Spacer from '../../component/spacer'
import {Context as AuthContext} from '../../Context/AuthContext'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import AccountComponent from '../../component/AccountComponent'

const ParentAccountScreen = ({navigation}) => {
    
    return <>
        <SafeAreaView forceInset = {{top: 'always'}}>
            <AccountComponent
                navigation = {navigation}
            />
        </SafeAreaView>
    </>
}

ParentAccountScreen.navigationOptions = {
    title: 'Account',
    tabBarIcon: <MaterialCommunityIcons name='account' size={20}/>
}

const styles = StyleSheet.create({

})

export default ParentAccountScreen;