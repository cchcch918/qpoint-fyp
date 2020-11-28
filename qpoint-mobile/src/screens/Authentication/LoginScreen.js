import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';
import { emailValidator, passwordValidator } from '../../core/utils';
import DropDownPicker from 'react-native-dropdown-picker';
import qpointApi from '../../api/qpointApi'
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import {signIn} from '../../actions/auth'
import { Button } from 'react-native-elements';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [deviceId,setDeviceId] = useState(null)
  
  useEffect(()=>{
    const getToken = async () => {
      const token = await messaging().getToken();
      setDeviceId(token)
      // console.log(token)
    }
    getToken()
  },[])

  const asyncSignIn = async (status,email,password) => {
    if(status === 'staff'){
      const response = await qpointApi.post(`/${status}/auth/login`,{username:email.value, password:password.value});
      // console.log(response.data)
      await AsyncStorage.setItem('userToken',response.data.token)
      await AsyncStorage.setItem('status',status)
      dispatch(signIn(response.data,status));
    }
    if(status === 'parent'){
      const response = await qpointApi.post(`/${status}/parent-login`,{parentEmail:email.value, password:password.value,deviceId,devicePlatform:"ANDROID"});
      // console.log(response.data)
      await AsyncStorage.setItem('userToken',response.data.token)
      await AsyncStorage.setItem('status',status)
      dispatch(signIn(response.data,status));
    }
  }

  
  
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  

  // const _onLoginPressed = async (status,email,password) => {
  //   // const emailError = emailValidator(email.value);
  //   // const passwordError = passwordValidator(password.value);

  //   // if (emailError || passwordError) {
  //   //   setEmail({ ...email, error: emailError });
  //   //   setPassword({ ...password, error: passwordError });
  //   //   return;
  //   // }

  //   const response = await qpointApi.post(`/${status}/auth/login`,{username:email.value, password:password.value});
  //   const userToken = await AsyncStorage.setItem('userToken',response.data.token)
    
  // };

  const [status, setStatus] = useState(null);
  const data = [
    {label:'Staff',value:'staff'},
    {label:'Parent',value:'parent'},
  ];

  return (
    <Background>

      <Header>Welcome Back</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View>
      <DropDownPicker
          items={
              data
          }
          defaultValue = {null}
          placeholder = 'Select login status'
          containerStyle={{width: 250, height: 40, }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          style={{backgroundColor: '#fafafa', }}
          itemStyle={{justifyContent: 'flex-start'}}
          labelStyle={{
              fontSize: 15,
              textAlign: 'left',
              color: '#000'
          }}
          placeholderStyle = {{color:'grey'}}
          onChangeItem = {item => {
            setStatus(item.value)
              
          }}
      />
      </View>

      {/* <Layout style={styles.dropDownContainer} level='1'>
        <Select
          selectedIndex={selectedIndex}
          placeholder = 'Select login status'
          value={displayValue}
          onSelect={index => setStatus(data[index.row].value)}>
          <SelectItem title = 'Staff'/>
          <SelectItem title = 'Parent'/>
        </Select>
      </Layout> */}

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>


      
      <Button 
        title = 'LOGIN'  
        type="solid" 
        onPress={() => asyncSignIn(status,email,password)}
        buttonStyle = {styles.buttonStyle}
        titleStyle = {styles.text}
      />  
        

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  dropDownContainer: {
    width: 260,
    margin: 10
  },
  buttonStyle:{
    backgroundColor: theme.colors.primary,
    width: 200
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 20,
  },
});

export default LoginScreen;