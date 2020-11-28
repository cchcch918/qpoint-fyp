import React from 'react'
import Background from '../components/Background';
import { TouchableOpacity, StyleSheet,View,FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {signOut} from '../actions/auth'
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../components/Button';
import { Avatar,Layout,Text } from '@ui-kitten/components';
import { ListItem, Header } from 'react-native-elements'
import {theme} from '../core/theme'

const StaffProfileScreen = ({navigation}) => {
    const username = useSelector(state => state.authReducer.username)
    const email = useSelector(state => state.authReducer.email)
    const dispatch = useDispatch();
    const signout = async () => {
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('status')
        dispatch(signOut());
      }

      
    const list = [
    {
        title: 'Change Password',
        icon: 'lock',
        method: function() {
            navigation.navigate('StaffChangePassword')
        }
    },
    {
        title: 'Sign Out',
        icon: 'replay',
        method: function() {
            console.log('logging out')
            signout()
        }
    },
    ]


    return(
        <View style = {styles.background}>
            <Header
                centerComponent = {
                    <Text style={{fontSize:20,color:'white'}}>Profile</Text>
                }
                containerStyle = {{height:90, backgroundColor:theme.colors.primary, borderBottomColor:'transparent'}}
            />
            <Layout style={styles.container} level='1'>
                <Avatar size='giant' source={require('../../src/assets/doge.jpg')}/>
                <View>
                    <Text style={styles.text} category = 'h4'>{username}</Text>
                    <Text style={styles.text} category = 'p2'>{email}</Text>
                </View>
            </Layout>
            <View>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                            onPress = {item.method}
                            bottomDivider
                            chevron
                        />
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 20,
      },
    background: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    text: {
        marginLeft: 15,
      },  
})

export default StaffProfileScreen;