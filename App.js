import React, { useState, useCallback } from "react";
import {
  Linking,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View } from "react-native";
import { Button } from "native-base";
import { SearchBar } from 'react-native-elements';

export default function App() {
  let [data, setData] = useState([0]);
  let [page, setPage] = useState(1);
  let [isFetched, setIsFetched] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [isMoreDataLoading, setIsMoreDataLoading] = useState(false);

  const prodUrl = `https://newtesttask.herokuapp.com/todayPosts?page=${page}&limit=50`;
  const devUrl = `http://192.168.0.101:5000/todayPosts?page=${page}&limit=50`;

  const fetchData = async () => {
    fetch(prodUrl)
      .then(response => response.json())
      .then(responseJson => {
        return (
                setData(data.concat(responseJson)),
                setIsFetched(true),
                setIsLoading(false),
                setIsMoreDataLoading(false)
        )
      })
      .catch(error => {
        console.error(error);
      });
  };

  const showData = () => {
    return setIsLoading(true), fetchData();
  };

  const renderFlatListItem = item => {
    return item
      ? <View style={styles.content}>
          <Text style={styles.name}>
            {item.name}
          </Text>
          <OpenURLButton
            url={item.source_url}
            children={new Date(item.date).toLocaleDateString("en-US")}
          />
          <Text style={styles.substance}>
            {item.essence}
          </Text>
        </View>
      : null;
  };

  const OpenURLButton = ({ url, children }) => {
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
      <Button style={styles.dateButton} onPress={handlePress}>
        <Text>
          {children}
        </Text>
      </Button>
    );
  };

  const but = () => {
    return isLoading
      ? <ActivityIndicator size="large" color="#e91e63" />
      : <Button
          style={styles.button}
          onPress={() => showData()}
          full
          rounded
          success
        >
          <Text style={styles.txt}>Istagram сегодня</Text>
        </Button>;
  };

  const handleLoadMore = () => {
    setIsMoreDataLoading(true)
    setPage(page+1)
    fetchData().then(r => console.log(page))
  }

  const renderFooter = () => {
    return (
        isMoreDataLoading ?
        <View style={styles.customLoader}>
          <ActivityIndicator size='large' color="#e91e63"/>
        </View> : null
    )
  }
  const renderHeader = () => {
    return <SearchBar placeholder='Type here'/>
  }

  console.log(devUrl)

  return (
    <View style={styles.container}>
      {isFetched
        ? <View style={styles.contView}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => renderFlatListItem(item)}
              onEndReached={handleLoadMore}
              onEndReachedTreshold={1}
              ListFooterComponent={renderFooter}
              ListHeaderComponent={renderHeader}
            />
          </View>
        : but()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  contView: {
    marginTop: 25,
    flex: 1
  },
  button: {
    backgroundColor: "#e91e63",
    margin: 60,
    height: 60
  },
  txt: {
    color: "white",
    fontSize: 25,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 1,
    margin: 10
  },
  name: {
    fontWeight: "bold",
    fontSize: 20
  },
  date: {
    fontSize: 15,
    color: "#464646"
  },
  substanceText: {
    fontSize: 15
  },
  dateButton: {
    marginRight: "70%",
    backgroundColor: "transparent"
  },
  customLoader: {
    marginTop: 10,
    alignItems: 'center'
  },
});
