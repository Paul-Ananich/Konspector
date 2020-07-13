import {ActivityIndicator, FlatList, TouchableOpacity, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {SearchBar} from "react-native-elements";
import {useDispatch, useSelector} from "react-redux";
import {setDataTC} from "../Redux/reducers/FirstScreenReducer";
import moment from "moment";
import { COLOR2 } from '../config/config'
import {OpenInstagramURL} from "../Components/OpenInstagram";
import {Feather} from "@expo/vector-icons";

export const Instagram = () => {

    useEffect(() => {
        fetchData()
    }, [])

    let [page, setPage] = useState(1);
    let [isFetched, setIsFetched] = useState(false);
    let [isMoreDataLoading, setIsMoreDataLoading] = useState(false);
    let [isLoading, setIsLoading] = useState(true)

    const prodUrl = `https://newtesttask.herokuapp.com/instagram?page=${page}&limit=25`;
    const devUrl = `http://192.168.0.104:5000/instagram?page=${page}&limit=25`;

    const data = useSelector(state => state.app.dbData)

    const dispatch = useDispatch()

    const fetchData = async () => {
        fetch(prodUrl)
            .then(response => response.json())
            .then(responseJson => {
                return (
                    dispatch(setDataTC(responseJson)),
                        setIsLoading(false),
                        setIsFetched(true),
                        setIsMoreDataLoading(false)
                )
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleLoadMore = () => {
        setIsMoreDataLoading(true)
        setPage(page + 1)
        fetchData()
    }

    const renderFooter = () => {
        return (
            isMoreDataLoading ?
                <View style={styles.customLoader}>
                    <ActivityIndicator size='large' color="white"/>
                </View> : null
        )
    }
    const renderHeader = () => {
        return <SearchBar placeholder='Type here' LightTheme round/>
    }

    const renderFlatListItem = item => {
        return item
            ? <View style={styles.itemContent}>
                <View style={styles.firstGroup}>
                    <Text style={styles.name}>
                        {item.name}
                        {/*<OpenInstagramURL*/}
                        {/*    url={item.source_url}*/}
                        {/*/>*/}
                        <Feather name="arrow-up-right" size={24} color="black"/>
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

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator size='large' color="white"/> :
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => renderFlatListItem(item)}
                    onEndReached={handleLoadMore}
                    onEndReachedTreshold={0}
                    ListFooterComponent={renderFooter}
                    // ListHeaderComponent={renderHeader}
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
