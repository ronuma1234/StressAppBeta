import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Animation from '../screens/Animation'
import Home from '../screens/Home'
import Settings from '../screens/Settings'

const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown:false
}

//The function below hanndles the views that will be stacked, starting with the 'Animation' page
const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle} initialRouteName={"Animation"}>
            <Stack.Screen name="Animation" component={Animation} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;
