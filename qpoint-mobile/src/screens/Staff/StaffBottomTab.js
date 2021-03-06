import React, { memo } from 'react';
import StaffProfileScreen from '../StaffProfileScreen'
import ScanQrScreen from './BehaviourRecognition/ScanQrScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StaffActivityScreen from './StaffActivity/StaffActivityScreen'


const StaffTab = createBottomTabNavigator();

const StaffBottomTab = ({ navigation }) => {

  
  return(
    <StaffTab.Navigator>
      <StaffTab.Screen 
        name="Activity" 
        component={StaffActivityScreen} 
        options = {{
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="content-paste" color={color} size={size} />
          ),
        }}
        
      />
      <StaffTab.Screen 
        name="ScanQR" 
        component={ScanQrScreen} 
        options = {{tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
        ),}}
      />
      <StaffTab.Screen 
      name="Profile" 
      component={StaffProfileScreen}
      options = {{tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="account" color={color} size={size} />
      ),}}
      />
    </StaffTab.Navigator>
    
  )
}
  


export default memo(StaffBottomTab);