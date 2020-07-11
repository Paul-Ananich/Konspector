import React, {useCallback} from "react";
import {Linking, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Feather} from "@expo/vector-icons";

export const OpenInstagramURL = ({url}) => {
    const handlePress = useCallback(
        async () => {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        },
        [url]
    );
    return (
        <TouchableOpacity onPress={() => handlePress()}>
            <Feather name="arrow-up-right" size={24} color="black"/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    dateButton: {
        alignItems: 'flex-start',
    },
    textStyle: {
        fontSize: 18,
        color: '#e91e63',
        textDecorationLine: 'underline'
    }
})