import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SigninScreen from './src/Screens/SigninScreen'
import {Provider as AuthProvider} from './src/Context/AuthContext'


// import {Provider as AuthProvider} from './src/Context/AuthContext'

const Stack = createStackNavigator({
  Signin: SigninScreen
});

const App = createAppContainer(Stack)


export default () => {
  return(
    
        <AuthProvider>
          <App/>
        </AuthProvider>
      
  )
}