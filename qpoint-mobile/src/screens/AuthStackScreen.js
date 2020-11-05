import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import RegisterScreen from './RegisterScreen';

const AuthStack = createStackNavigator();

const AuthStackScreen = ({navigation}) => (
    <AuthStack.Navigator headerMode='none'>
        <AuthStack.Screen name="Login" component={LoginScreen}/>
        <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
        <AuthStack.Screen name="Register" component={RegisterScreen}/>
    </AuthStack.Navigator>
);

export default AuthStackScreen;