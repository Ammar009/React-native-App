import React, { Component } from 'react';
import { Text,Alert, TextInput,KeyboardAvoidingView,TouchableOpacity, View, TouchableHighlight, ScrollView, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native';
// const {height, width} = Dimensions.get('window');

class TipperSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          first_name: '',
          last_name: '',
          email: '',
          password : '',
          phone: '',
          states: '',
          country: '',
          zipcode: '',
          address: '',
          userType: '',
          isVerified: false,
        };
        //this.onChangeText = this.onChangeText.bind(this);
      }

      signuup() {
          console.log('In signup');
          if(this.state.first_name === '' || this.state.last_name === '' || this.state.email === '' || this.state.password === '' || this.state.phone === '' || this.state.states === '' || this.state.country === '' || this.state.zipcode === '' || this.state.address === ''){
            console.log('In IFFFF');  
            Alert.alert('Fields are Empty')
          }
          else{

            fetch('http://192.168.1.132:3000/api/users/signup',{
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    first_name: `${this.state.first_name}`,
                    last_name: `${this.state.last_name}`,
                    email: `${this.state.email}`,
                    userType: "tipgiver",
                    password: `${this.state.password}`,
                    zipcode: `${this.state.zipcode}`,
                    country: `${this.state.country}`,
                    address: `${this.state.address}`,
                    isVerified: `${this.state.isVerified}`
                })
            }).then(response => response.json())
            .then(response => {
                console.log('------------------------',response)
                if(response.message){
                    Alert.alert('This Email is already registered');
                }else{
                    this.sendEmail(response);  
                }
                
            }).catch((err) => {
                Alert.alert('This email is already registered!!');
                console.log('ERRRRROOOORRR',err)})
                .done();
          }
          
        
    }

    sendEmail(res){
        console.log('In SEND EMAILLLLLLLLL', res);
        fetch('http://192.168.1.132:3000/api/users/emailverification',{
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    
                    email : res[0].email,
                    id : res[0]._id,
                })
            }).then(response => response.json())
            .then(response => {
                
                Alert.alert(response.message);
                //this.sendEmail(response.id);
            }).catch((err) => {
                console.log('=====',err)})
                .done();

    } 
    loginScreen(){
        console.log('jgfdsbhfn m');
        this.props.navigation.navigate("login");
    }

    
    render() {
        const { navigate } = this.props.navigation
        return (
            <KeyboardAvoidingView behavior="padding" enabled>
            <ScrollView>
                    <View>
                    <TextInput
                            style={styles.input}
                            type="text"
                            // id="first_name"
                            onChangeText={(first_name) => this.setState({first_name})}
                            value={this.state.first_name}
                            // onChangeText={(e)=> this.setState({first_name: e.value})}
                            // value={this.first_name}
                            name="first_name"
                            placeholder="First name"
                        />
                         <TextInput
                            style={styles.input}
                            type="text"
                            // id="first_name"
                            onChangeText={(last_name) => this.setState({last_name})}
                            value={this.state.last_name}
                            // onChangeText={(e)=> this.setState({first_name: e.value})}
                            // value={this.first_name}
                            name="last_name"
                            placeholder="Last name"
                        />
                        <TextInput
                            style={styles.input}
                            type="email"
                            // id="email"
                            // value={this.state.email}
                            // onChangeText={(e)=> this.setState({email: e.value})}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                            name="email"
                            placeholder="Email"
                        />
                        <TextInput
                            style={styles.input}
                            type="password"
                            // id="email"
                            // value={this.state.email}
                            // onChangeText={(e)=> this.setState({email: e.value})}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            name="password"
                            placeholder="Password"
                        />
                        <TextInput
                            style={styles.input}
                            type="number"
                            id="phone"
                            onChangeText={(phone) => this.setState({phone})}
                            value={this.state.phone}
                            // onChange={(e)=> this.setState({phone: e.value})}
                            // value={this.state.phone}
                            name="phone"
                            placeholder="Phone"
                        />
                        <TextInput
                            style={styles.input}
                            type="text"
                            id="states"
                            onChangeText={(states) => this.setState({states})}
                            value={this.state.states}
                            // onChange={(e)=> this.setState({states: e.value})}
                            // value={this.state.states}
                            name="states"
                            placeholder="State"
                        />
                        <TextInput
                            style={styles.input}
                            type="text"
                            id="country"
                            onChangeText={(country) => this.setState({country})}
                            value={this.state.country}
                            // onChange={(e)=> this.setState({country: e.value})}
                            // value={this.state.country}
                            name="country"
                            placeholder="Country"
                        />
                        <TextInput
                            style={styles.input}
                            type="number"
                            id="zip"
                            onChangeText={(zipcode) => this.setState({zipcode})}
                            value={this.state.zipcode}
                            // onChange={(e)=> this.setState({zipcode: e.value})}
                            //value={this.state.zipcode}
                            name="zip"
                            placeholder="Zip"
                        />
                        <TextInput
                            style={styles.input}
                            type="text"
                            id="address"
                            onChangeText={(address) => this.setState({address})}
                            value={this.state.address}
                            // onChange={(e)=> this.setState({address: e.value})}
                            //value={this.state.address}
                            name="address"
                            placeholder="Address"
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '5%', }}>
                            <Text>Already have an account ? </Text>
                            <TouchableOpacity onPress={() => this.loginScreen()}>
                                <Text  style={{ color: '#81CE2D' }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:20}}>
                    <TouchableHighlight
                        style={styles.submit}
                        onPress={()=> this.signuup()}
                        underlayColor='#fff'>
                        <Text style={styles.submitText}>Create Account</Text>
                    </TouchableHighlight>
                    </View>
            </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
export default TipperSignup;


const styles = StyleSheet.create({

    input: {
        marginLeft: '5%',
        marginRight: '5%',
        marginTop:Platform.OS==='ios'?'5%':0,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    submit: {
        width: '100%',
        height: 50,
        backgroundColor: '#81CE2D',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'flex-end',
        position: 'relative',
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    },

})