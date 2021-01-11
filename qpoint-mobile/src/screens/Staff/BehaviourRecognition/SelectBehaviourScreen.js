import React,{useState,useEffect} from 'react'
import {View,FlatList,StyleSheet,Dimensions, ToastAndroid,TouchableOpacity} from 'react-native'
import qpointApi from '../../../api/qpointApi'
import {useSelector,useDispatch} from 'react-redux'
import { Card, ListItem, Button, Icon, Header,Text,SearchBar, colors } from 'react-native-elements'
import {theme} from '../../../core/theme'
import { ScrollView } from 'react-native-gesture-handler'
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import {setInitialFilter} from '../../../actions/mainflow'

const SelectBehaviourScreen = ({route,navigation}) => {
    const dispatch = useDispatch();
    const {student} = route.params
    // console.log(student)
    const [behaviours,setBehaviours] = useState([])
    // console.log(behaviours)
    const [selectedBehaviours,setSelectedBehaviours] = useState([])
    const [totalPoint,countTotalPoint] = useState(0)
    const [isModalVisible, setModalVisible] = useState(false);
    const [search,setSearch] = useState('')
    const [FilteredData,setFilteredData] = useState(null)
    const [selectedPicker,setPicker] = useState(null)
    
    const INITIAL_FILTERED = useSelector(state => state.mainFlowReducer.filteredData.filteredData)
    // console.log(INITIAL_FILTERED)
    
    useEffect(() => {
        const getBehaviour = async () => {  
          const response = await qpointApi.post('/behaviour/show-all-behaviours')
          setBehaviours(response.data)
        }
        getBehaviour()
    },[])

    const showErrorToast = () => {
        ToastAndroid.show("Please select at least 1 behaviour", ToastAndroid.LONG);
      };
    
    
    
    let studentList = []
    let behaviourList = []
    
    for(const item of selectedBehaviours){
        behaviourList.push(item.id)
    }

    const onButtonPressed = () => {
        let recordList = []
        for(const ele of student){
            studentList.push(ele.studentId)
            for(const item of selectedBehaviours){
                let record = {}
                record.fullName = ele.fullName
                record.className = ele.class.className
                record.studentId = ele.studentId
                record.behaviour = item.behaviour
                record.behaviourPoint = item.point
                record.behaviourId = item.id
                recordList.push(record)
            }
        }
        if(selectedBehaviours.length>0){
            navigation.navigate('ConfirmBehaviour',{record:recordList,studentList,behaviourList})
        }
        else{
            showErrorToast()
        }
    }

    const checkBehaviourList = (item) => {
        if(!selectedBehaviours.some(obj =>  JSON.stringify(obj) === JSON.stringify(item))){
            setSelectedBehaviours([...selectedBehaviours,item])
            countTotalPoint(totalPoint+item.point)
        }
        else{
            setSelectedBehaviours(selectedBehaviours.filter(obj => JSON.stringify(obj) !== JSON.stringify(item)))
            countTotalPoint(totalPoint-item.point)
        }
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const searchFilter = (text) => {
        // console.log(text==[])
        // console.log(studentRecords.data)
        setSearch(text)
        if(selectedPicker){
            if(text!=[]){
                let filteredData = INITIAL_FILTERED.filter(item=>item.behaviourName.toLowerCase().includes(text.toLowerCase()))
                setFilteredData(filteredData)
            }else{
                setFilteredData(INITIAL_FILTERED)
            }
        }else{
            if(text!=[]){
                let filteredData = behaviours.filter(item=>item.behaviourName.toLowerCase().includes(text.toLowerCase()))
                setFilteredData(filteredData)
            }else{
                setFilteredData(null)
            }
        }
    }

    const updateFIlterState = (filteredData) => {
        dispatch(setInitialFilter(filteredData))
    }

    const applyFilter = () => {
        if(selectedPicker === 'positive'){
            let filteredData = behaviours.filter(item=> item.behaviourPoint>0)
            // console.log(filteredData)
            setFilteredData(filteredData)
            updateFIlterState(filteredData)
        }
        if(selectedPicker === 'negative'){
            let filteredData = behaviours.filter(item => item.behaviourPoint < 0)
            setFilteredData(filteredData)
            updateFIlterState(filteredData)
        }

    }

    const data = [
        {label:'Positive Behaviour',value:'positive'},
        {label:'Negative Behaviour',value:'negative'},
      ];

    return(
        <View style ={{flex:1}}>
            <Modal
                isVisible={isModalVisible}
                backdropColor = 'grey'
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={{backgroundColor:'white',height:300}}>
                    <Text
                        style = {{
                            alignSelf:"center",
                            padding :15,
                            fontSize: 20
                        }}
                    >
                        Filter Behaviours
                    </Text>

                    <View style = {{flexDirection:'row',alignItems:'center'}}>
                        <Text style={Styles.filterText}>Behaviour Type:</Text>
                        <DropDownPicker
                            items = {data} 
                            defaultValue = {selectedPicker}
                            placeholder = "Select Behaviour Type"
                            itemStyle = {{justifyContent:'flex-start'}}
                            labelStyle={{
                                fontSize: 15,
                                textAlign: 'left',
                                color: '#000'
                            }}
                            placeholderStyle = {{color:'grey'}}
                            containerStyle={{height: 40,width:200}}
                            style={{ backgroundColor: '#ffffff' }}
                            dropDownStyle={{ backgroundColor: 'white' }}
                            onChangeItem = {item=>setPicker(item.value)}
                        />
                    </View>

                    <View style={{flex:1,justifyContent:'flex-end'}} >
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <Button
                                title = "Apply Filter"
                                buttonStyle = {{
                                    backgroundColor: theme.colors.primary
                                }}
                                containerStyle = {{margin:20,borderRadius:10}}
                                onPress ={()=>{
                                    applyFilter()
                                    toggleModal()
                                }}
                            />
                            <Button
                                title = "Clear Filter"
                                buttonStyle = {{
                                    backgroundColor: 'grey'
                                }}
                                containerStyle = {{margin:20,borderRadius:10}}
                                onPress ={()=>{
                                    setFilteredData(null)
                                    setPicker(null)
                                    toggleModal()
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <Header
                leftComponent = {
                <Icon
                    name = 'arrow-left'
                    type = 'material-community'
                    size = {30}
                    onPress = {()=> navigation.goBack() }
                    iconStyle = {{color:'white'}}
                />
                }
                centerComponent = {
                    <SearchBar
                        round
                        searchIcon={{ size: 24 }}
                        placeholder="Search behaviours..."
                        value = {search}
                        containerStyle = {{width:250, backgroundColor:'transparent', borderTopWidth: 0, borderBottomWidth: 0}}
                        inputContainerStyle = {{backgroundColor: 'white'}}
                        onChangeText = {searchFilter}
                    />
                }
                rightComponent = {
                    <Icon 
                        name = 'filter' 
                        type = 'material-community' 
                        containerStyle = {{marginRight:5}} 
                        onPress = {()=>toggleModal()}
                        reverse
                        reverseColor = {theme.colors.primary}
                        color = 'white'
                        size = {18}
                    />
                }
                containerStyle = {{height:100, backgroundColor:theme.colors.primary}}
            />
            {selectedBehaviours.length > 0 ? 
            <View style={Styles.listContainer}>
                <Text style={{alignSelf:'center',marginLeft:10}}>Selected Behaviours:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator = {false}>
                    <FlatList
                        data = {selectedBehaviours}
                        keyExtractor = {(item => item.behaviour)}
                        contentContainerStyle = {Styles.list}
                        renderItem = {({item}) => {
                            return(
                                <TouchableOpacity style={Styles.item} onPress = {()=>{checkBehaviourList(item)}}>
                                    <Text>{item.behaviour}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </ScrollView>
            </View>
            :
            null
            }
            
            <FlatList
                horizontal = {false}
                data = {FilteredData ? FilteredData : behaviours}
                keyExtractor = {(item,behaviourId)=>behaviourId.toString()}
                renderItem = {({item}) => {
                    return(
                        <TouchableOpacity 
                            style = {[Styles.behaviour, {backgroundColor: item.behaviourPoint > 0 ? '#8bb684' : '#ff3961'}]} 
                            onPress = {()=>{checkBehaviourList({behaviour:item.behaviourName,point:item.behaviourPoint,id:item.behaviourId})}}
                        >
                            <Text>{item.behaviourName}</Text> 
                            <Text>{item.behaviourPoint}</Text>
                        </TouchableOpacity>
                    )
                }}
                numColumns = {2}
            />

            <View style = {{flexDirection:'row',backgroundColor:'white',height:60}}>
                <View style={{justifyContent:'center',marginLeft:15,}}>
                    <Text style={{color:'grey'}}>Total Points: {totalPoint}</Text>
                </View>
                <Button
                    title = 'Proceed'
                    containerStyle = {{backgroundColor:'red',position:'absolute', left:310,top:10}}
                    buttonStyle = {{backgroundColor:theme.colors.primary}}
                    onPress = {()=>onButtonPressed()}
                />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    behaviour: {
        height:150,
        flex:1,
        maxWidth: Dimensions.get('window').width / 2 - 10, 
        justifyContent: 'center',
        alignItems:'center',    
        marginHorizontal:15,
        marginTop:20,
        backgroundColor: theme.colors.secondary,
        borderRadius:12,
        elevation: 3,
        
      },
    list: {
        flexDirection:'row',
        paddingVertical:10,
        marginHorizontal:5,
        // backgroundColor:'blue',
        width: '100%',
        alignSelf:'flex-start'
    },
    item: {
        backgroundColor: theme.colors.secondary,
        marginVertical:5,
        marginHorizontal:5,
        
        
    },
    listContainer:{
        flexDirection:'row',
        backgroundColor:'rgb(223,223,223)',
        paddingVertical:5
    },

    filterText:{
        marginHorizontal:15,
        fontSize:15
    }
})

export default SelectBehaviourScreen
