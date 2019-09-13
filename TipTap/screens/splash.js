import React ,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native'

class SplashScreen extends Component{
    render() {
        return (
          <View style={styles.container}>
            <Text>splash screen</Text>
          </View>
        );
      }
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#66B80C',
    }
  });