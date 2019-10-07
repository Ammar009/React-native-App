import React, { Component } from 'react';
import {LOCALHOSTVPN} from '../config';
import { 
    Alert,
    View, 
    Text,
    StyleSheet,
    TextInput,
    Image, Button, 
    TouchableHighlight, 
    SafeAreaView, 
    ImageBackground,
    ActivityIndicator, 
    TouchableOpacity,
 } from 'react-native';
//import Icon from "react-native-vector-icons/Ionicons";
import bg from '../assets/images/login-bg.jpg'
class Forgotpassword extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
          pressed: false,
          token: '',
          tokenField: false,  
          email: '',
          newPasswordScreen : false, 
          isActivityIndicator : false,
          buttonDisable: true
        };
      }

    forgotPassword() {
        this.setState({
            isActivityIndicator:!this.state.isActivityIndicator,
            pressed:!this.state.pressed
          })  
        console.log('In forgot Password', this.state.isActivityIndicator);
        fetch(`${LOCALHOSTVPN}/api/users/forgotPassword`,{
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                email: `${this.state.email}`
            })
        }).then(response => response.json())
        .then(response => {
            Alert.alert(response.message);
            this.setState({
                buttonDisable: !this.state.buttonDisable,
                isActivityIndicator : !this.state.isActivityIndicator,
                tokenField : !this.state.tokenField
            })
        }).catch((err) => {
            Alert.alert('Some Error while Resetting Password.');
            console.log('=================',err)})
            .done();
    }

    verifyToken() {
        this.setState({
            isActivityIndicator:!this.state.isActivityIndicator
          })
          fetch(`${LOCALHOSTVPN}/api/users/verifyToken`,{
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                email: `${this.state.email}`,
                token: `${this.state.token}`
            })
        }).then(response => response.json())
        .then(response => {
            Alert.alert(response.message);
            if(response.newScreen){
                this.setState({
                    newPasswordScreen : !this.state.newPasswordScreen
                })
            }
        }).catch((err) => {
            Alert.alert('Token Invalid.');
            console.log('===========gfjgfjgfjdfhjdfh======',err)})
            .done();
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground style={{ width: '100%', height: '100%' }} source={bg}>
                <View style={styles.container}>
                    <Text style={styles.title}>Forgot Password</Text>
                    <Text style={styles.subTitle}>If you need help resetting your password, we
                        can help by sending you a link to reset it.</Text>
                    <View style={styles.loginInfo}>
                        <TextInput
                            style={styles.input}
                            type="string"
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                        { this.state.buttonDisable && 
                        <TouchableHighlight
                        style={styles.submit}
                        onPress={()=> this.forgotPassword()}
                        underlayColor='#fff'>
                        <Text style={styles.submitText}>Forget my Password</Text>
                        </TouchableHighlight>
                        }
                        { this.state.isActivityIndicator &&
                         <View>
                         <ActivityIndicator size="large" color="#0000ff" />
                       </View>
                       }
                       { this.state.tokenField &&
                       <View>
                           <TextInput
                           style={styles.input}
                           type="text"
                           onChangeText={(token) => this.setState({token})}
                           value={this.state.token}
                           name="token"
                           placeholder="Enter Token"
                           required
                       />

                       <TouchableHighlight
                           style={styles.submit}
                           onPress={()=> this.verifyToken()}
                           underlayColor='#fff'>
                           <Text style={styles.submitText}>Verify</Text>
                       </TouchableHighlight>
                       </View>
                       }
                    </View>
                    { this.state.isActivityIndicator && 
                        <ActivityIndicator/>
                      }   
                            
                    { this.state.newPasswordScreen && 
                        navigate("resetPassword",{
                        email: this.state.email,
                      })   
                            
                    }
                </View>
            </ImageBackground>
        );
    }
}

export default Forgotpassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'

    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black'
    },
    subTitle: {
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'gray',
        padding: 5
    },
    loginInfo: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    icon: {
        textAlign: 'left',
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    submit: {
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
    naviagtionActions: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});