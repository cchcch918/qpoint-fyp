import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import {
  passwordValidator,
} from '../core/utils';
import {useSelector} from 'react-redux'
import qpointApi from '../api/qpointApi'
import AsyncStorage from '@react-native-community/async-storage';

const StaffChangePassword = ({navigation }) => {
  const [oldPassword, setOldPassword] = useState({ value: '', error: '' });
  const [newPassword, setNewPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
  const username = useSelector(state => state.authReducer.username)
  
  const _onButtonPressed = async (password) => {
    const passwordError = passwordValidator(oldPassword.value);
    if (passwordError) {
      setOldPassword({ ...oldPassword, error: passwordError });
      return;
    }
    const status = await AsyncStorage.getItem('status')
    const response = await qpointApi.post(`/${status}/auth/change-password`,{username, password:password.value});
    console.log(response.data)
    navigation.goBack()
  };

  return (
    <Background>

      <Header>Change Password</Header>

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

      <Button mode="contained" onPress={()=>_onButtonPressed(confirmPassword)} style={styles.button}>
        Submit
      </Button>

    </Background>
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