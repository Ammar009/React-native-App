import React, {Component} from 'react';
import {View, Text, Alert, TouchableHighlight,SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { Card } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';


class SelectedPerson extends Component{
    constructor(props) {
        super(props);
        this.state = {
            giveTip: false,
        };
    }
    proceedCheckout = () => {
        console.log('proceedCheckout');
    }
    tipNow = () => {
        AsyncStorage.removeItemItem('isLoggedIn');
        Alert.alert(
            'Give a Tip',
            'Are you sure you want to give a tip?',
            [
              {text: 'No', onPress: () => 
                {this.props.navigation.navigate('search');}
              },
              {text: 'Yes', onPress: () => 
                {this.setState({
                    giveTip : !this.state.giveTip
                })}
                // {this.props.navigation.navigate('paymentMethods');}
              },
            ],
            { cancelable: false }
        )
    }
    render(){
        const { params } = this.props.navigation.state;
        const firstName = params ? params.recieverFirstName : null;
        const lastName = params ? params.recieverLastName : null;
        // const { navigation } = this.props;
        // const firstName = navigation.getParam('recieverFirstName'); 
        // const lastName = navigation.getParam('recieverLastName');
        return(
        <SafeAreaView style={{flex:1}}>
            <View  style={styles.infoContainer}>
                <View style={{width:100,
                height:100,
                borderRadius:50,
                backgroundColor:'black', marginBottom:10}}></View>
                <Text style={{fontSize:30, fontWeight:'bold', color:'#FFFFFF'}}>{JSON.stringify(firstName)}</Text>
                <Text style={{color:'#FFFFFF'}}>{JSON.stringify(lastName)}</Text>
            </View>
            <View  style={styles.cardContainer}>
                 {
                     !this.state.giveTip ?
                     <Card style={{width:'100%', height:'50%', borderRadius:10, alignItems:'center', justifyContent:'center', marginTop:-60}}>
                        <TextInput keyboardType='numeric' style={{fontSize:40, fontWeight:'200', borderBottomWidth:3, borderBottomColor:'#DBDBDB'}}>$10</TextInput>
                        <TouchableHighlight
                            style={styles.submit}
                            onPress={()=> this.tipNow()}
                            underlayColor='#fff'>
                            <Text style={styles.submitText}>Tip Now</Text>
                        </TouchableHighlight>
                    </Card> : 
                    <Card style={{width:'100%', height:'50%', borderRadius:10, alignItems:'center', justifyContent:'center', marginTop:-60}}>
                        <Text>Enter your Card Number</Text>
                        <TextInput keyboardType='numeric' style={{fontSize:40, fontWeight:'200', borderBottomWidth:3, borderBottomColor:'#DBDBDB'}}></TextInput>
                        <TouchableHighlight
                            style={styles.submit}
                            onPress={()=> this.proceedCheckout()}
                            underlayColor='#fff'>
                            <Text style={styles.submitText}>Proceed Checkout</Text>
                        </TouchableHighlight>
                    </Card>
                 }
            </View>
        </SafeAreaView>
        )
    }
}

export default SelectedPerson;

const styles= StyleSheet.create({
    infoContainer:{
        flex:2,
        backgroundColor: '#66B80C',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    cardContainer:{
        flex:3,
        backgroundColor: '#FFFFFF',
        flexDirection:'row',
        padding:30,
 },
 submit: {
    width:'90%',
    marginRight: 15,
    marginLeft: 15,
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#81CE2D',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
})