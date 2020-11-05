import React from 'react'
import {View,StyleSheet} from 'react-native'
import { ListItem, Icon, Header,Text,SearchBar,Button,Avatar,Image, } from 'react-native-elements'
import {theme} from '../core/theme'
import qpointApi from '../api/qpointApi'

const LeaderboardScreen = ({navigation}) => {
    return(
        <View style={{flex:1}}>
            <Header
                leftComponent = {
                    <Icon
                        name = 'arrow-left'
                        type = 'material-community'
                        size = {30}
                        iconStyle = {{color:'white'}}
                        onPress = {()=> navigation.goBack() }
                    />
                }
                centerComponent = {
                    <Text style = {{fontSize: 20,color:'white'}}>Leaderboard</Text>
                }
                containerStyle = {{height:100, backgroundColor:theme.colors.primary}}
            />
        </View>
    )
}

export default LeaderboardScreen;