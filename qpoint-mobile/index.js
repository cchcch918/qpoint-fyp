import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux'
import * as eva from '@eva-design/eva';
import confifureStore from './src/store';
import { ApplicationProvider} from '@ui-kitten/components';
import messaging from '@react-native-firebase/messaging'; 

const store = confifureStore();

messaging().setBackgroundMessageHandler(async remoteMessage => {
    // console.log('Message handled in the background!', remoteMessage);
});

const Qpoint = () => 
    <Provider store={store}>
        <ApplicationProvider {...eva} theme={eva.light}>
            <App />
        </ApplicationProvider>    
    </Provider>
    

AppRegistry.registerComponent(appName, () => Qpoint);

