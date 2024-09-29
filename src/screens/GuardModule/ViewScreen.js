import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mark</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Remark</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between', // Align department name to left and count to right
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

  // Button Styles
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20, // Keeps the buttons at the bottom
    left: 20,
    right: 20,
  },
  button: {
    flex: 1,
    backgroundColor: BLUE, // Button background color
    padding: 8,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
