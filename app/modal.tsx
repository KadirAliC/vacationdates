import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

// Application Usage Overview
const usageDescription = `
This application allows users to manage and view holidays in Turkey and Germany. 

1. Year and Month Selection: On the first tab, users can select a year or month to view holidays on a calendar. 
   - Tap on the 'Year Selection' button to choose a year.
   - Tap on the 'Month Selection' button to choose a month.
   - Holidays will be marked on the calendar. Red color for Turkey and black color for Germany.

2. Holiday List: On the second tab, users can view a list of holidays for the selected year.
   - Tap on the button to choose a year to filter the holiday list.
   - Holidays are displayed with different colors for Turkey and Germany.
`;

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        name="Modal"
        options={{ title: 'Information' }}
      />
      <Text style={styles.title}>Application Usage</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.description}>{usageDescription}</Text>
      {/* <EditScreenInfo path="app/modal.tsx" /> */}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8', // Soft background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark text for good contrast
    marginBottom: 15,
    letterSpacing: 1,  // Adds space between letters for a modern look
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#DDDDDD',  // Lighter color for separator
  },
  description: {
    fontSize: 16,
    lineHeight: 24,  // More line spacing for readability
    textAlign: 'left', // Align text to the left for a cleaner look
    marginTop: 20,
    color: '#666', // Softer text color for better readability
    fontFamily: 'Roboto', // Modern, readable font
  },

});
