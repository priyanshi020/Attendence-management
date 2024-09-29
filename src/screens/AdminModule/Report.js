import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React from 'react';
import Navbar from '../components/Navbar';
import { BLUE } from '../../styles/colors';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import vector icons for print icon

export default function Report() {
  // Function to generate an array of dates for the current month
  const generateDatesForCurrentMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const dates = [];

    // Get the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Push each date into the array
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(new Date(year, month, day).toLocaleDateString());
    }

    return dates;
  };

  const dates = generateDatesForCurrentMonth(); // Get current month dates

  return (
    <View style={styles.container}>
      <Navbar />
      
      {/* Heading with Print Icon */}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>REPORT VIEW</Text>
        <TouchableOpacity onPress={() => console.log('Print action')}>
          {/* <Icon name="printer" size={30} color={BLUE} /> */}
          <Image style={styles.profileImage}
          resizeMode="cover" source={require('../../Images/printer-machine.png')}/>
        </TouchableOpacity>
      </View>

      {/* Scrollable table view */}
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableHeader, styles.tableCell]}>Name</Text>
            <Text style={[styles.tableHeader, styles.tableCell]}>Age</Text>
            <Text style={[styles.tableHeader, styles.tableCell]}>Rate</Text>
            <Text style={[styles.tableHeader, styles.tableCell]}>Duty</Text>
            <Text style={[styles.tableHeader, styles.tableCell]}>Salary</Text>
            {dates.map((date, index) => (
              <Text key={index} style={[styles.tableHeader, styles.tableCell]}>{date}</Text>
            ))}
          </View>

          {/* Sample data rows */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>John Doe</Text>
            <Text style={styles.tableCell}>30</Text>
            <Text style={styles.tableCell}>$15/hr</Text>
            <Text style={styles.tableCell}>8 hrs</Text>
            <Text style={styles.tableCell}>$120/day</Text>
            {dates.map((_, index) => (
              <Text key={index} style={styles.tableCell}>P</Text>
            ))}
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Jane Smith</Text>
            <Text style={styles.tableCell}>25</Text>
            <Text style={styles.tableCell}>$18/hr</Text>
            <Text style={styles.tableCell}>6 hrs</Text>
            <Text style={styles.tableCell}>$108/day</Text>
            {dates.map((_, index) => (
              <Text key={index} style={styles.tableCell}>A</Text>
            ))}
          </View>

          {/* Add more rows as needed */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
  },
  profileImage: {
    width: '20%',
    height: '20%',

  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: BLUE,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableCell: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
  },
});
