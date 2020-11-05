import React,{useEffect,useState,useLayoutEffect} from 'react'
import {View,TouchableOpacity,StyleSheet,FlatList,Image,Platform} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import qpointApi from '../api/qpointApi'
import { ListItem,Header,Icon,SearchBar, Button,Text, colors } from 'react-native-elements'
import AwesomeAlert from 'react-native-awesome-alerts';
import {theme} from '../core/theme'
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {setInitialFilter} from '../actions/mainflow'

const StaffActivityScreen = ({route,navigation}) => {
    const dispatch = useDispatch();
    const staffId = useSelector(state => state.authReducer.staffId)
    const [studentRecords,setStudentRecords] = useState([])
    const [check,setCheck] = useState([])
    const [showAlert,setAlert] = useState(false)
    const [search,setSearch] = useState('')
    const [selectAll,setSelectAll] = useState(false)
    const [FilteredData,setFilteredData] = useState(null)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate,setSelectedDate] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const [staffClass,setStaffClass] = useState([])
    const [selectedClass,setSelectedClass] = useState(null)
    const INITIAL_FILTERED = useSelector(state => state.mainFlowReducer.filteredData.filteredData)
    
    useEffect(()=>{
        const getStaffClass = async () => {
            const response = await qpointApi.post('/class/show-only-all-classes')
            // console.log(response.data)
            setStaffClass(response.data)
        }

        const getStudentRecords = async () => {
            const response = await qpointApi.post('/student-behaviour-record/get-student-behaviour-records-by-staff',{staffId})
            // console.log(response.data)
            setStudentRecords(response.data)
        }
        const unsubscribe = navigation.addListener('focus', () => {
            // console.log('focus')
            getStudentRecords()
          });
        getStaffClass()
        return unsubscribe
    },[navigation])
    
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
     
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setSelectedDate(JSON.stringify(date))
        hideDatePicker();
      };

    const checked = (item) => {
        if(!check.includes(item)){
            setCheck([...check, item])
        }
        else{
            setCheck(check.filter(a => a !== item))
        }
    }   

    
    const checkAll = () => {
        setSelectAll(!selectAll)
        let allRecords = []
        if(FilteredData){
            allRecords = FilteredData.map(item => item.recordId)
        }
        else{
            allRecords = studentRecords.map(item => item.recordId)
        }
        if(!selectAll){
            // setCheck([...check,11])
            setCheck(allRecords)
        }
        else{
            setCheck([])
        }
    }
    
    const deleteSelectedRecord = async () => {
        const response = await qpointApi.post('/student-behaviour-record/delete-student-behaviour-records',{recordList: check})
        // console.log(response.data)
        let newStudentRecords = studentRecords.filter(item => !response.data.deletedRecord.includes(item.recordId))
        setStudentRecords(newStudentRecords)
        setFilteredData(null)
        setSearch([])
        setSelectAll(false)
        setCheck([])
    }

    const updateFIlterState = (filteredData) => {
        dispatch(setInitialFilter(filteredData))
    }

    
    const searchFilter = (text) => {
        // console.log(text==[])
        // console.log(studentRecords.data)
        setSearch(text)
        // console.log(text)
        if(selectedClass || selectedDate){
            if(text!=[]){
                let filteredData = INITIAL_FILTERED.filter(item => item.student.fullName.toLowerCase().includes(text.toLowerCase()))
                setFilteredData(filteredData)
            }else{
                setFilteredData(INITIAL_FILTERED)
            }
        }else{
            if(text!=[]){
                let filteredData = studentRecords.filter(item => item.student.fullName.toLowerCase().includes(text.toLowerCase()))
                setFilteredData(filteredData)
            }else{
                setFilteredData(null)
            }
        }

            // if(text!=[]){
            //     let filteredData = studentRecords.filter(item => item.student.fullName.toLowerCase().includes(text.toLowerCase()))
            //     setFilteredData(filteredData)
            // }else{
            //     setFilteredData(null)
            //
        
    }
   
    const applyFilter = () => {
        if(selectedDate){
            // console.log(selectedDate)
            let filteredData = studentRecords.filter(item => item.dateGiven.substring(0, 10) === selectedDate.substring(1, 11))
            // console.log(filteredData)
            setFilteredData(filteredData)
            updateFIlterState(filteredData)
        }
        if(selectedClass){
            // console.log(selectedClass)
            let filteredData = studentRecords.filter(item => item.student.class.classId === selectedClass)
            // console.log(filteredData)
            setFilteredData(filteredData)
            updateFIlterState(filteredData)
        }
        if(selectedDate && selectedClass){
            // console.log(selectedClass)
            // console.log(selectedDate)
            let filteredData = studentRecords.filter(item => item.dateGiven.substring(0, 10) === selectedDate.substring(1, 11) && item.student.class.classId === selectedClass)
            // console.log(filteredData)
            setFilteredData(filteredData)
            updateFIlterState(filteredData)
        }

    }

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    let data = []

    for(const item of staffClass){
        let temp = []
        temp.label = item.className
        temp.value = item.classId
        data.push(temp)
    }
    // console.log(data)
    // console.log(selectedDate)
    return(
        <View style={{flex:1}}>
            <Header
                centerComponent = {
                    <SearchBar
                        round
                        searchIcon={{ size: 24 }}
                        placeholder="Search Students..."
                        value = {search}
                        containerStyle = {{width:250, backgroundColor:'transparent', borderTopWidth: 0, borderBottomWidth: 0}}
                        inputContainerStyle = {{backgroundColor: 'white'}}
                        onChangeText = {searchFilter}
                    />
                }
                rightComponent = {
                    <Icon 
                        name="trash-can"
                        type = 'material-community'
                        size = {20} 
                        style = {{marginRight: 15}} 
                        onPress = {()=>setAlert(true)}
                        reverse
                        reverseColor = {theme.colors.primary}
                        color = 'white'
                    />
                }
                containerStyle = {{height:100, backgroundColor:theme.colors.primary}}

            >
            </Header>
            <ListItem 
                leftElement = {()=>(
                        <View style={{flexDirection:'row', margin:5, alignItems:'center'}}>
                            <Icon 
                                name = 'filter' 
                                type = 'material-community' 
                                containerStyle = {{marginRight:5}} 
                                onPress = {()=>toggleModal()}
                                
                                
                            />
                            <Text>Filter by   </Text>
                            {FilteredData && selectedClass && selectedDate?
                                (
                                    <View style = {{flexDirection:'row'}}>
                                        <Text style = {{color:'red',marginRight:1}}>Date & Class</Text>
                                        <Icon 
                                            name = 'close' size={20} 
                                            onPress = {()=>{
                                                setSelectedClass(null)
                                                setSelectedDate(null)
                                                setFilteredData(null)
                                            }}
                                        />
                                    </View>
                                )
                            :
                            null
                            }
                            {FilteredData && selectedDate && !selectedClass ?
                                (
                                    <View style = {{flexDirection:'row'}}>
                                        <Text style = {{color:'red',marginRight:1}}>Date</Text>
                                        <Icon 
                                            name = 'close' size={20} 
                                            onPress = {()=>{
                                                setSelectedDate(null)
                                                setFilteredData(null)
                                            }}
                                        />
                                    </View>
                                )
                            :
                            null
                            }
                            {FilteredData && selectedClass && !selectedDate?
                                (
                                    <View style = {{flexDirection:'row'}}>
                                        <Text style = {{color:'red',marginRight:1}}>Class</Text>
                                        <Icon 
                                            name = 'close' size={20} 
                                            onPress = {()=>{
                                                setSelectedClass(null)
                                                setFilteredData(null)
                                            }}
                                        />
                                    </View>
                                )
                            :
                            null
                            }
                            
                        </View>
                )}
                checkBox = {{
                    title: 'Select All',
                    center: true,
                    onPress: () => {
                        checkAll()
                    },
                    checked: selectAll
                }}
            />

            <Modal 
                isVisible={isModalVisible}
                backdropColor = 'grey'
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={{backgroundColor:'white',padding: 8,justifyContent: 'flex-start',height:250}}>
                    <Text
                        style = {{
                            alignSelf:"center",
                            padding :15,
                            fontSize: 20
                        }}
                    >
                        Select Filter
                    </Text>
                    <View  style={{
                        ...(Platform.OS !== 'android' && {
                        zIndex: 10
                        })
                    }}
                    >
                       <DropDownPicker
                            items={data}
                            defaultValue = {selectedClass}
                            placeholder="Select Class"
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
                            onChangeItem = {item => setSelectedClass(item.value)}
                        />
                    </View>
                    <View
                        style = {{
                            paddingTop:20,
                            flexDirection: 'row',
                        
                        }}
                    >
                        <Text
                            style = {{
                                fontSize: 15,
                                paddingRight:10
                            }}
                        >
                            Select Date:
                        </Text>
                        <Icon
                            name = 'calendar'
                            type = 'material-community'
                            onPress={()=>showDatePicker()}
                        />
                    </View>
                    {selectedDate ? 
                       ( 
                       <View style={{paddingTop:10,paddingBottom:10}}>
                            <Text style={{color:'red'}}>
                                Selected Date: {selectedDate.substring(1, 11)}
                            </Text>
                        </View>)
                    :
                    null
                    }
                    <View
                        style={{
                            // flex:1,
                            justifyContent: 'flex-end',
                            
                        }}
                    >
                        <Button
                            title = 'Apply Filter'
                            buttonStyle = {{
                                backgroundColor: theme.colors.primary
                            }}
                            onPress = {()=>{
                                toggleModal()
                                applyFilter()
                                console.log('toggle')
                            }}
                        />
                    </View>
                    
                </View>
            </Modal>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />  

            <FlatList
                data = {FilteredData ? FilteredData : studentRecords}
                // data = {studentRecords}
                keyExtractor={(item, index) => index.toString()}
                renderItem = {({item}) => {
                    return(
                        <View style={{flex:1}}>
                            <ListItem
                                checkBox= {{ 
                                    onPress: () => {
                                        checked(item.recordId)
                                        
                                    },
                                    checked: check.includes(item.recordId)
                                }}
                                rightTitle = {  
                                            <Text style ={{color:'grey'}}>{item.behaviour.behaviourPoint>0 ? '+':''}{item.behaviour.behaviourPoint} points</Text>
                                }
                                leftElement = {() => (
                                    <View>
                                        <View style={{flexDirection:'row',margin:5}}>
                                            <Icon name='content-paste' containerStyle = {{marginRight:5}}/>
                                            <Text>{item.behaviour.behaviourName}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',margin:5}}>
                                            <Icon name='account' type = 'material-community' containerStyle = {{marginRight:5}}/>
                                            <Text>{item.student.fullName}</Text>
                                        </View>
                                        {/* add class */}
                                        <View style={{flexDirection:'row',margin:5}}>
                                            <Icon name='google-classroom' type = 'material-community' containerStyle = {{marginRight:5}}/>
                                            <Text>{item.student.class.className }</Text>
                                        </View>
                                        <View style={{flexDirection:'row',margin:5}}>
                                            <Icon name='calendar-range' type = 'material-community' containerStyle = {{marginRight:5}}/>
                                            <Text>{item.dateGiven.substring(0, 10)}</Text>
                                        </View>
                                     </View>
                                )}
                                onPress = {()=> {
                                    console.log(item.recordId)
                                    {item.imageUri
                                        ?
                                        navigation.navigate('StudentActivityEdit',{
                                            recordId: item.recordId, 
                                            recordDetails:{
                                                behaviourName: item.behaviour.behaviourName,
                                                fullName: item.student.fullName,
                                                className: item.student.class.className,
                                                dateGiven: item.dateGiven.substring(0, 10),
                                                imageUri: item.imageUri
                                            }
                                        })
                                        :
                                        navigation.navigate('StudentActivityEdit',{
                                            recordId: item.recordId, 
                                            recordDetails:{
                                                behaviourName: item.behaviour.behaviourName,
                                                fullName: item.student.fullName,
                                                className: item.student.class.className,
                                                dateGiven: item.dateGiven.substring(0, 10)
                                            }
                                        })
                                    }
                                }}
                                // style = {{margin:10,}}
                                containerStyle = {{margin:10,borderRadius:20,shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.23,
                                shadowRadius: 2.62,
                                
                                elevation: 4, }}
                            />
                        </View>
                        
                    )
                }}
            />
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Delete All?"
                message="Once you delete the records, you can't undo it."
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No, cancel"
                confirmText="Yes, delete it"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setAlert(false)
                  }}
                onConfirmPressed={() => {
                    setAlert(false)
                    deleteSelectedRecord()
                    
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    dropDownContainer: {
        width: 260,
        margin: 10
      },
   
})

export default StaffActivityScreen;
