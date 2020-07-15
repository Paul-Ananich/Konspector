import moment from "moment";
import {COLOR2} from '../config/config'
import {Feather} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearData, setDataTC} from "../Redux/reducers/GroupsReducer";
import {StyleSheet, View, Text, ActivityIndicator, FlatList} from "react-native";

export const Groups = ({route}) => {

    let [page, setPage] = useState(1);
    let [isMoreDataLoading, setIsMoreDataLoading] = useState(false);
    let [isLoading, setIsLoading] = useState(true)

    const {id} = route.params
    const dispatch = useDispatch()

    const data = useSelector(state => state.app.dbData)

    const prodUrl = `https://newtesttask.herokuapp.com/groups/${id}?page=${page}&limit=50`;
    const devUrl = `http://192.168.0.103:5000/groups/${id}?page=${page}&limit=50`;

    useEffect(() => {
        fetchData()
        return () => {
            dispatch(clearData())
        }
    }, [])

    const fetchData = async () => {
        fetch(devUrl)
            .then(response => response.json())
            .then(responseJson => {
                return (
                    dispatch(setDataTC(responseJson)),
                        setIsLoading(false),
                        setIsMoreDataLoading(false)
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

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator size='large' color="white"/> :
                <FlatList
                    inverted={-1}
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => renderFlatListItem(item)}
                    onEndReached={handleLoadMore}
                    onEndReachedTreshold={0}
                    ListFooterComponent={renderFooter}
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
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
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
