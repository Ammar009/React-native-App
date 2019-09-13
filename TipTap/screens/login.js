import React, { Component } from 'react';
//import SplashScreen from 'react-native-splash-screen'
import { 
  View,
  Alert,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  Platform 
} from 'react-native';
// import Icon from "react-native-vector-icons/Ionicons";
import bg from '../assets/images/login-bg.jpg'
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    //this.onChangeText = this.onChangeText.bind(this);
  }

  // componentDidMount() {
  //   SplashScreen.show();
  //   this.splashScreenClose();
  //   // do stuff while splash screen is shown
  //     // After having done stuff (such as async tasks) hide the splash screen
     
  // }
  // splashScreenClose(){
  //   setTimeout( SplashScreen.hide(), 3000);
  // }

  login() {
    console.log('INNN LOGIN')
    fetch('http://192.168.1.132:3000/api/users/login',{
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
      AsyncStorage.setItem('isLoggedIn', 1)
      Alert.alert('Welcome!!!')
      this.props.navigation.navigate('tipperDashboard'); 
      //Alert.alert(response);
    }).catch((err) => {
        Alert.alert('There is some error, Kindly login Again')
        .done();
})
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
            <TouchableOpacity onPress={() => navigate('forgotPassword')}>
                <Text style={styles.input}>Forgot ? </Text>
              </TouchableOpacity>

            <TouchableHighlight
              style={styles.submit}
              onPress={()=> this.login()} //tipperDashboard changed to ReceiverDashboard
              underlayColor='#fff'>
              <Text style={styles.submitText}>Login</Text>
            </TouchableHighlight>
            <View style={styles.naviagtionActions}>
              <TouchableOpacity>
                <Text style={{ color: 'gray' }}>Do Not have an Account ? </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate('signup')}>
                <Text style={{ color: '#81CE2D' }}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigate('ReceiverDashboard')}>
                <Text style={{ color: '#81CE2D',paddingLeft:20 }}>Receiver Register</Text>
              </TouchableOpacity>

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