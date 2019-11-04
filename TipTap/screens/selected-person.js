import React, {Component} from 'react';
import {View, Text, Alert, TouchableHighlight,SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { Card } from "native-base";
import moment from "moment";
import {LOCALHOSTVPN} from '../config';
import AsyncStorage from '@react-native-community/async-storage';


class SelectedPerson extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tipGiveruser: '',
            tipGiver_cardNo: '1234567890',
            giveTip: false,
            tipAmount: '',
        };
    }

    async componentWillMount() {
        const val = await AsyncStorage.getItem('isLoggedIn');
        this.setState({
            tipGiveruser : JSON.parse(val)
        })
    }
    proceedCheckout = () => {
        console.log('proceedCheckout');
        fetch(`${LOCALHOSTVPN}/api/userTipReciever/tipRecieverUser`,{
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                reciever_name: `${this.props.navigation.state.params.recieverFirstName}`,
                reciever_email: `${this.props.navigation.state.params.recieverEmail}`,
                reciever_cardNo: `${this.props.navigation.state.params.recieverCardNo}`,
                tipGiver_name: `${this.state.tipGiveruser.first_name}`,
                tipGiver_email: `${this.state.tipGiveruser.email}`,
                tipGiver_cardNo: `${this.state.tipGiver_cardNo}`,
                tipAmount: `${this.state.tipAmount}`,
                recievingDate: `${moment(new Date()).format('L')}`,
            })
        }).then(response => response.json())
        .then(response => {
            if(response.message){
                Alert.alert(
                    'Your tip has been delivered',
                ) 
            }
        }).catch((err) => {
            Alert.alert('This email is already registered!!');
            console.log('ERRRRROOOORRR',err)})
            .done();
    }
    tipNow = () => {
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
        const email = params ? params.recieverEmail : null;
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
                         <Text>Enter your Tip Amount($)</Text>
                         <TextInput
                            style={{fontSize:40, fontWeight:'400', borderBottomWidth:3, borderBottomColor:'#DBDBDB'}}
                            type="number"
                            keyboardType='numeric'
                            onChangeText={(tipAmount) => this.setState({tipAmount})}
                            value={this.state.tipAmount}
                            name="tipAmount"
                        />
                        {/* <TextInput keyboardType='numeric' style={{fontSize:40, fontWeight:'200', borderBottomWidth:3, borderBottomColor:'#DBDBDB'}}>$10</TextInput> */}
                        <TouchableHighlight
                            style={styles.submit}
                            onPress={()=> this.tipNow()}
                            underlayColor='#fff'>
                            <Text style={styles.submitText}>Tip Now</Text>
                        </TouchableHighlight>
                    </Card> : 
                    <Card style={{width:'100%', height:'50%', borderRadius:10, alignItems:'center', justifyContent:'center', marginTop:-60}}>
                        <Text>Enter your Card Number</Text>
                        <TextInput
                            style={{fontSize:40, fontWeight:'200', borderBottomWidth:3, borderBottomColor:'#DBDBDB'}}
                            type="number"
                            keyboardType='numeric'
                            // onChangeText={(tipGiver_cardNo) => this.setState({tipGiver_cardNo})}
                            // value={this.state.tipGiver_cardNo} 
                        >{this.state.tipGiver_cardNo}</TextInput>
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