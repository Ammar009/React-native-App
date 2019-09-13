import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

const TipTapButton = () => {
    return (
        <TouchableHighlight
            style={styles.submit}
            onPress={() => this.submitSuggestion(this.props)}
            underlayColor='#fff'>
            <Text style={styles.submitText}>Create Account</Text>
        </TouchableHighlight>
    )
}

export default TipTapButton;
const styles = StyleSheet.create({
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
});
