import {StyleSheet, View} from "react-native";
import React from "react";
import {ShowInstaDataButton} from "../Components/ShowInstaDataButton";
import {WhatsAppButton} from "../Components/WhatsAppButton";
import {COLOR} from '../config/config'

export const SecondScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View>
                <ShowInstaDataButton/>
                <WhatsAppButton/>
            </View>
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
})
