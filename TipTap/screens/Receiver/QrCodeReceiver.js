import React,{Component} from 'react';
import {StyleSheet, Platform, View, Text, Image,SafeAreaView, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { Container, Header, Content, Textarea, Form, Card } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import User from '../../assets/images/user.jpg';
import QR from '../../assets/images/qr.png';

class QrCodeReceiver extends Component{
   
    render(){
        const {navigate}= this.props.navigation;
        return(
        <SafeAreaView style={{flex:1,zIndex:-1,backgroundColor:'#F9F9F9'}}>
            
                    
                <View style={styles.headerWrapper}>
                    <View style={{width:'40%',paddingLeft:'5%' }}>
                    <Ionicons name="md-arrow-back" size={32} color='#FFFFFF'/>
                    </View>
                    <Text style={{width:'60%', fontSize:20, color:'#FFFFFF'}}>Tip Now</Text>
                </View>
                <View style={styles.qrBody}>
                    <Card style={styles.qrCard}>
                        <Image source={User} style={styles.imageUserQR}/>
                        <View style={styles.qrDetails}>
                            <Text style={{fontSize:30}}>Mabel Andrews</Text>
                            <Text>McDonalds</Text>

                            <Image source={QR} style={{marginTop:'8%'}}/>
                            <Text style={{fontSize:14, fontWeight:'bold',paddingTop:'5%'}}  onPress={()=>{navigate('tranasctionhistory')}}>Scan QR code</Text>
                        </View>
                    </Card>

                </View>
               
            </SafeAreaView>)
    }
}

export default QrCodeReceiver;

const styles=StyleSheet.create({
    headerWrapper:{
        flex:0.5,
        backgroundColor:'#66B80C',
        position:'relative',
        alignItems:'center',
        flexDirection:'row',
    },
    qrBody:{
        flex:3,
        // backgroundColor:'yellow',
        padding:'10%',
        paddingTop:'30%',
        
        
        
    },
    qrCard:{
        
        alignItems:'center',
        justifyContent:'center',

        ...Platform.select({
            ios:{
                height:'100%',
            },
            android:{
                height:'120%'
            }
        })
    },
    imageUserQR:{
        // height:'30%',
        
        borderWidth: 5,
 
        // Set border Hex Color Code Here.
        borderColor: 'white',
        ...Platform.select({
            android:{
                position:'absolute',
                height:'35%',
                width:'42%',
                top: -65, 
                left: '30%',
                right: 20,
                borderRadius:65,
                zIndex:1
            },
            ios:{
                position:'absolute',
                height:'33%',
                width:'40%',
                top: -55, 
                left: '30%',
                right: 20,
                borderRadius:55,
                zIndex:1
            }
    
        }),
    },
    qrDetails:{
        alignItems:'center',
        justifyContent:'center',

        ...Platform.select({
            android:{
                marginTop:'25%',
                color:'black'
            },
            ios:{
                marginTop:'15%'
            }
    
        }),


    }
})
