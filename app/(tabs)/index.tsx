import { StyleSheet, Alert, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useState, useMemo } from 'react';
import { Text, View } from '@/components/Themed';
import { Calendar } from 'react-native-calendars';
import holidays from '../holidays.json';

const years = Array.from({ length: 6 }, (_, i) => (2025 + i).toString());
const months = [
  { number: '01', name: '1. Ocak - Januar' },
  { number: '02', name: '2. Şubat - Februar' },
  { number: '03', name: '3. Mart - März' },
  { number: '04', name: '4. Nisan - April' },
  { number: '05', name: '5. Mayıs - Mai' },
  { number: '06', name: '6. Haziran - Juni' },
  { number: '07', name: '7. Temmuz - Juli' },
  { number: '08', name: '8. Ağustos - August' },
  { number: '09', name: '9. Eylül - September' },
  { number: '10', name: '10. Ekim - Oktober' },
  { number: '11', name: '11. Kasım - November' },
  { number: '12', name: '12. Aralık - Dezember' },
];

export default function TabOneScreen() {
  const [selectedYear, setSelectedYear] = useState('2025');
  const events = {};
  const holidaysMap = useMemo(() => {
    const result = {};
    Object.keys(holidays).forEach((year) => {
      result[year] = {
        turkey: holidays[year]['turkey'].reduce((acc, holiday) => {
          acc[holiday.date] = holiday.holiday;
          return acc;
        }, {}),
        germany: holidays[year]['germany'].reduce((acc, holiday) => {
          acc[holiday.date] = holiday.holiday;
          return acc;
        }, {}),
      };
    });
    return result;
  }, []);

  Object.keys(holidays).forEach(year => {
    const turkeyHolidays = holidays[year]['turkey'];
    turkeyHolidays.forEach((holiday) => {
      if (!events[holiday.date]) {
        events[holiday.date] = { dots: [] };
      }
      events[holiday.date].dots.push({ key: 'holiday_turkey', color: 'red' });
    });
    const germanyHolidays = holidays[year]['germany'];
    germanyHolidays.forEach((holiday) => {
      if (!events[holiday.date]) {
        events[holiday.date] = { dots: [] };
      }
      events[holiday.date].dots.push({ key: 'holiday_germany', color: 'black' });
    });
  });

  const today = new Date().toISOString().split('T')[0];
  const [currentDate, setCurrentDate] = useState(today);
  const [calendarKey, setCalendarKey] = useState(0);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [monthModalVisible, setMonthModalVisible] = useState(false);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    const [_, month, day] = currentDate.split('-');
    const newDate = `${year}-${month}-${day}`;
    setCurrentDate(newDate);
    setCalendarKey(prevKey => prevKey + 1);
    setYearModalVisible(false);
  };

  const handleMonthSelect = (month) => {
    const [year, _, day] = currentDate.split('-');
    const newDate = `${year}-${month.number}-${day}`;
    setCurrentDate(newDate);
    setCalendarKey(prevKey => prevKey + 1);
    setMonthModalVisible(false);
  };

  const goToToday = () => {
    setCurrentDate(today);
    setCalendarKey(prevKey => prevKey + 1);
  };

  const handleDayPress = (day) => {
    const date = day.dateString;
    const year = date.split('-')[0];
    const turkeyHolidays = holidaysMap[year]?.turkey[date] || [];
    const germanyHolidays = holidaysMap[year]?.germany[date] || [];

    let alertMessage = '';
    if (turkeyHolidays.length > 0) {
      alertMessage += `Türkiye Tatilleri:\n${turkeyHolidays}\n`;
    }
    if (germanyHolidays.length > 0) {
      alertMessage += `Almanya Tatilleri:\n${germanyHolidays}`;
    }

    if (alertMessage) {
      Alert.alert(`Holidays on ${date}`, alertMessage);
    } else {
      Alert.alert(`Holidays on ${date}`, `No holidays`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setYearModalVisible(true)} style={[styles.button, { flex: 1, marginRight: 10, backgroundColor: '#1199a6' }]}>
          <Text style={styles.buttonText}>Year Selection</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMonthModalVisible(true)} style={[styles.button, { flex: 1, marginLeft: 10, backgroundColor: '#1199a6' }]}>
          <Text style={styles.buttonText}>Month Selection</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent={true} visible={yearModalVisible} animationType="slide" onRequestClose={() => setYearModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={years}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleYearSelect(item)} style={styles.modalItem}>
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity onPress={() => setYearModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.buttonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={monthModalVisible} animationType="slide" onRequestClose={() => setMonthModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={months}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleMonthSelect(item)} style={styles.modalItem}>
                  <Text style={styles.modalText}>{item.name}</Text>  {/* Ay ismini burada gösteriyoruz */}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.number}
            />
            <TouchableOpacity onPress={() => setMonthModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.buttonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View>
        <View style={{ height: '80%', width: '100%', alignSelf: 'center' }}>
          <Calendar
            key={calendarKey}
            current={currentDate}
            enableSwipeMonths={true}
            showWeekNumbers={true}
            firstDay={1}
            minDate="2025-01-01"
            maxDate="2030-12-31"
            style={{ height: '88%', width: '140%', alignSelf: 'center' }}
            theme={{
              'stylesheet.calendar.header': {
                dayTextAtIndex5: {
                  color: 'green',
                  fontWeight: 'bold'
                },
                dayTextAtIndex6: {
                  color: 'green',
                  fontWeight: 'bold'
                }
              },
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
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
              textDayFontSize: 25,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 15
            }}
            markingType={'multi-dot'}
            markedDates={events}
            onDayPress={handleDayPress}
          />

          <Text style={{ alignSelf: 'center', marginBottom: 30, fontSize: 18, fontWeight: 'bold' }}>⬅️ Swipe to Change Months ➡️</Text>
        </View>

        <View style={{ alignSelf: 'center', width: '40%' }}>
          <TouchableOpacity onPress={goToToday} style={[styles.button, { backgroundColor: 'green', borderColor: 'white', borderWidth: 1 }]}>
            <Text style={styles.buttonText}>  Go to Today  </Text>
          </TouchableOpacity>
        </View>

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
  button: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#f44336',
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});