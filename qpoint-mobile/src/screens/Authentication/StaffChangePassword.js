import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import Background from '../../components/Background';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';
import {
  passwordValidator,
  comparePasswordValidator
} from '../../core/utils';
import {useSelector} from 'react-redux'
import qpointApi from '../../api/qpointApi'
import AsyncStorage from '@react-native-community/async-storage';
import {Header, Icon, Button} from 'react-native-elements'

const StaffChangePassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState({ value: '', error: '' });
  const [newPassword, setNewPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const username = useSelector(state => state.authReducer.username)
  const parentEmail = useSelector(state => state.authReducer.email)

  const _onButtonPressed = async (oldpassword, newpassword) => {
    const oldPasswordError = passwordValidator(oldPassword.value);
    if (oldPasswordError) {
      setOldPassword({ ...oldPassword, error: oldPasswordError });
      return;
    }
    const newPasswordError = passwordValidator(newPassword.value);
    if (newPasswordError) {
      setNewPassword({ ...newPassword, error: newPasswordError });
      return;
    }
    const confirmPasswordError = passwordValidator(confirmPassword.value);
    if (confirmPasswordError) {
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
      return;
    }

    const comparePasswordError = comparePasswordValidator(newPassword.value, confirmPassword.value);
    if (comparePasswordError) {
      setConfirmPassword({ ...confirmPassword, error: comparePasswordError });
      return;
    }

    const status = await AsyncStorage.getItem('status')
    if(status == 'staff'){
      // console.log(password.value)
      const response = await qpointApi.post(`/${status}/auth/change-password`,{username, password:newpassword.value});
      if(response.data.result == "SUCCESS"){
        showAddedToast()
        navigation.goBack()
      } else
          return
      
    }
    else {
      const response = await qpointApi.post(`/${status}/change-parent-password`,{parentEmail, oldPassword: oldpassword.value, newPassword: newpassword.value})
      .catch(err => {
        setOldPassword({ ...oldPassword, error: err.response.data.errorMessage })
        return;
      })
      if(response.data.result == "SUCCESS"){
        showAddedToast()
        navigation.goBack()
      } else
          return
    }
    
  };

  const showAddedToast = () => {
    ToastAndroid.show("Password Changed Successfully", ToastAndroid.LONG);
  };

  return (
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
            <Text style={{fontSize:20,color:'white'}}>Change Password</Text>
        }
        containerStyle = {{height:90, backgroundColor:theme.colors.primary, borderBottomColor:'transparent'}}
      />
      <View style={{
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        }}>
        <TextInput
          label="Old Password"
          value={oldPassword.value}
          onChangeText={text => setOldPassword({ value: text, error: '' })}
          error={!!oldPassword.error}
          errorText={oldPassword.error}
          secureTextEntry
        />

        <TextInput
          label="New Password"
          value={newPassword.value}
          onChangeText={text => setNewPassword({ value: text, error: '' })}
          error={!!newPassword.error}
          errorText={newPassword.error}
          secureTextEntry
        />

        <TextInput
          label="Confirm New Password"
          returnKeyType="done"
          value={confirmPassword.value}
          onChangeText={text => setConfirmPassword({ value: text, error: '' })}
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry
        />

        <Button  
          title='Submit'
          onPress={()=>_onButtonPressed(oldPassword, confirmPassword)} 
          buttonStyle = {{backgroundColor:theme.colors.primary}}
          containerStyle = {{marginTop:24, width:150}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default StaffChangePassword;