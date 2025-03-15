import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import { Calendar } from 'react-native-calendars';

export default function TabOneScreen() {
  const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
  const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
  const workout = { key: 'workout', color: 'green' };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Calendar</Text> */}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}

      <View>
        <Text>Calendar screen</Text>
      </View>

      <View>
        <Calendar
          minDate="2025-01-01"
          maxDate="2030-12-31"
          style={{
            height: '100%',
            width: '170%',
            alignSelf: 'center'

          }}
          theme={{
            'stylesheet.calendar.header': {
              dayTextAtIndex5: {
                color: 'green'
              },
              dayTextAtIndex6: {
                color: 'green'
              }
            },
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }
          }
          markingType={'multi-dot'}
          markedDates={{
            '2025-03-14': { selected: true, marked: true, selectedColor: 'blue' },
            '2025-03-15': { marked: true },
            '2025-03-16': { marked: true, dotColor: 'red', activeOpacity: 0 },
            '2025-03-17': { disabled: true, disableTouchEvent: true },

            '2025-03-01': { dots: [vacation, massage, workout] },
            '2025-03-02': { dots: [massage, workout], disabled: true }
          }}
        // onDayPress={(day) => console.log('day', day)}
        // onDayLongPress={(day) => console.log('day', day)}
        // onMonthChange={(month) => console.log('month', month)}
        // onYearChange={(year) => console.log('year', year)}
        // onDayLongPress={(day) => console.log('day', day)}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
