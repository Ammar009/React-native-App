import React,{Component} from 'react';
import {StyleSheet, Platform, View, Text, SafeAreaView, TouchableHighlight, ScrollView} from 'react-native';
import { Container, Header, Content,Card, Textarea, Form } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";

class TransactionHistory extends Component{
    render(){
        const {navigate} = this.props.navigation
        return(
        <SafeAreaView style={{flex:1}}>
            <View style={styles.headerWrapper}>
                <View style={{flexDirection:'row', paddingTop:'10%', paddingLeft:'8%', paddingRight:'8%', justifyContent: 'space-between'}}>
                    <View><Ionicons name="md-arrow-back" size={32} color='#FFFFFF'/></View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:17,color:'white',}}>Balance :</Text>
                                <Text style={{fontSize:17,color:'white',fontWeight:'bold'}}> $4500 USD</Text>
                               
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <View style={{flexDirection:'row',  paddingLeft:'8%',paddingBottom:'3%', justifyContent: 'space-between'}}>
                    <View><Text style={{color:'#999999',fontSize:11}}>Periode</Text></View>
                    <View style={{flexDirection:'row',top:-3}}><Text style={{fontSize:11,top:5}}>10 Jan 2018</Text><EvilIcons name="question" size={32} color='orange'/></View>
                    <View style={{flexDirection:'row',top:-3,marginRight:'3%'}}><Text style={{fontSize:11,top:5}}>10 Jan 2018</Text><EvilIcons name="question" size={32} color='orange'/></View>
                </View>
            </View>
            <ScrollView style={styles.listWrapper}>
                <View>
                    <Text style={{borderBottomWidth:1,paddingTop:'3%', borderBottomColor:'#D8D8D8', paddingBottom:'1%',fontSize:10}}>15 Mar 2018</Text>
                    <View style={styles.tipItems}>
                        <View style={styles.tipItem}>
                            <Icon name='ios-card' size={25}  color='#7AC727'/>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{paddingLeft:'5%', paddingTop:'1%',fontSize:10}}> Tip paid To James Maxwell</Text>
                                <Text style={{paddingLeft:'15%'}}> $20 USD</Text>
                            </View>
                        </View>
                        <View style={styles.tipItem}>
                            <Icon name='ios-card' size={25}  color='#7AC727'/>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{paddingLeft:'5%', paddingTop:'1%',fontSize:10}}> Tip paid To James Maxwell</Text>
                                <Text style={{paddingLeft:'15%'}}> $20 USD</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{borderBottomWidth:1, borderBottomColor:'#D8D8D8',paddingBottom:'5%'}}>15 Mar 2018</Text>
                    <View style={styles.tipItems}>
                        <View style={styles.tipItem}>
                            <Icon name='ios-card' size={25}  color='#7AC727'/>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{paddingLeft:'5%', paddingTop:'1%',fontSize:10}}> Tip paid To James Maxwell</Text>
                                <Text style={{paddingLeft:'15%'}}> $20 USD</Text>
                            </View>
                        </View>
                        <View style={styles.tipItem}>
                            <Icon name='ios-card' size={25}  color='#7AC727'/>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{paddingLeft:'5%', paddingTop:'1%',fontSize:10}}> Tip paid To James Maxwell</Text>
                                <Text style={{paddingLeft:'15%'}}> $20 USD</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{borderBottomWidth:1, borderBottomColor:'#D8D8D8',paddingBottom:'5%'}}>15 Mar 2018</Text>
                    <View style={styles.tipItems}>
                        <View style={styles.tipItem}>
                            <Icon name='ios-card' size={25}  color='#7AC727'/>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{paddingLeft:'5%', paddingTop:'1%',fontSize:10}}> Tip paid To James Maxwell</Text>
                                <Text style={{paddingLeft:'15%'}}> $20 USD</Text>
                            </View>
                        </View>
                        <View style={styles.tipItem}>
                            <Icon name='ios-card' size={25}  color='#7AC727'/>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{paddingLeft:'5%', paddingTop:'1%',fontSize:10}}> Tip paid To James Maxwell</Text>
                                <Text style={{paddingLeft:'15%'}}> $20 USD</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={{borderBottomWidth:1, borderBottomColor:'#D8D8D8',paddingBottom:'5%'}}>15 Mar 2018</Text>
                    <View style={styles.tipItems}>
                        <View style={styles.tipItem}>
                            <Icon name='ios-card' size={25}  color='#7AC727'/>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{paddingLeft:'5%', paddingTop:'1%',fontSize:10}}> Tip paid To James Maxwell</Text>
                                <Text style={{paddingLeft:'15%'}}> $20 USD</Text>
                            </View>
                        </View>
                        <View style={styles.tipItem}>
                            <Icon name='ios-card' size={25}  color='#7AC727'/>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Text style={{paddingLeft:'5%', paddingTop:'1%',fontSize:10}}> Tip paid To James Maxwell</Text>
                                <Text style={{paddingLeft:'15%'}}> $20 USD</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
              
            
            </SafeAreaView>)
    }
}

export default TransactionHistory;

const styles=StyleSheet.create({
   
    headerWrapper:{
        flex:0.2,
        backgroundColor:'#66B80C',
        ...Platform.select({
            android:{
                marginBottom:'5%',
            },
            ios:{
                marginBottom:'5%',
            }

        })
    },
    text:{
        color:'#FFFFFF'
    },

    listWrapper:{
        flex:2, 
       
        ...Platform.select({
            android:{
                backgroundColor:'#F9F9F9', 
                // paddingTop:'20%', 
                paddingBottom:'20%', 
                paddingLeft:'5%', 
                paddingRight:'5%',
            },
            ios:{
                backgroundColor:'#F9F9F9', 
                // paddingTop:'20%', 
                // paddingBottom:'20%', 
                paddingLeft:'5%', 
                paddingRight:'5%',

            }
        })
    },
    footerWrapper:{
        flex:0.3,
        backgroundColor:'#66B80C',
    },
    tipItems:{
        marginTop:'5%',
        position:'relative'
    },
    tipItem:{
        marginBottom:'2%',
        backgroundColor:'#FFFFFF',
        flexDirection:'row',
        padding:'5%'
    },
    button:{
        flex:0.3,
        backgroundColor:'#66B80C',
        justifyContent:'center',
        alignItems:'center'

    }

})
