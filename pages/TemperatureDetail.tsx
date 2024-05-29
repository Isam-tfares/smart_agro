import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';

const TemperatureDetail = ({ navigation }) => {
    const [chosenDate, setChosenDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [filterType, setFilterType] = useState('day');
    const [hours, setHours] = useState([]);
    const [days, setDays] = useState([]);
    const [temperatures, setTemperatures] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchData = async (chosenDate) => {
        setLoading(true);
        const year = chosenDate.getFullYear();
        const month = chosenDate.getMonth() + 1; // getMonth() returns 0-11
        const day = chosenDate.getDate();
        const url = filterType === 'day'
            ? `http://192.168.8.104:5000/data/day/${year}/${month}/${day}/Temperature`
            : `http://192.168.8.104:5000/data/month/${year}/${month}/Temperature`;
        // console.log(url)
        try {
            const response = await fetch(url, {

            });

            if (response.ok) {
                const data = await response.json();
                // console.log(data)
                setTemperatureData(data);
                if (filterType === 'day') {
                    setHours(extractHours(data));
                    setTemperatures(extractTemperatures(data));
                } else {
                    extractDaysAndTemp(data);
                }
                setLoading(false);
            } else {
                console.log('Error:', response.status);
            }
        } catch (error) {
            console.log('Error:', error);
        }
        setLoading(false);
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || chosenDate;
        setShowDatePicker(false);
        setChosenDate(currentDate);
    };

    const formatDate = (date) => {
        if (filterType === 'day') {
            return date.toLocaleDateString();
        } else {
            // Format as month/year
            return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' });
        }
    };
    const extractDays = (data) => {
        if (data == null) { return []; }
        return data.map(entry => entry.timestamp.split(' ')[0].split('-')[2]);
    };
    const extractHours = (data) => {
        if (data == null) { return []; }

        return data.map(entry => entry.timestamp.split(' ')[1].split(':')[0]);
    };
    const extractTemperatures = (data) => {
        if (data == null) { return []; }

        return data.map(entry => entry.Temperature);
    };
    const extractDaysAndTemp = (data) => {
        all_days = extractDays(data);
        if (all_days.length == 0) {
            setChosenDate(new Date())
            setFilterType('day')
            return;
        }
        temp = extractTemperatures(data);
        function calculateAverageTemperature(day, temperatures) {
            const tempsForDay = temperatures.filter((_, index) => all_days[index] === day);
            const averageTemp = tempsForDay.reduce((acc, val) => acc + val, 0) / tempsForDay.length;
            return averageTemp.toFixed(2); // Round to 2 decimal places
        }

        // Get unique days
        const uniqueDays = [...new Set(all_days)];

        const new_temp = uniqueDays.map(day => calculateAverageTemperature(day, temp));
        setDays(uniqueDays)
        setTemperatures(new_temp)

    }

    // Placeholder data for the chart
    const data = {
        labels: filterType === 'day' ? hours : days,
        datasets: [
            {
                data: temperatures,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Température"] // optional
    };

    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        fetchData(chosenDate);
    }, [chosenDate, filterType]);


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Stats</Text>
            <Text style={styles.title2}>Température</Text>

            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={showDatePickerModal} style={styles.appButtonContainer}>
                    <Text style={styles.appButtonText}>{formatDate(chosenDate)}</Text>
                </TouchableOpacity>

                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filterType === 'day' && styles.activeFilterButton,
                        ]}
                        onPress={() => setFilterType('day')}
                    >
                        <Text style={styles.filterButtonText}>Jour</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterButton,
                            filterType === 'month' && styles.activeFilterButton,
                        ]}
                        onPress={() => setFilterType('month')}
                    >
                        <Text style={styles.filterButtonText}>Mois</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={chosenDate}
                    mode={filterType === 'day' ? 'date' : 'date'}
                    display="default"
                    onChange={onChange}
                />
            )}

            <LineChart
                data={data}
                width={screenWidth - 40} // from react-native
                height={220}
                verticalLabelRotation={30}
                yAxisLabel="°C "
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#ffa726'
                    }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
                bezier
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    title2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#444',
        // borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 10,
    },
    dateText: {
        fontSize: 18,
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
    },
    filterContainer: {
        flexDirection: 'row',
        marginRight: 10,
    },
    filterButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ddd',
        marginRight: 10,
    },
    activeFilterButton: {
        backgroundColor: '#aaa',
    },
    filterButtonText: {
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    appButtonContainer: {
        backgroundColor: "#ccc",
        borderRadius: 10,
        width: 150,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 15,
        color: "#000",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});

export default TemperatureDetail;
