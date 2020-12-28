import React,{useState,useEffect} from 'react'
import {View,FlatList,StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import { Card, ListItem, Icon, Header,Text,SearchBar,Button,Avatar,Image, } from 'react-native-elements'
import {theme} from '../../core/theme'
import qpointApi from '../../api/qpointApi'
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import Timeline from 'react-native-timeline-flatlist'


const ParentActitiviesScreen = ({navigation,route}) => {
    const {childObject} = route.params
    // console.log(childObject)
    const [studentRecords,setStudentRecords] = useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPicker,setPicker] = useState(null)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate,setSelectedDate] = useState(null)
    const [FilteredData,setFilteredData] = useState(null)


    useEffect(()=>{
        const getBehavaviourRecords = async () => {
            const response = await qpointApi.post('/student-behaviour-record/get-student-behaviour-records',{studentId:childObject[0].studentId})
            let tempRecords = []
            for(const item of response.data){
                let temp = {}
                temp.time = moment(item.dateGiven).format("ddd, MMM DD") + "\n" + moment(item.dateGiven).format("HH:mm a")
                temp.title = item.behaviour.behaviourName
                temp.description = (item.behaviour.behaviourPoint).toString()
                tempRecords.push(temp)
                // console.log(temp.time)
            }
            setStudentRecords(tempRecords)
            // console.log(response.data)
        }
        getBehavaviourRecords()
    },[])

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
     
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        date = JSON.stringify(date)
        date = date.substring(0 ,11)
        // console.log(date)
        setSelectedDate(date)
        hideDatePicker();
    };

    

    const applyFilter = () => {
        if(selectedPicker && selectedDate){
            if(selectedPicker === 'positive'){
                // let filteredData = studentRecords.filter(item=> item.behaviour.behaviourPoint > 0 && item.dateGiven.substring(0, 10) === selectedDate.substring(1, 11))
                let filteredData = studentRecords.filter(item=> parseInt(item.description) > 0 && item.time.substring(0,11) === moment(selectedDate.substring(1,11)).format("ddd, MMM DD"))
                setFilteredData(filteredData)
                
            }
            if(selectedPicker === 'negative'){
                let filteredData = studentRecords.filter(item=> parseInt(item.description) < 0 && item.time.substring(0,11) === moment(selectedDate.substring(1,11)).format("ddd, MMM DD"))
                // let filteredData = studentRecords.filter(item=> item.behaviour.behaviourPoint < 0 && item.dateGiven.substring(0, 10) === selectedDate.substring(1, 11))
                setFilteredData(filteredData)
            }
        }
        else if(selectedPicker){
            
            if(selectedPicker === 'positive'){
                let filteredData = studentRecords.filter(item=> parseInt(item.description) > 0)
                // let filteredData = studentRecords.filter(item=> item.behaviour.behaviourPoint > 0)
                // console.log(filteredData)
                setFilteredData(filteredData)
            }
            if(selectedPicker === 'negative'){
                // let filteredData = studentRecords.filter(item=> item.behaviour.behaviourPoint < 0)
                let filteredData = studentRecords.filter(item=> parseInt(item.description) < 0)
                // console.log(filteredData)
                setFilteredData(filteredData)
            }
        }   
        else if(selectedDate){
            let filteredData = studentRecords.filter(item => item.time.substring(0,11) === moment(selectedDate.substring(1,11)).format("ddd, MMM DD"))
            
            // let filteredData = studentRecords.filter(item.dateGiven.substring(0, 10) === selectedDate.substring(1, 11))
            setFilteredData(filteredData)
        }

    }

    const data = [
        {label:'Positive Behaviour',value:'positive'},
        {label:'Negative Behaviour',value:'negative'},
    ];

    return(
        <View style={{flex:1}}>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />  
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
                        Filter Activities
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

                    <View style = {{flexDirection:'row',alignItems:'center',paddingTop:20}}>
                        <Text style={Styles.filterText}>Date Acquired:</Text>
                        <Icon
                            name = 'calendar'
                            type = 'material-community'
                            onPress={()=>showDatePicker()}
                        />
                        {selectedDate!=null ? 
                        ( 
                            <View style={{paddingTop:10,paddingBottom:10}}>
                                <Text style={{color:'red',marginLeft:15}}>
                                    Selected Date: {selectedDate.substring(1, 11)}
                                </Text>
                            </View>
                        )
                        :
                        null
                        }
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
                                    setSelectedDate(null)
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
                        iconStyle = {{color:'white'}}
                        onPress = {()=> navigation.goBack() }
                    />
                }
                centerComponent = {
                    <Text style = {{fontSize: 20,color:'white'}}>{childObject[0].fullName} Activities</Text>
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
            <Timeline
                data = {FilteredData ? FilteredData : studentRecords}
                circleSize={20}
                circleColor='rgb(45,156,219)'
                lineColor='rgb(45,156,219)'
                timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                descriptionStyle={{color:'gray', fontSize: 15}}
                separator = {true}
                timeContainerStyle = {{minWidth:100}}
                style = {{margin:15}}
            />

            {/* <FlatList   
                data = {FilteredData ? FilteredData : studentRecords}
                keyExtractor = {(item => item.recordId.toString())}
                renderItem = {({item}) => {
                    // console.log(item)
                    return(
                        <ListItem
                            title = {item.behaviour.behaviourName}
                            subtitle = {moment(item.dateGiven).format("dddd, MMM DD HH:mm a")}
                            rightTitle = {`${item.behaviour.behaviourPoint.toString()} points`}
                            containerStyle = {{margin:10,elevation:2,borderRadius:10,}}
                            
                        />
                        
                    )
                }}
            /> */}
            

        </View>
    )
}

const Styles = StyleSheet.create({
    filterText:{
        marginHorizontal:15,
        fontSize:15
    }
})

export default ParentActitiviesScreen