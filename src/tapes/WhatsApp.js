import {StyleSheet, View, Text} from "react-native";
import React from "react";
import {COLOR} from '../config/config'

export const WhatsApp = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>WhatsApp</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR
    },
    text: {
        color: 'white',
        fontSize: 30
    }
})
