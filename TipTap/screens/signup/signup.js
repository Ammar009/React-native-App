import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight, Platform, StyleSheet, SafeAreaView } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';
import TipperSignup from './tipper-signup';
import TipReceiverSignup from './receiver-signup';

class SignupScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 0.3 }}>
                    <Text style={styles.title}>Register</Text>
                </View>
                <View style={{ flex: 3, marginTop: '5%', flexDirection:'column' }}>
                    <ViewTab />
                </View>
            </SafeAreaView>)
    }
}
export default SignupScreen;

const TabNavigatorDashboard = createMaterialTopTabNavigator({

    tipper: {
        screen: TipperSignup,
        navigationOptions: {
            tabBarLabel: 'Tipper'
        }
    },
    tipReceiver: {
        screen: TipReceiverSignup,
        navigationOptions: {
            tabBarLabel: 'Tip Receiver'
        }
    }
},
    {
        initialRouteName: 'tipper',
        tabBarOptions: {
            activeTintColor: 'black',
            activeTintWeight: 'bold',
            inactiveTintColor: '#3b3f44',
            labelStyle: { fontSize: 10 },

            style: {
                backgroundColor: 'none'
            }
        }

    });


const SignUpScreenStack = createSwitchNavigator({
    Signup: { screen: TabNavigatorDashboard },
}, {
        initialRouteName: 'Signup',
        navigationOptions: {
            header: null
        }
    });

const ViewTab = createAppContainer(SignUpScreenStack);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
    },
})