import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export const NavigationButton = ({navName}) => {

    const navigation = useNavigation()
    return (
        <View style={styles.content}>
            <TouchableOpacity
                onPress={() => navigation.navigate(navName)}
            >
                <Text style={styles.txt}>{navName}</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: "#FFFFFF",
        height: 60,
        width: '90%',
        marginLeft: 15
    },
    txt: {
        color: "#000",
        fontSize: 25,
        alignItems: "center",
        justifyContent: "center"
    }
})