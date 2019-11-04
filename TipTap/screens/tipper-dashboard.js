import React, { Component } from "react";
import DatePicker from 'react-native-datepicker';
import { Avatar } from 'react-native-elements'
import {LOCALHOSTVPN} from '../config';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import { StyleSheet, Platform, View, Text, SafeAreaView, Image, TouchableHighlight, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Card } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import WALLET from "../assets/images/wallet.png";
import AsyncStorage from "@react-native-community/async-storage";

const Fetch = RNFetchBlob.polyfill.Fetch
window.fetch = new Fetch({
    auto : true,
    binaryContentTypes : [
        'image/',
        'video/',
        'audio/',
        'foo/',
    ]
}).build()


class TipperDashboard extends Component {
  constructor() {
    super();
    this.state = {
        tipGiveruser: '',
        allTipRecieverUser: [],
        totalAmount: 0,
        startDate: '',
        endDate: '',
        photo: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        avatarSource: '',
    };
  }
  async componentWillMount () {
    const val = await AsyncStorage.getItem('isLoggedIn');
    this.setState({
      tipGiveruser : JSON.parse(val)
    })
    this.setState({
      photo : this.state.tipGiveruser.profileImage
    })
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', this.state.photo)
    fetch(`${LOCALHOSTVPN}/api/userTipReciever/getAllTipRecieverUser/${this.state.tipGiveruser.email}`,{
      method: 'GET',
    }).then(response => response.json())
      .then(response => {
        this.setState({
          allTipRecieverUser: response.tipRecieverUser
        })
      }).catch((err) => {
        Alert.alert('Error');
      })
      .done();
  }

  dateSelection() {
    console.log('this.state.totalAmount', this.state.totalAmount);
    if(this.state.startDate !== "" && this.state.endDate !== "" ){
      Alert.alert('INN IFFF')
      fetch(`${LOCALHOSTVPN}/api/userTipReciever/getTipsBetweenRange/${new Date(this.state.startDate)}/${new Date(this.state.endDate)}`,{
        method: 'GET',
    }).then(response => response.json())
    .then(response => {
      this.setState({
        allTipRecieverUser: response.specificTipRecieverUser
      })
    }).catch((err) => {
        Alert.alert('Error');
        })
        .done();
    } else {
      Alert.alert('Fill the Dates')
    } 
  }

  imageUpload = () => {
    try {
      const options = {
        allowsEditing: true,
        mediaType: 'mixed',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
  
      ImagePicker.showImagePicker(options, async (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const image = response.uri
          const Blob = RNFetchBlob.polyfill.Blob;
          const fs = RNFetchBlob.fs;
          window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
          window.Blob = Blob;
          let uploadBlob = null;
          const imageRef = firebase.storage().ref('profile').child(`${this.state.tipGiveruser._id}.jpg`);
          let mime = 'image/jpg'
          fs.readFile(image, 'base64')
          .then((data) => {
            return Blob.build(data, {type: `${mime};base64`})
          })
          .then((blob) => {
            uploadBlob = blob;
            return imageRef.put(blob, {contentType: mime})
          })
          .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
          })
          .then( async (url)=> {
            this.setState({
              photo : url,
            })
            console.log('=======================================================', this.state.tipGiveruser)
            fetch(`${LOCALHOSTVPN}/api/users/uploadImage`,{
              method: 'POST',
              headers: {
                  'Accept' : 'application/json',
                  'Content-Type' : 'application/json',
              },
              body: JSON.stringify({
                id : `${this.state.tipGiveruser._id}`,
                imageUrl: url
              })
          }).then(response => response.json())
          .then(response => {
              console.log('Finnannanananananannanana', response)
          }).catch((err) => {
              console.log('err', err)
            })
              .done();
          })
        .catch((error)=> {
          console.log(error)
        })
        }
      });
    } catch (error) {
      Alert.alert(JSON.stringify(error))
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Card style={styles.card}>
          <View style={{ padding: 15 }}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Image source={WALLET} />
              </View>
              <View>
                <Text style={{ paddingLeft: 10, fontSize: 21 }}>Activity</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "8%" }}>
              <View>
                <Text style={{ fontSize: 12, color: "#9B9B9B" }}>
                  To be calculated
                </Text>
                <Text style={{ fontSize: 16, color: "#72BD20", fontWeight: "bold" }}>
                  {/* {this.getAllTipGivenAmount()} */}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: "#9B9B9B" }}>
                  The Month Tips
                </Text>
                <Text style={{ fontSize: 16, color: "#FF5A6E", fontWeight: "bold" }}>
                  $320,00
                </Text>
              </View>
            </View>
          </View>
        </Card>
        <View style={styles.headerWrapper}>
          <View
            style={{
              flexDirection: "row",
              paddingTop: "10%",
              paddingLeft: "8%",
              paddingRight: "8%",
              justifyContent: "space-between"
            }}
          >
            <View>
              <Icon name="ios-menu" size={32} color="#FFFFFF" />
            </View>
            <View style={{ flexDirection: "row" }}>
                {!this.state.photo ? (<Avatar
                  size="medium"
                  source={{
                    uri:
                      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                  }}
                  rounded
                  onPress={() => this.imageUpload()}
                  activeOpacity={0.7}
                  containerStyle={{marginRight: 5}}
                  showEditButton
                />) : (<Avatar
                  size="medium"
                  source={{
                    uri:
                      this.state.photo,
                  }}
                  rounded
                  onPress={() => this.imageUpload()}
                  activeOpacity={0.7}
                  containerStyle={{marginRight: 5}}
                  showEditButton
                />)}
              
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.text}>{this.state.tipGiveruser.first_name}</Text>
                <Text style={styles.text}>{this.state.tipGiveruser.last_name}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: "15%"}}>
          <View style={{ flexDirection: "column", margin: 5}}>
          <Text style={{ color: "black", justifyContent: "space-between"}}>Start Date:</Text>
          <DatePicker
            style={{ width: 165 }}
            date={this.state.startDate}
            mode="date"
            placeholder="Staring Date"
            format="MM-DD-YYYY"
            minDate="01-01-2019"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 0
              }
            }}
            onDateChange={date => {
              this.setState({ startDate: date });
            }}
          />
          </View>
          <View style={{ flexDirection: "column", margin: 5}}>
          <Text style={{ color: "black", justifyContent: "space-between" }}>End Date:</Text>
          <DatePicker
            style={{ width: 165 }}
            date={this.state.endDate}
            androidMode='default'
            mode="date"
            placeholder="Ending Date"
            format="MM-DD-YYYY"
            minDate="01-01-2019"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 0
              }
            }}
            onDateChange={date => {
              this.setState({ endDate: date });
            }}
          />
          </View>
          
        </View>
          <TouchableHighlight
            style={styles.submit}
            onPress={()=> this.dateSelection()}
            underlayColor='#fff'>
            <Text style={styles.submitText}>Confirm</Text>
          </TouchableHighlight>
        <ScrollView style={styles.listWrapper}>
            {this.state.allTipRecieverUser.length > 0 ? this.state.allTipRecieverUser.map((item, index)=>{
          return (<TouchableOpacity key={index}>
          <View >
            <Text style={{ borderBottomWidth: 1, borderBottomColor: "#D8D8D8", paddingBottom: "1%", fontSize: 10}}>
            {moment(item.recievingDate).format('LLLL')}
            </Text>
          <View style={styles.tipItems}>
            <View style={styles.tipItem}>
              <Icon name="ios-card" size={25} color="#7AC727" />
              <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{ paddingLeft: "5%",paddingTop: "1%", fontSize: 10}}>
                  Tip paid To {item.reciever_name}
                </Text>
                <Text style={{ paddingLeft: "15%" }}> ${item.tipAmount} USD</Text>
              </View>
            </View>
          </View> 
          </View>
          </TouchableOpacity>
          )})
          : <View>
            <Text>No History</Text>
          </View>
            }
        </ScrollView>
        <TouchableHighlight style={styles.button}
          onPress={() => { navigate("search");}}
        >
          <Text style={styles.text}>Tip Now</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}

export default TipperDashboard;

const styles = StyleSheet.create({
  card: {
    ...Platform.select({
      android: {
        position: "absolute",
        height: "22%",
        top: 110,
        left: 20,
        right: 20,
        borderRadius: 8,
        zIndex: 1
      },
      ios: {
        position: "absolute",
        height: "20%",
        top: 170,
        left: 20,
        right: 20,
        borderRadius: 8,
        zIndex: 1
      }
    })
  },
  headerWrapper: {
    flex: 1,
    backgroundColor: "#66B80C",
    ...Platform.select({
      android: {
        marginBottom: "5%"
      },
      ios: {
        marginBottom: "40%"
      }
    })
  },
  text: {
    color: "#FFFFFF"
  },

  listWrapper: {
    flex: 2,

    ...Platform.select({
      android: {
        backgroundColor: "#F9F9F9",
        // paddingTop: "20%",
        paddingBottom: "20%",
        paddingLeft: "5%",
        paddingRight: "5%"
      },
      ios: {
        backgroundColor: "#F9F9F9",
        paddingBottom: "20%",
        paddingLeft: "5%",
        paddingRight: "5%"
      }
    })
  },
  footerWrapper: {
    flex: 0.3,
    backgroundColor: "#66B80C"
  },
  tipItems: {
    marginTop: "5%",
    position: "relative"
  },
  tipItem: {
    marginBottom: "2%",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    padding: "5%"
  },
  button: {
    flex: 0.3,
    backgroundColor: "#66B80C",
    justifyContent: "center",
    alignItems: "center"
  }, 
  submit: {
    width: '50%',
    marginRight: 100,
    borderRadius: 50,
    height: 40,
    backgroundColor: '#80d663',
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf:'flex-end',
    position: 'relative',
},
submitText: {
    color: '#fff',
    textAlign: 'center',
},
});
