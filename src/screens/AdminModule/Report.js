import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import Navbar from '../components/Navbar';
import {BLUE} from '../../styles/colors';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';

export default function Report() {
  const generateDatesForCurrentMonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const dates = [];
    const route = useRoute();
    const {data}=route.params;
    console.log('data',data);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const options = {day: 'numeric', month: 'short'}; // Short month formata
      dates.push(
        new Date(year, month, day).toLocaleDateString(undefined, options),
      );
    }

    return dates;
  };

  const dates = generateDatesForCurrentMonth();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Navbar />

        {/* Heading with Print Icon */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>REPORT VIEW</Text>
          <TouchableOpacity onPress={() => console.log('Print action')}>
            <Image
              style={styles.profileImage}
              resizeMode="cover"
              source={require('../../Images/printer-machine.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Scrollable table view */}
        <ScrollView horizontal={true} style={styles.scrollContainer}>
          <View>
            {/* Table Header */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeader, styles.fixedColumn]}>Name</Text>
              <Text style={[styles.tableHeader, styles.fixedColumn]}>Age</Text>
              {/* <Text style={[styles.tableHeader, styles.fixedColumn]}>Rate</Text>
              <Text style={[styles.tableHeader, styles.fixedColumn]}>Duty</Text>
              <Text style={[styles.tableHeader, styles.fixedColumn]}>Salary </Text> */}

              {/* Dates - Ensure wide enough for horizontal scroll */}
              <View style={styles.dateRow}>
                {dates.map((date, index) => (
                  <Text key={index} style={styles.dateColumn}>
                    {date}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: BLUE,
  },
  profileImage: {
    width: 30,
    height: 30,
  },
  scrollContainer: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
  },
  fixedColumn: {
    width: 80, // Fixed width for the name, age, rate, duty, salary columns
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
  },
  dateRow: {
    flexDirection: 'row',
  },
  dateColumn: {
    width: 100,
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    textAlign: 'center',
  },
});
