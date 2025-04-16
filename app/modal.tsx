import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useTranslation } from 'react-i18next';

export const screenOptions = {
  title: 'aaaaaaa',
};

export const options = {
  title: 'wwwwwwww',
};


const usageDescription = `
This application allows users to view holidays in Germany, Austria, and Switzerland (all states). 

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

3. Holiday List: On the second tab, users can view a list of holidays for the selected year.
   - Tap on the button to choose a year to filter the holiday list.
   - Holidays are displayed with different colors for Turkey and Germany.
`;

export default function ModalScreen() {
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen options={{ title: t('helpText') }} />
      <View style={styles.container}>
        <Text style={styles.title}>{t('textApplicationUsage')}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <ScrollView>
          <Text style={styles.description}>{t('usageDescription')}</Text>
        </ScrollView>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    letterSpacing: 1,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
    backgroundColor: '#DDDDDD',
    alignSelf: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'left',
    color: '#666',
    fontFamily: 'Roboto',
    marginTop: 0,
  },

});
