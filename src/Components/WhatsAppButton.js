import {StyleSheet, Text, View} from "react-native";
import {Button} from "native-base";
import React from "react";
import {useNavigation} from "@react-navigation/native";

export const WhatsAppButton = () => {

    const navigation = useNavigation()
    return (
        <View style={styles.content}>
            <Button
                style={styles.button}
                onPress={() => navigation.navigate('WhatsApp')}
                full
                rounded
                success
            >
                <Text style={styles.txt}>WhatsApp</Text>
            </Button>
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