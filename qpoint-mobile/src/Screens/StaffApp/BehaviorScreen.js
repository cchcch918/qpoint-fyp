import React from 'react';
import { Text, View} from 'react-native';


const BehaviorScreen = ({navigation}) => {
    console.log(navigation.state)
    const student = navigation.state.params
    // console.log('student',student)
    return(
        <View>
            <Text>BehaviorScreen</Text>
           
            {/* <Text>{student}</Text> */}
        </View>
    )
}

export default BehaviorScreen;