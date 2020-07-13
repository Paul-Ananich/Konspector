import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {COLOR} from '../config/config'

export const FirstScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Подборки</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR

    },
    text: {
        color: 'white',
        fontSize: 30
    }
})