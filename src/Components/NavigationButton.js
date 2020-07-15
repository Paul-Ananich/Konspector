import React from "react";
import {useNavigation} from "@react-navigation/native";
import {StyleSheet, Image, Text, View, TouchableOpacity} from "react-native";

export const NavigationButton = ({navName, source, id}) => {

    const navigation = useNavigation()

    return (
        <View style={styles.content}>
            <View style={styles.tapesView}>
                <View style={styles.imageView}>
                    <Image
                        style={styles.img}
                        source={source}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Groups', {id})}
                >
                    <Text style={styles.txt}>{navName}</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    tapesView: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        backgroundColor: 'white',
    },
    imageView: {
        justifyContent: 'center'
    },
    txt: {
        color: "#000",
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: "center",
        justifyContent: "center"
    },
    img: {
        margin: 10,
        width: 40,
        height: 40,
        // backgroundColor: 'black'
    }
})