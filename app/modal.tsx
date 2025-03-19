import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

const usageDescription = `
This application allows users to view holidays in Turkey and Germany (all states). 

1. Year and Month Selection: On the first tab, users can select a year or month to view holidays on a calendar. 
   - Tap on a specific date on the calendar to view holidays on that day.
   - Swipe left or right on the calendar or use the arrow buttons to navigate between months.
   - Tap on the "Year Selection" button to choose a year.
   - Tap on the "Month Selection" button to choose a month.
   - Tap the "Go to Today" button to jump to the current date on the calendar.
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
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    letterSpacing: 1,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
    backgroundColor: '#DDDDDD',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
    color: '#666',
    fontFamily: 'Roboto',
  },

});
