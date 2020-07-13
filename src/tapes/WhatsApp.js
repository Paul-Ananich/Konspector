import {StyleSheet, View, Text, ActivityIndicator, FlatList} from "react-native";
import React, {useEffect, useState} from "react";
import {COLOR2} from '../config/config'
import moment from "moment";

export const WhatsApp = () => {

    useEffect(() => {
        fetchData()
    }, [])

    let [page, setPage] = useState(1);
    let [data, setData] = useState(1);
    let [isLoading, setIsLoading] = useState(true)

    const prodUrl = `https://newtesttask.herokuapp.com/messengers?page=${page}&limit=25`;
    const devUrl = `http://192.168.0.104:5000/messengers?page=${page}&limit=25`;


    const fetchData = async () => {
        fetch(prodUrl)
            .then(response => response.json())
            .then(responseJson => {
                return (
                    setData(responseJson),
                        setIsLoading(false)
            )
            })
            .catch(error => {
                console.error(error);
            });
    };

    const renderFlatListItem = item => {
        return item
            ? <View style={styles.itemContent}>
                <View style={styles.firstGroup}>
                    <Text style={styles.name}>
                        {item.name}
                    </Text>
                    <Text style={styles.substanceText}>
                        {item.essence}
                    </Text>
                </View>
                <View style={styles.secondGroup}>
                    <Text style={styles.date}>
                        {moment(item.date).format('hh:mm')}
                    </Text>
                </View>
            </View>
            : null;
    };

    console.log(data)

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator size='large' color="white"/> :
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => renderFlatListItem(item)}
                    onEndReachedTreshold={0}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR2
    },
    itemContent: {
        flex: 1,
        margin: 6,
        backgroundColor: 'white',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        padding: 10
    },
    firstGroup: {
        alignItems: 'flex-start'
    },
    secondGroup: {
        alignItems: 'flex-end'
    },
    name: {
        fontSize: 18,
        color: '#be5b55'
    },
    substanceText: {
        fontSize: 22
    },
    date: {
        fontSize: 15,
        color: "#464646",
        alignItems: 'flex-end'
    },
    customLoader: {
        marginTop: 10,
        alignItems: 'center'
    },
})
