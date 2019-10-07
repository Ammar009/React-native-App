import React,{Component} from 'react';
import {LOCALHOSTVPN} from '../config';
import {StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { compact } from "underscore";

class Search extends Component{
    constructor() {
        super();
        this.state = {
            tipReciever: [],
            temp: []
        };
    }
    
    componentWillMount() {
        fetch(`${LOCALHOSTVPN}/api/tipReciever/getAllTipReciever`,{
                method: 'GET',
            }).then(response => response.json())
            .then(response => {
                this.setState({ tipReciever : response})
                this.setState({ temp : response})
            }).catch((err) => {
                Alert.alert('Error');
                })
                .done();
    }
    handleChange =(e)=> {
        console.log('xxxxxxxxxxxxxxx');
        if(e !== ''){
            let x;
            x = this.state.tipReciever.map(item=>{
                let b = item.first_name;
                if(b.includes(e)){
                    return item
                }
            })
            let tse = compact(x);
            this.setState({tipReciever : tse})
        }
        else {
            this.setState({tipReciever: this.state.temp})    
        }
    }
    render(){
        const {navigate}= this.props.navigation;
        return(<SafeAreaView style={{flex:1}}>
            
                <View style={styles.headerWrapper}>
                    <View style={{width:'40%',paddingLeft:'5%' }}>
                    <Entypo name="cross" size={32} color='#FFFFFF'/>
                    </View>
                    <Text style={{width:'60%', fontSize:20, color:'#FFFFFF'}}>Tip Now</Text>
                    {/* <View style={{position: 'absolute', top: 100, left: 0, right: 0, bottom: 0}}>
                        <Text>Activity</Text>
                    </View> */}
                </View>
                <TextInput style={styles.searchInput} placeholder='Search Members' keyboardType='default' onChangeText={this.handleChange}></TextInput>
                <ScrollView style={styles.listWrapper}>
                {this.state.tipReciever.length > 0 ? this.state.tipReciever.map((item, index)=>{
                    return(<TouchableOpacity key={index} style={styles.searchItem} onPress={()=>{navigate('selectedPerson', {
                        recieverFirstName: item.first_name,
                        recieverLastName: item.last_name,

                    })}}>
                        <View style={styles.receiverInfoBlock} >          
                            <View style={styles.receiverAvatar}></View>
                            <View style={styles.infoBlock}>
                                <Text style={styles.receiverName}>{item.first_name}</Text>
                                <Text style={styles.receiverPlace}>{item.last_name}</Text>
                                <Text style={styles.receiverPlace}>{item.email}</Text>
                            </View>
                        </View>
                        <View style={styles.nextIcon}>
                            <MaterialIcon name="navigate-next" size={32} color='#C2C4CA'/>
                        </View> 
                    </TouchableOpacity>)
                }) : <View style={styles.infoBlock}>
                    <Text style={styles.receiverName}>No Record Found</Text>
                </View>
                }
                </ScrollView>
            </SafeAreaView>)
    }
}

export default Search;

const styles=StyleSheet.create({
    headerWrapper:{
        flex:0.2,
        backgroundColor:'#66B80C',
        position:'relative',
        alignItems:'center',
        flexDirection:'row',

    },
    searchInput:{
        flex:0.1,
        borderBottomWidth:1,
        borderBottomColor:'#D8D8D8',
    },
    text:{
        color:'#FFFFFF'
    },

    listWrapper:{
        flex:3, 
        paddingLeft:'5%', 
        paddingRight:'5%'
    },
    searchItem:{
        flex:1,
        borderBottomWidth:1,
        borderBottomColor:'#D8D8D8',
        flexDirection:'row',
        padding:10
    },
    receiverInfoBlock:{
        width:'50%',
        flexDirection:'row'
    },
    receiverAvatar:{
        width:50,
        height:50,
        borderRadius:50,
        backgroundColor:'black'
    },
    infoBlock:{
        flexDirection:'column',
        paddingTop:'3%',
        paddingLeft:'3%'
    },
    receiverName:{
        fontSize:15,
        color:'#262628'
    },
    receiverPlace:{
        fontSize:12,
        color:'#9B9B9B'
    },
    nextIcon:{
        paddingTop:'4%',
        width:'50%',
        alignItems:'flex-end',
    }


})
