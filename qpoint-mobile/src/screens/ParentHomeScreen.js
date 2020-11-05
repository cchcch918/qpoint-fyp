import React, {useState,useEffect  } from 'react';
import {View,FlatList,StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import { Card, ListItem, Icon, Header,Text,SearchBar,Button,Avatar,Image } from 'react-native-elements'
import {theme} from '../core/theme'
import qpointApi from '../api/qpointApi'
import { useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';




const ParentHomeScreen = ({navigation}) => {
  const email = useSelector(state => state.authReducer.email)
  // console.log(email)
  const [allChildren,setAllChildren] = useState([])
  const [selectedChild,setSelectedChild] = useState(null)
  const [childObject,setChildObject] = useState(null)

  useEffect(()=>{
    const getChildren = async () => {
      const response = await qpointApi.post('/parent/show-parent-details',{parentEmail:email})
      setAllChildren(response.data.children)
    }
    const getProfileImage = async () => {
      const response = await qpointApi.get('/student/get-student-profile-image/1-StudentA-20200928.jpg')
      // console.log(response)
    }
    getProfileImage()
    getChildren()
  },[])

  // console.log(selectedChild)
  // console.log(allChildren)
  // console.log('object',childObject[0])

  const getChild = async (id) => {
    const response = await qpointApi.post('/student-behaviour-record/get-students-point',{studentList:[id]})
    // console.log(response.data)
    setChildObject(response.data)
  }

  

  
  

  let data = []
  for(const item of allChildren){
    let temp = {}
    temp.label = item.fullName
    temp.value = item.studentId
    data.push(temp)
  }

  return (
    <View style={{flex:1}}>
      <Header
          centerComponent = {
            <Text style={{fontSize:20,color:'white'}}>Home</Text>
          }
          containerStyle = {{height:90, backgroundColor:theme.colors.primary, borderBottomColor:'transparent'}}
      />

      <View style={{margin:20}}>
        <DropDownPicker
          items={data}
          defaultValue = {selectedChild}
          placeholder="Select Child"
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          labelStyle={{
              fontSize: 15,
              textAlign: 'left',
              color: '#000'
          }}
          placeholderStyle = {{color:'grey'}}
          dropDownMaxHeight = {200}
          containerStyle={{height: 40}}
          style={{ backgroundColor: '#ffffff' }}
          dropDownStyle={{ backgroundColor: 'white' }}
          onChangeItem = {item => {
            getChild(item.value)
            setSelectedChild(item.value)
          }}
        />
      </View>

        {childObject?(
          <View style={{flex:1,}}>
            <ListItem
              leftElement = {()=>(
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <Avatar
                    size = 'large'
                    rounded
                    source={require('../../src/assets/doge.jpg')} 
                  />
                  {/* <Badge
                    status="success"
                    containerStyle={{ position: 'absolute', top: 70, left:70, }}
                  /> */}
                  <View style={{backgroundColor:'',marginLeft:30}}>
                    <Text style={styles.textStyle}>{childObject[0].fullName}</Text>
                    <Text style={styles.textStyle}>{childObject[0].class.className}</Text>
                    <Text style={styles.textStyle}>Total Behavioural Points: {childObject[0].totalBehaviourPoint}</Text>
                  </View>
                </View>
              )}
              containerStyle = {{marginHorizontal:20,borderRadius:10}}
            />
            <View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                  style = {styles.square}
                  onPress = {()=>navigation.navigate('ParentActivities',{childObject})}
                >
                  <Icon
                    name = 'monitor-dashboard'
                    type = 'material-community'
                    size = {95}
                    color = {theme.colors.secondary}
                  />
                  <Text style={styles.textStyle2}>Activities</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style = {styles.square}
                >
                  <Icon
                    name = 'shield-star'
                    type = 'material-community'
                    size = {95}
                    color = {theme.colors.secondary}
                  />
                  <Text style={styles.textStyle2}>Badges</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                  style = {styles.square}
                  onPress = {()=>navigation.navigate('Leaderboard')}
                >
                  <Icon
                    name = 'medal'
                    type = 'material-community'
                    size = {95}
                    color = {theme.colors.secondary}
                  />
                  <Text style={styles.textStyle2}>Leaderboard</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
           
        )   
        :
          null
        }
    </View>
    
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    justifyContent: 'flex-end',
    // fontWeight: 'bold',
    // color:'white'
    
  },
  square: {
    height:150,
    flex:1,
    maxWidth:168,
    justifyContent: 'center',
    alignItems:'center',    
    marginHorizontal:15,
    marginTop:20,
    backgroundColor:'white',
    borderRadius:12,
    elevation:5
  },
  textStyle2: {
    fontSize: 16,
    color: theme.colors.secondary,
    fontWeight:'bold',
  }
})

export default ParentHomeScreen;
