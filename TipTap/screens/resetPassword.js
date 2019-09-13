import React, { Component } from 'react';
import { View,Alert, Text, StyleSheet, TextInput, Image, Button, TouchableHighlight, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
//import Icon from "react-native-vector-icons/Ionicons";
import bg from '../assets/images/login-bg.jpg'
class ResetPassword extends Component {
    static navigationOptions = {
        title: 'Reset Password'
    }

    constructor(props) {
        super(props);
        this.state = {
          newPassword: '',
          confirmPassword : '',
          gotoLogin : false 
        };
      }

      confirmPass() {
          console.log('INNNN CONFIRMMMM PASSSSWORRD');
          if(this.state.newPassword !== this.state.confirmPassword){
              Alert.alert("Password Mismatch. Type AGIAN")
          }
          else {
            fetch('http://192.168.1.132:3000/api/users/changePassword',{
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                email: `${this.props.navigation.state.params.email}`,
                newPassword: `${this.state.newPassword}`
            })
        }).then(response => response.json())
        .then(response => {
            this.setState({
                gotoLogin:!this.state.gotoLogin
            })
            Alert.alert(response.message);
            this.props.navigation.navigate('login'); 
        }).catch((err) => {
            Alert.alert('Your Password is not Updated Yet');
            console.log('=================',err)})
            .done();  
          }
      }
    // forgotPassword() {
    //     fetch('http://192.168.1.130:3000/api/users/forgotPassword',{
    //         method: 'POST',
    //         headers: {
    //             'Accept' : 'application/json',
    //             'Content-Type' : 'application/json',
    //         },
    //         body: JSON.stringify({
    //             email: `${this.state.email}`
    //         })
    //     }).then(response => response.json())
    //     .then(response => {
    //         Alert.alert(response.json);
    //         (!this.state.newPasswordScreen);
    //     }).catch((err) => {
    //         Alert.alert('Some Error while Resetting Password.');
    //         console.log('=================',err)})
    //         .done();
    // }

    render() {
        const { navigate } = this.props.navigation
        return (
            <ImageBackground style={{ width: '100%', height: '100%' }} source={bg}>
                <View style={styles.container}>
                    <Text style={styles.title}>Reset Password</Text>
                    <Text style={styles.subTitle}>Enter your New Password and confirm it</Text>
                    <View style={styles.loginInfo}> 
                        <TextInput
                            style={styles.input}
                            type="string"
                            onChangeText={(newPassword) => this.setState({newPassword})}
                            value={this.state.newPassword}
                            name="newPassword"
                            placeholder="Enter your Password"
                            secureTextEntry
                        />

                        <TextInput
                            style={styles.input}
                            type="string"
                            onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                            value={this.state.confirmPassword}
                            name="confirmPassword"
                            placeholder="Confirm your Password"
                            secureTextEntry
                        />

                        <TouchableHighlight
                            style={styles.submit}
                            onPress={()=> this.confirmPass()}
                            underlayColor='#fff'>
                            <Text style={styles.submitText}>Reset my Password</Text>
                        </TouchableHighlight>
                    </View>
                    { this.state.gotoLogin &&
                       navigate('login')
                    }
                    {/* <Text style={styles.subTitle}>If you need help resetting your password, we
                        can help by sending you a link to reset it.</Text>
                    <View style={styles.loginInfo}>
                        <TextInput
                            style={styles.input}
                            type="email"
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                            name="email"
                            placeholder="Enter your email"
                            required
                        />

                        <TouchableHighlight
                            style={styles.submit}
                            onPress={()=> this.forgotPassword()}
                            underlayColor='#fff'>
                            <Text style={styles.submitText}>Reset my Password</Text>
                        </TouchableHighlight>
                    </View> */}
                </View>
            </ImageBackground>
        );
    }
}

export default ResetPassword;

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