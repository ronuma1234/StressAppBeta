import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackNavigator from './src/navigator/Navigation';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

export default function App() {

    //The app uses the navigation handler, that can be found in 'Navigation.js', to handle what screen in presented in screens
    return (
        <NavigationContainer>
            <HomeStackNavigator />
        </NavigationContainer>
     );
} 





