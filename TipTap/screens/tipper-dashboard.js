import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableHighlight,
  ScrollView
} from "react-native";
import { Container, Header, Content, Card, Textarea, Form } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import WALLET from "../assets/images/wallet.png";

class TipperDashboard extends Component {
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
                <Text
                  style={{ fontSize: 16, color: "#72BD20", fontWeight: "bold" }}
                >
                  $4500,00
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 12, color: "#9B9B9B" }}>
                  The Month Tips
                </Text>
                <Text
                  style={{ fontSize: 16, color: "#FF5A6E", fontWeight: "bold" }}
                >
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
                <Text style={styles.text}>Test Person</Text>
                <Text style={styles.text}>account</Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView style={styles.listWrapper}>
          <View>
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8",
                paddingBottom: "1%",
                fontSize: 10
              }}
            >
              15 Mar 2018
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
                    {" "}
                    Tip paid To James Maxwell
                  </Text>
                  <Text style={{ paddingLeft: "15%" }}> $20 USD</Text>
                </View>
              </View>
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
                    {" "}
                    Tip paid To James Maxwell
                  </Text>
                  <Text style={{ paddingLeft: "15%" }}> $20 USD</Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8",
                paddingBottom: "5%"
              }}
            >
              15 Mar 2018
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
                    {" "}
                    Tip paid To James Maxwell
                  </Text>
                  <Text style={{ paddingLeft: "15%" }}> $20 USD</Text>
                </View>
              </View>
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
                    {" "}
                    Tip paid To James Maxwell
                  </Text>
                  <Text style={{ paddingLeft: "15%" }}> $20 USD</Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8",
                paddingBottom: "5%"
              }}
            >
              15 Mar 2018
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
                    {" "}
                    Tip paid To James Maxwell
                  </Text>
                  <Text style={{ paddingLeft: "15%" }}> $20 USD</Text>
                </View>
              </View>
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
                    {" "}
                    Tip paid To James Maxwell
                  </Text>
                  <Text style={{ paddingLeft: "15%" }}> $20 USD</Text>
                </View>
              </View>
            </View>
            <Text
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#D8D8D8",
                paddingBottom: "5%"
              }}
            >
              15 Mar 2018
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
                    {" "}
                    Tip paid To James Maxwell
                  </Text>
                  <Text style={{ paddingLeft: "15%" }}> $20 USD</Text>
                </View>
              </View>
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
                    {" "}
                    Tip paid To James Maxwell
                  </Text>
                  <Text style={{ paddingLeft: "15%" }}> $20 USD</Text>
                </View>
              </View>
            </View>
          </View>
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
