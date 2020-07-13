import {StyleSheet, View} from "react-native";
import React from "react";
import {NavigationButton} from "../Components/NavigationButton";
import {COLOR} from '../config/config'

export const SecondScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <NavigationButton navName={'Instagram'}/>
            <NavigationButton navName={'WhatsApp & Telegram'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // alignItems: "flex-start",
        // justifyContent: "flex-start",
        backgroundColor: COLOR
    },
})
