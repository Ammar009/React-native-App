import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {LOCALHOSTVPN} from '../config';
import { View, Alert, Text, StyleSheet, TextInput, TouchableHighlight, ImageBackground, TouchableOpacity, ScrollView, Platform } from 'react-native';
import bg from '../assets/images/login-bg.jpg'
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  async componentWillMount () {
    const user = await AsyncStorage.getItem('isLoggedIn');
      if(user.userType === 'tipgiver') {
        this.props.navigation.navigate('tipperDashboard');
      } else {
        this.props.navigation.navigate('receiverDashboard');
      }
  }
  login() {
    if (this.state.email === '' || this.state.password === '')  {
      Alert.alert('Please fill out the fields')
    } else {
      console.log('xxxxxxxxxxxxxx', this.state)
      fetch(`${LOCALHOSTVPN}/api/users/login`,{
        method: 'POST',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          email: `${this.state.email}`,
          password: `${this.state.password}`,
        })
      }).then(response => response.json())
        .then(response => {
          if(response.user.userType === 'tipgiver') {
            AsyncStorage.setItem('isLoggedIn', JSON.stringify(response.user), async () => {
              const test = await AsyncStorage.getItem('isLoggedIn');
              Alert.alert('Welcome!!!');
              this.props.navigation.navigate('tipperDashboard', {
                user: response.user
              });
            });
          } else {
            AsyncStorage.setItem('isLoggedIn', JSON.stringify(response.user), async () => {
              const test = await AsyncStorage.getItem('isLoggedIn');
              Alert.alert('Welcome!!!');
              this.props.navigation.navigate('receiverDashboard', {
                user: response.user
              });
            });
          }
          console.log('=======+++++++++++++++', response.user.userType)
          
        }).catch((err) => {
            Alert.alert('There is some error, Kindly login Again')
          }).done();
    }
  }

  static navigationOptions = {
    header: null
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <ImageBackground style={{ width: '100%', height: '100%' }} source={bg}>
        <View style={styles.container}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subTitle}>Sign in to continue</Text>
          <View style={styles.loginInfo}> 
          <TextInput
            style={styles.input}
            type="email"
            id="email"
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              type="password"
              id="password"
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            {/* <TouchableOpacity onPress={() => navigate('ReceiverDashboard')}>
                <Text style={{ color: '#81CE2D',paddingLeft:20 }}>Receiver Register</Text>
              </TouchableOpacity> */}
            <TouchableHighlight
              style={styles.submit}
              onPress={()=> this.login()} //tipperDashboard changed to ReceiverDashboard
              underlayColor='#fff'>
              <Text style={styles.submitText}>Login</Text>
            </TouchableHighlight>
            <View style={styles.naviagtionActions}>
              <View>
                <TouchableOpacity>
                <Text style={{ color: 'gray' }}>Do Not have an Account ? </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate('signup')}>
                <Text style={{ color: '#81CE2D' }}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate('forgotPassword')}>
                <Text style={{ color: '#81CE2D' }}> Forgot? </Text>
              </TouchableOpacity>
              </View>

            </View>

          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default LoginScreen;

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
  input: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop:Platform.OS==='ios'?'5%':0,
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