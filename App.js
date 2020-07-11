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
import {StatusBar} from "react-native";

const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator()

const MyStack = () => {
    return (
        <Stack.Navigator
            headerMode='screen'
        >
            <Stack.Screen
                name='Home' component={MyTabs}/>
            <Stack.Screen name='Instagram' component={Instagram}/>
            <Stack.Screen name='WhatsApp' component={WhatsApp}/>
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
                    backgroundColor: COLOR
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
                <StatusBar backgroundColor={COLOR}/>
            </NavigationContainer>
        </Provider>
    );
}