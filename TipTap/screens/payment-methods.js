import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

class PaymentMethods extends Component{
    render(){
        return(
        <SafeAreaView style={{flex:1}}>
            <View style={styles.infoContainer}><Text style={{color:'#FFFFFF', fontWeight:'400'}}>Payment</Text></View>
            <View style={styles.cardContainer}>
            <View style={{marginTop:-10}}>
                <Text style={{color:'#222222', fontSize:15, fontWeight:'500'}}>Payment Methods</Text>
                <Text style={{color:'#222222'}}>Select your preferred payment method to pay tip</Text>
            </View>
            <View style={{paddingTop:10, paddingLeft:0, paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#D8D8D8', flexDirection:'row',alignItems:'center'}}>
                <View style={{width:'50%', flexDirection:'row', alignItems:'center'}}>
                        <View style={{width:70, height:70, borderRadius:50, backgroundColor:"black"}}></View>
                        <Text style={{paddingLeft:5}}> Credit Card</Text>
                </View>
                <View style={{alignItems:'flex-end', width:'50%'}} >
                    <MaterialIcon name="navigate-next" size={32} color='#C2C4CA'/>
                </View>
            </View>
            <View style={{paddingTop:10, paddingLeft:0, paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#D8D8D8', flexDirection:'row',alignItems:'center'}}>
                <View style={{width:'50%', flexDirection:'row', alignItems:'center'}}>
                        <View style={{width:70, height:70, borderRadius:50, backgroundColor:"black"}}></View>
                        <Text style={{paddingLeft:5}}> Master Card</Text>
                </View>
                <View style={{alignItems:'flex-end', width:'50%'}} >
                    <MaterialIcon name="navigate-next" size={32} color='#C2C4CA'/>
                </View>
            </View>
            <View style={{paddingTop:10, paddingLeft:0, paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#D8D8D8', flexDirection:'row',alignItems:'center'}}>
                <View style={{width:'50%', flexDirection:'row', alignItems:'center'}}>
                        <View style={{width:70, height:70, borderRadius:50, backgroundColor:"black"}}></View>
                        <Text style={{paddingLeft:5}}> Apple Pay</Text>
                </View>
                <View style={{alignItems:'flex-end', width:'50%'}} >
                    <MaterialIcon name="navigate-next" size={32} color='#C2C4CA'/>
                </View>
            </View>
            
            <View style={{paddingTop:10, paddingLeft:0, paddingBottom:10, borderBottomWidth:1, borderBottomColor:'#D8D8D8', flexDirection:'row',alignItems:'center'}}>
                <View style={{width:'50%', flexDirection:'row', alignItems:'center'}}>
                        <View style={{width:70, height:70, borderRadius:50, backgroundColor:"black"}}></View>
                        <Text style={{paddingLeft:5}}> Google Wallet</Text>
                </View>
                <View style={{alignItems:'flex-end', width:'50%'}} >
                    <MaterialIcon name="navigate-next" size={32} color='#C2C4CA'/>
                </View>
            </View>
            </View>
        </SafeAreaView>
            )
    }
}

export default PaymentMethods;

const styles=StyleSheet.create({
    infoContainer:{
        flex:0.5,
        backgroundColor: '#66B80C',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    cardContainer:{
        flex:3,
        backgroundColor: '#FFFFFF',
        flexDirection:'column',
        padding:20,
 },
})