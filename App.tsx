import React, { useState } from 'react';
import { Image, StyleSheet, View, } from 'react-native';

// Assuming you have separate component files for Detail screens:
import TemperatureDetail from './pages/TemperatureDetail'; // Replace with your component path
import HumidityDetail from './pages/HumidityDetail'; // Replace with your component path
import WindDetail from './pages/WindDetail'; // Replace with your component path
import WaterLevelDetail from './pages/WaterLevelDetail'; // Replace with your component path


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/Home';


function App(): JSX.Element {
    const [isLogined, setLogined] = useState(false);
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#22ace2',
                    tabBarInactiveTintColor: '#888',
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        marginTop: 5,
                        marginBottom: 5,
                    },
                    tabBarItemStyle: {
                        justifyContent: 'center',
                        paddingTop: 10,
                    },
                    tabBarStyle: {
                        display: 'flex',
                    },
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerTintColor: '#1c488c',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <View style={styles.headerLeft}>

                        </View>
                    ),
                    headerRight: () => (
                        <View style={styles.headerRight}>
                            <Image
                                style={styles.profileImage}
                                source={require('./assets/logo.png')}
                            />
                        </View>
                    ),
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: '',
                        tabBarIcon: () => {
                            return (
                                <Image
                                    style={{ width: 25, height: 25, marginTop: 20 }}
                                    source={require('./assets/home.png')}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Temperature"
                    component={TemperatureDetail}
                    options={{
                        title: '',
                        tabBarIcon: () => {
                            return (
                                <Image
                                    style={{ width: 25, height: 25, marginTop: 20 }}
                                    source={require('./assets/temperature.png')}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Humidity"
                    component={HumidityDetail}
                    options={{
                        title: '',
                        tabBarIcon: () => {
                            return (
                                <Image
                                    style={{ width: 25, height: 25, marginTop: 20 }}
                                    source={require('./assets/humidity.png')}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Wind"
                    component={WindDetail}
                    options={{
                        title: '',
                        tabBarIcon: () => {
                            return (
                                <Image
                                    style={{ width: 25, height: 25, marginTop: 20 }}
                                    source={require('./assets/wind.png')}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="WaterLevel"
                    component={WaterLevelDetail}
                    options={{
                        title: '',
                        tabBarIcon: () => {
                            return (
                                <Image
                                    style={{ width: 25, height: 25, marginTop: 20 }}
                                    source={require('./assets/water_level.png')}
                                />
                            );
                        },
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerLeft: {
        marginLeft: 10,
    },
    logo: {
        width: 55,
        height: 55,
    },
    headerRight: {
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 33,
        height: 33,
        borderRadius: 20,
        marginLeft: 10,
    },
});

export default App;