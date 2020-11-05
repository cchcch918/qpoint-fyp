import React, { memo } from 'react';
import StaffProfileScreen from './StaffProfileScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ParentHomeScreen from './ParentHomeScreen'
import NotificationScreen from './NotificationScreen'

const ParentTab = createBottomTabNavigator();

const ParentBottomTab = ({ navigation }) => {

  return(
    <ParentTab.Navigator>
      <ParentTab.Screen 
        name="Home" 
        component={ParentHomeScreen} 
        options = {{
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="content-paste" color={color} size={size} />
          ),
        }}
        
      />

      <ParentTab.Screen 
        name="Notification" 
        component={NotificationScreen}
        options = {{tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="bell" color={color} size={size} />
        ),}}
      />
      
      <ParentTab.Screen 
      name="Profile" 
      component={StaffProfileScreen}
      options = {{tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="account" color={color} size={size} />
      ),}}
      />
    </ParentTab.Navigator>
    
  )
}
  


export default memo(ParentBottomTab);