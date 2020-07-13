import React from "react";
import {Provider} from 'react-redux';
import store from "./src/Redux/store";
import {COLOR} from './src/config/config'

import {SecondScreen} from "./src/screens/SecondScreen";
import {FirstScreen} from "./src/screens/FirstScreen";
import {Instagram} from "./src/tapes/Instagram"
import {WhatsApp} from "./src/tapes/WhatsApp";

import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createStackNavigator} from '@react-navigation/stack'
import {StatusBar, View} from "react-native";

import {FontAwesome} from '@expo/vector-icons'
import {Entypo} from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator()

const MyStack = () => {
    return (
        <Stack.Navigator
            headerMode='screen'
            screenOptions={{
                title: 'Конспектор',
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: COLOR,
                    elevation: 0
                },
                headerRight: () => (
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <FontAwesome
                            name="search"
                            size={20}
                            color="white" marginRight={10}
                        />
                        <Entypo
                            name="dots-three-vertical"
                            size={20}
                            color="white"
                        />
                    </View>
                )
            }}
        >
            <Stack.Screen name='Home' component={MyTabs}/>
            <Stack.Screen name='Instagram' component={Instagram}
                          options={{title: '', headerRight: () => null}}/>
            <Stack.Screen name='WhatsApp' component={WhatsApp}
                          options={{title: '', headerRight: () => null}}/>
        </Stack.Navigator>
    )
}

const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Konspector"
            tabBarOptions={{
                activeTintColor: 'white',
                pressColor: 'white',
                indicatorStyle: {
                    backgroundColor: 'white'
                },
                style: {
                    backgroundColor: COLOR,
                }
            }}
        >
            <Tab.Screen
                name="First"
                component={FirstScreen}
                options={{
                    tabBarLabel: 'Ленты',
                }}/>
            <Tab.Screen
                name="Second"
                component={SecondScreen}
                options={{
                    tabBarLabel: 'Источники',
                }}/>
        </Tab.Navigator>
    )
}

export default function App() {

    return (
        <Provider store={store}>
            <NavigationContainer>
                <MyStack/>
                <StatusBar backgroundColor='#017e9c'/>
            </NavigationContainer>
        </Provider>
    );
}