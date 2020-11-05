import React,{useState,useEffect} from 'react'
import {View,Switch,FlatList} from 'react-native'
import { Card, ListItem,Button, Icon, Header,Text,SearchBar } from 'react-native-elements'
import {theme} from '../core/theme'
import DropDownPicker from 'react-native-dropdown-picker';
import qpointApi from '../api/qpointApi'
import {useSelector,useDispatch} from 'react-redux'


const SelectStudentScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [isEnabled, setIsEnabled] = useState(false);
    const [search,setSearch] = useState('')
    const [allStudents,setAllStudents] = useState([])
    const [allGroups,setAllGroups] = useState([])
    const [allClasses,setAllClasses] = useState([])
    const [students,setStudents] = useState(null)
    const [selectedItem,setSelectedItem] = useState(null)
    const [classPicker,setClassPicker] = useState([])
    const [groupPicker,setGroupPicker] = useState([])
    const [filteredData,setFilteredData] = useState(null)
    const [selectAll,setSelectAll] = useState(false)
    const [check,setCheck] = useState([])

    useEffect(() => {
        const getAllstudents = async () => {
            const response = await qpointApi.post('/student/show-all-students')
            setAllStudents(response.data)
        }

        const getAllGroups = async () => {
            const response = await qpointApi.post('/group/show-all-groups')
            let groupPicker = []
            let groupStudents = []
            for(const item of response.data){
                let groupObj = {}
                groupStudents.push(item.students)
                groupObj.label = item.groupName
                groupObj.value = item.groupId
                groupPicker.push(groupObj)
            }
            setGroupPicker(groupPicker)
            setAllGroups(response.data)
        }
        const getAllClasses = async () => {
            const response = await qpointApi.post('./class/show-all-classes')
            let classPicker = []
            let classStudents = []
            for(const item of response.data){
                let classObj = {}
                classStudents.push(item.students)
                classObj.label = item.className
                classObj.value = item.classId
                classPicker.push(classObj)
            }
            setClassPicker(classPicker)
            setAllClasses(response.data)
        }

        getAllstudents()
        getAllGroups()
        getAllClasses()
        
    },[]);
    
    
    const setFilter = (id) => {
        //class
        if(!isEnabled){
            let filteredData = allStudents.filter(item => item.class.classId === id)
            // console.log('filtere ',filteredData)
            setStudents(filteredData)
        }
        //group
        else{
            let filteredData = allStudents.filter(item => item.groups.find(ele=>ele.groupId === id))
            // console.log('filtere ',filteredData)
            setStudents(filteredData)
        }
    }

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
        setSelectedItem(null)
    }

    const checkAll = () => {
        setSelectAll(!selectAll)
        let selectedStudents = []
        if(students){
            console.log('students')
            if(filteredData){
                selectedStudents = filteredData.map(item=>item)
            }
            else{
                selectedStudents = students.map(item=>item)
            }
            
        }
        else{
            console.log('nostudents')
            if(filteredData){
                selectedStudents = filteredData.map(item=>item)
            }
            else{
                selectedStudents = allStudents.map(item=>item)
            }
            
        }
        if(!selectAll){
            setCheck(selectedStudents)
        }
        else{
            setCheck([])
        }
    }

    const checked = (item) => {
        if(!check.includes(item)){
            setCheck([...check, item])
        }
        else{
            setCheck(check.filter(a => a !== item))
        }
    }   

    // console.log('check ',check)


    const searchFilter = (text) => {
        // console.log(text==[])
        // console.log(studentRecords.data)
        setSearch(text)
        // console.log(text)
        if(students){
            if(text!=[]){
                let filteredData = students.filter(item => item.fullName.toLowerCase().includes(text.toLowerCase()))
                setFilteredData(filteredData)
            }else{
                setFilteredData(null)
            }
        }else{
            if(text!=[]){
                let filteredData = allStudents.filter(item => item.fullName.toLowerCase().includes(text.toLowerCase()))
                setFilteredData(filteredData)
            }else{
                setFilteredData(null)
            }
        }
    }

    return(
        <View style={{flex:1,backgroundColor:'white'}}>
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
                    <View style={{alignItems:'center'}}>
                        <SearchBar
                            round
                            searchIcon={{ size: 24 }}
                            placeholder="Search Students..."
                            value = {search}
                            containerStyle = {{width:250, backgroundColor:'transparent', borderTopWidth: 0, borderBottomWidth: 0}}
                            inputContainerStyle = {{backgroundColor: 'white'}}
                            onChangeText = {searchFilter}
                        />
                    </View>
                }
                rightComponent = {
                    <View style={{alignItems:'center'}}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#767577" }}
                            thumbColor={isEnabled ? "#e5ffcc" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        {isEnabled ? 
                            <Text style={{color:'white'}}>Group</Text>
                            :
                            <Text style={{color:'white'}}>Class</Text>
                        }
                    </View>
                }
                containerStyle = {{height:100, backgroundColor:theme.colors.primary,alignItems:'center'}}
            />
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <DropDownPicker
                    items={!isEnabled ? classPicker : groupPicker}
                    defaultValue = {selectedItem}
                    placeholder = {!isEnabled ? 'Select Class' : 'Select Group'}
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
                    containerStyle={{height: 30,width:200,margin:15}}
                    style={{ backgroundColor: '#ffffff' }}
                    dropDownStyle={{ backgroundColor: 'white' }}
                    onChangeItem = {item => {
                        setSelectedItem(item.value)
                        setFilter(item.value)
                    }}  
                />
                <ListItem
                   checkBox = {{
                        title: 'Select All',
                        center: true,
                        onPress: () => {
                            checkAll()
                        },
                        checked: selectAll,
                        textStyle: {flexDirection:'column'},
                        containerStyle: {backgroundColor:'transparent',borderWidth:0}
                    }}
                    containerStyle = {{backgroundColor:'transparent',}}
                />
            </View>
            <FlatList
                data = {selectedItem ? (filteredData ? filteredData : students) : (filteredData ? filteredData : allStudents)}
                keyExtractor={(item, index) => index.toString()}
                renderItem = {({item}) => {
                    // console.log(item)
                    return(
                        <ListItem
                            title = {item.fullName}
                            onPress = {()=>console.log(item.fullName)}
                            checkBox= {{ 
                                onPress: () => {
                                    checked(item)
                                    
                                },
                                checked: check.includes(item)
                            }}
                            containerStyle = {{margin:10,borderRadius:20,shadowColor: "#000",elevation: 4, }}
                        />
                    )
                }}
            />

            <View style={{justifyContent:'flex-end',backgroundColor:'white'}}>
            <Button
                title = 'Select Behaviour'
                buttonStyle = {{backgroundColor:theme.colors.primary}}
                containerStyle = {{borderRadius:10,margin:5}}
                onPress = {()=>navigation.navigate('SelectBehaviour',{student:check})}
            />
           </View>
        </View>
    )
}

export default SelectStudentScreen;