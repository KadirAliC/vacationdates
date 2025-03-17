import { StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { Calendar } from 'react-native-calendars';
import holidays from '../holidays.json';

export default function TabOneScreen() {
  const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
  const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
  const workout = { key: 'workout', color: 'green' };

  const events = {
    // '2025-03-01': { dots: [{ key: 'massage', color: 'blue' }, { key: 'workout', color: 'green' }] },
    // '2025-03-02': { dots: [{ key: 'massage', color: 'blue' }, { key: 'workout', color: 'green' }] },
    // '2025-03-14': { dots: [{ key: 'vacation', color: 'red' }] },
    // '2025-03-15': { dots: [{ key: 'massage', color: 'blue' }] },
    // '2025-03-16': { dots: [{ key: 'workout', color: 'green' }] },
  };

  const currentYear = new Date().getFullYear();
  const holidaysFor2025 = holidays[currentYear]['turkey'];

  holidaysFor2025.forEach((holiday) => {
    if (!events[holiday.date]) {
        events[holiday.date] = { dots: [] };
    }
    events[holiday.date].dots.push({ key: 'holiday_turkey', color: 'purple' });
  });

  holidays[2025]['germany'].forEach((holiday) => {
    if (!events[holiday.date]) {
        events[holiday.date] = { dots: [] };
    }
    events[holiday.date].dots.push({ key: 'holiday_germany', color: 'purple' });
  });

  const handleDayPress = (day) => {
    const date = day.dateString;
    const turkeyHolidays = holidaysFor2025
        .filter(holiday => holiday.date === date)
        .map((holiday, index) => `${index + 1}. ${holiday.holiday}`)
        .join('\n');

    const germanyHolidays = holidays[2025]['germany']
        .filter(holiday => holiday.date === date)
        .map((holiday, index) => `${index + 1}. ${holiday.holiday}`)
        .join('\n');

    let alertMessage = '';
    if (turkeyHolidays) {
        alertMessage += `Türkiye Tatilleri:
${turkeyHolidays}\n`;
    }
    if (germanyHolidays) {
        alertMessage += `Almanya Tatilleri:
${germanyHolidays}`;
    }

    if (alertMessage) {
        alert(alertMessage);
    } else {
        alert(`No holidays on ${date}`);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const [currentDate, setCurrentDate] = useState(today);
  const [calendarKey, setCalendarKey] = useState(0);

  const goToToday = () => {
    setCurrentDate(today);
    setCalendarKey(prevKey => prevKey + 1);
  };

  return (
    <View style={styles.container}>
      <View>
        <Calendar
          key={calendarKey}
          current={currentDate}
          enableSwipeMonths={true}
          showWeekNumbers={true}
          firstDay={1}
          minDate="2025-01-01"
          maxDate="2030-12-31"
          style={{
            height: '80%',
            width: '145%',
            alignSelf: 'center',
          }}
          theme={{
            'stylesheet.calendar.header': {
              dayTextAtIndex5: {
                color: 'green',
              },
              dayTextAtIndex6: {
                color: 'green',
              },
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
            textDayHeaderFontSize: 16,
          }}
          markingType={'multi-dot'}
          markedDates={events}
          onDayPress={handleDayPress}
        />

        <TouchableOpacity onPress={goToToday} style={styles.button}>
          <Text style={styles.buttonText}>Today</Text>
        </TouchableOpacity>

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
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
