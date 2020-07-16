import { COLOR2 } from '../config/config'
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { NavigationButton } from "../Components/NavigationButton";

export const SecondScreen = () => {

    let [data, setData] = useState([]);

    const groupsSource = require('../../assets/groups.jpg')
    const instaSource = require('../../assets/instagram.jpg')

    const prodUrl = `https://newtesttask.herokuapp.com/groups`;
    const devUrl = `http://192.168.0.103:5000/groups`;

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        fetch(prodUrl)
            .then(response => response.json())
            .then(responseJson => {
                return (
                    setData(responseJson)
                )
            })
            .catch(error => {
                console.error(error);
            });
    };

    const renderFlatListItem = item => {
        const source = item.source_type==='instagram' ? instaSource : groupsSource
        return item
            ? <NavigationButton navName={item.name} source={source} id={item.feed_entity_id}/>
            : null;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => renderFlatListItem(item)}
                onEndReachedTreshold={0}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: COLOR2
    },
})
