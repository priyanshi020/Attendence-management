import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Navbar from '../components/Navbar';
import { BLUE, SKIN } from '../../styles/colors';

// Department data with counts
const departments = [
    { id: '1', name: 'CIVIL', count: '52/35/00' },
    { id: '2', name: 'MILL', count: '40/25/05' },
    { id: '3', name: 'LABOUR', count: '30/20/10' },
    { id: '4', name: 'KITCHEN', count: '25/15/05' },
    { id: '5', name: 'PRINTING HOUSE', count: '35/20/10' },
];

export default function ViewScreen() {
  return (
    <View style={styles.container}>
      <Navbar />

      {/* Status and Date */}
      <View style={styles.statusDateContainer}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.label}>22/09/24</Text>
      </View>

      {/* Department and Count List */}
      <FlatList
        data={departments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.departmentItem}>
            <View style={styles.departmentRow}>
              {/* Department Name on the Left */}
              <Text style={styles.departmentText}>{item.name}</Text>

              {/* Count on the Right */}
              <Text style={styles.countText}>{item.count}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
  },
  statusDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BLUE,
  },
  departmentItem: {
    backgroundColor: SKIN,
    padding: 15,
    borderRadius: 10,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  departmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // This will align the text to the left and right
  },
  departmentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  countText: {
    fontSize: 18,
    color: '#333',
  },
});
