import React, { Component } from "react";
import {LOCALHOSTVPN} from '../config';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableHighlight,
  ScrollView, 
  Alert
} from "react-native";
import { Card } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import WALLET from "../assets/images/wallet.png";
import AsyncStorage from "@react-native-community/async-storage";

class TipperDashboard extends Component {
  constructor() {
    super();
    this.state = {
        tipGiveruser: '',
        allTipRecieverUser: [],
        totalAmount: '',
    };
  }
  async componentWillMount () {
    
    const val = await AsyncStorage.getItem('isLoggedIn');
    this.setState({
      tipGiveruser : JSON.parse(val)
    })
    fetch(`${LOCALHOSTVPN}/api/userTipReciever/getAllTipRecieverUser/${this.state.tipGiveruser.email}`,{
      method: 'GET',
    }).then(response => response.json())
      .then(response => {
        this.setState({
          allTipRecieverUser: response.tipRecieverUser
        })
        // console.log('response', this.state.allTipRecieverUser.length)
      }).catch((err) => {
        Alert.alert('Error');
      })
      .done();
      let x =  await this.getAllTipGivenAmount();
      console.log('xxxxxx', x);
  }

  async getAllTipGivenAmount () {
    let totalAmount = 0;
    let x = this.state.allTipRecieverUser.map(TRU=> {
      totalAmount = totalAmount + TRU.tipAmount
    })
    console.log('***************', x);
    return this.totalAmount
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={{ flex: 1, zIndex: -1 }}>
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "8%"
              }}
            >
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
              <View
                style={{
                  backgroundColor: "#FFFFFF",
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  marginRight: 10
                }}
              />
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.text}>{this.state.tipGiveruser.first_name}</Text>
                <Text style={styles.text}>{this.state.tipGiveruser.last_name}</Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={styles.listWrapper}>
            {this.state.allTipRecieverUser.length > 0 ? this.state.allTipRecieverUser.map((item, index)=>{
          return (<View key={index}>
            <Text
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#D8D8D8",
              paddingBottom: "1%",
              fontSize: 10
            }}
          >
            {item.recievingDate}
          </Text>
          <View style={styles.tipItems}>
            <View style={styles.tipItem}>
              <Icon name="ios-card" size={25} color="#7AC727" />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    paddingLeft: "5%",
                    paddingTop: "1%",
                    fontSize: 10
                  }}
                >
                  Tip paid To {item.reciever_name}
                </Text>
                <Text style={{ paddingLeft: "15%" }}> ${item.tipAmount} USD</Text>
              </View>
            </View>
          </View> 
          </View>)})
          : <View>
            <Text>No History</Text>
          </View>
            }
        </ScrollView>
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            navigate("search");
          }}
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
        height: "26%",
        top: 110,
        left: 20,
        right: 20,
        borderRadius: 8,
        zIndex: 1
      },
      ios: {
        position: "absolute",
        height: "22%",
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
        paddingTop: "20%",
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
  }
});
