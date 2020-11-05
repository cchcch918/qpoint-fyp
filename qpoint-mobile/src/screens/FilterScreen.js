import React from 'react'
import {View, Text} from 'react-native'
import {ListItem,Header,Icon,SearchBar } from 'react-native-elements'
import {theme} from '../core/theme'

const FilterScreen = ({navigation}) => {
    return(
        <View>
            <Header
                leftComponent = {
                    <Icon
                        name = 'arrow-left'
                        type = 'material-community'
                        onPress = {()=>navigation.goBack()}
                        size = {30}
                    />
                }
                centerComponent = {
                    <Text style = {{fontSize:20}}>
                        Filter
                    </Text>
                }
                containerStyle = {{height:100, backgroundColor:theme.colors.primary}}
            />
        </View>
    )
}

export default FilterScreen