import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';



const CircleView = ({ title, value, unit, borderColor }) => {
    return (
        <View style={styles.circleContainer}>
            <View style={[styles.circle, { borderColor }]}>
                <View style={styles.textCircle}>
                    <View style={{ position: "absolute", top: 37, width: 145, alignItems: "center" }}>
                        <Text style={styles.text}>{value}</Text>
                    </View>
                </View>
                <View style={styles.textUnitCircle}>
                    <View style={{ position: "absolute", top: 83, width: 145, alignItems: "center" }}>
                        <Text style={styles.textUnit}>{unit}</Text>
                    </View>

                </View>
            </View>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    );
};
const Home = ({ navigation }) => {

    const [dateTime, setDateTime] = useState('');
    const url = "http://192.168.8.104:5000/current_data/all"
    const [values, setValues] = useState(['24', '73', '35', "41"])
    const titles = ['Température', 'Humidité', 'Vent', "Niveau d'eau"];
    const units = ['C', '%', 'Km/h', "%"];
    const fetchData = async () => {

        try {
            const response = await fetch(url, {});
            if (response.ok) {
                const data = await response.json();
                setValues([data[0].Temperature, data[0].Humidity, data[0].Speed, data[0].water_level])

            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const formattedDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
            setDateTime(formattedDateTime);
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.dateTimeText}>{dateTime}</Text>
                </View>
            </View>

            <View style={styles.container}>
                <View style={styles.row}>
                    <CircleView title={titles[0]} value={values[0]} unit={units[0]} borderColor="red" />
                    <CircleView title={titles[1]} value={values[1]} unit={units[1]} borderColor="blue" />
                </View>
                <View style={styles.row}>
                    <CircleView title={titles[2]} value={values[2]} unit={units[2]} borderColor="black" />
                    <CircleView title={titles[3]} value={values[3]} unit={units[3]} borderColor="yellow" />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
    },
    dateTimeContainer: {
        backgroundColor: '#1a69cc', // Gray color
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateTimeText: {
        fontSize: 20,
        color: 'white',
    },
    row: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around', // Space views evenly in the row
    },
    circleContainer: {
        alignItems: 'center',
        marginVertical: 10, // Add vertical margin between circles
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2, // Calculate radius for a circle
        backgroundColor: 'white', // Light gray background
        borderColor: "red",
        borderWidth: 5,
        position: "relative",
    },
    textCircle: {
        position: "absolute",

    },
    textUnitCircle: {
        textAlign: "center",
        width: 150,
    },
    text: {
        fontWeight: "bold",
        fontSize: 40,
    },
    textUnit: {
        fontSize: 25,
    },
    titleText: {
        fontSize: 14,
        textAlign: 'center',
        color: "#999",
        paddingTop: 5,
    },
});

export default Home;
