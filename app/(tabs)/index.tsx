import '../../assets/i18n';
import { StyleSheet, Alert, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useState, useMemo } from 'react';
import { Text, View } from '@/components/Themed';
import { Calendar } from 'react-native-calendars';
import holidays from '../holidays.json';
import { useTranslation } from 'react-i18next';



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
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState('2025');
  const holidaysMap = useMemo(() => {
    const result = {};
    Object.keys(holidays).forEach((year) => {
      result[year] = {
        turkey: {
          national: holidays[year]['turkey']?.national?.reduce((acc, holiday) => {
            acc[holiday.date] = holiday.holiday;
            return acc;
          }, {}),
          school: holidays[year]['turkey']?.school?.reduce((acc, holiday) => {
            acc[holiday.date] = holiday.holiday;
            return acc;
          }, {})
        },
        germany: {
          national: holidays[year]['germany']?.national?.reduce((acc, holiday) => {
            acc[holiday.date] = holiday.holiday;
            return acc;
          }, {})
        },
        austria: {
          national: holidays[year]['austria']?.national?.reduce((acc, holiday) => {
            acc[holiday.date] = holiday.holiday;
            return acc;
          }, {})
        },
        switzerland: {
          national: holidays[year]['switzerland']?.national?.reduce((acc, holiday) => {
            acc[holiday.date] = holiday.holiday;
            return acc;
          }, {}),
          school: holidays[year]['switzerland']?.school?.reduce((acc, holiday) => {
            acc[holiday.date] = holiday.holiday;
            return acc;
          }, {})
        }
      };
    });
    return result;
  }, []);

  const events = useMemo(() => {
    const result = {};
    Object.keys(holidays).forEach(year => {
      // Turkey - National
      (holidays[year]?.turkey?.national || []).forEach(holiday => {
        result[holiday.date] = result[holiday.date] || { dots: [] };
        result[holiday.date].dots.push({ key: 'holiday_turkey', color: 'red' });
      });

      // Germany - National
      (holidays[year]?.germany?.national || []).forEach(holiday => {
        result[holiday.date] = result[holiday.date] || { dots: [] };
        result[holiday.date].dots.push({ key: 'holiday_germany', color: 'black' });
      });

      // Austria - National
      (holidays[year]?.austria?.national || []).forEach(holiday => {
        result[holiday.date] = result[holiday.date] || { dots: [] };
        result[holiday.date].dots.push({ key: 'holiday_austria', color: 'blue' });
      });

      // Switzerland - National
      (holidays[year]?.switzerland?.national || []).forEach(holiday => {
        result[holiday.date] = result[holiday.date] || { dots: [] };
        result[holiday.date].dots.push({ key: 'holiday_switzerland', color: 'green' });
      });
    });
    return result;
  }, []);

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

    let alertMessage = '';

    // Her ülkeyi kontrol et
    const countries = ['turkey', 'germany', 'austria', 'switzerland'];
    const holidayTypes = ['national', 'school'];

    countries.forEach(country => {
      holidayTypes.forEach(type => {
        // Her ülkenin her tatil türünü kontrol et
        const holiday = holidays[year]?.[country]?.[type]?.find(h => h.date === date);
        if (holiday) {
          if (!alertMessage.includes(country.toUpperCase())) {
            alertMessage += `\n${country.toUpperCase()} Holidays:\n`;
          }
          alertMessage += `- ${holiday.holiday} (${type === 'national' ? 'National' : 'School'})\n`;
        }
      });
    });

    if (alertMessage) {
      Alert.alert(`Holidays on ${date}`, alertMessage.trim());
    } else {
      Alert.alert(`Holidays on ${date}`, `No holidays`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginRight: 30, marginLeft: 30, backgroundColor: '#bfbfbf' }}>
        <TouchableOpacity onPress={() => setYearModalVisible(true)} style={[styles.button, { flex: 1, marginRight: 10, backgroundColor: '#1E90FF' }]}>
          <Text style={styles.buttonText}>{t('yearSelectionButton')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMonthModalVisible(true)} style={[styles.button, { flex: 1, marginLeft: 10, backgroundColor: '#1E90FF' }]}>
          <Text style={styles.buttonText}>{t('monthSelectionButton')}</Text>
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

      <View style={{ backgroundColor: '#bfbfbf' }}>
        <View style={{ height: '80%', width: '100%', alignSelf: 'center', backgroundColor: '#bfbfbf' }}>
          <Calendar
            key={calendarKey}
            current={currentDate}
            enableSwipeMonths={true}
            firstDay={1}
            minDate="2025-01-01"
            maxDate="2030-12-31"
            style={{ height: '90%', width: '140%', alignSelf: 'center' }}
            theme={{
              'stylesheet.day.basic': {
                today: {
                  backgroundColor: '#00adf5',
                  borderRadius: 20, // Daha yuvarlak bir görünüm sağlar
                  height: 35, // Çemberin boyutunu arttırır
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                },
                todayText: {
                  color: '#ffffff', // Bugünün yazısını beyaz yap
                  fontWeight: 'bold',
                  fontSize: 18, // Daha belirgin hale getirmek için
                }
              },
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
              todayTextColor: '#ffffff',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'orange',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: 'blue',
              indicatorColor: 'blue',
              textDayFontSize: 18,
              textMonthFontSize: 16,
              textMonthFontWeight: 'bold',
              textDayHeaderFontSize: 15,
              textDayHeaderFontWeight: 'bold',
            }}
            markingType={'multi-dot'}
            markedDates={{
              ...events,
              [today]: { selected: true, selectedColor: 'blue' } // Bugünü yuvarlak içine alma
            }}
            onDayPress={handleDayPress}
            borderRadius={10}
          />

          <Text style={{ alignSelf: 'center', marginBottom: 30, fontSize: 18, fontWeight: 'bold', color: 'black' }}>⬅️ {t('swipeToChangeMonthsText')} ➡️</Text>
        </View>

        <View style={{ alignSelf: 'center', width: '40%', backgroundColor: '#bfbfbf' }}>
          <TouchableOpacity onPress={goToToday} style={[styles.button, { backgroundColor: 'green', borderColor: 'white', borderWidth: 1 }]}>
            <Text style={styles.buttonText}>  {t('goToTodayButton')}  </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bfbfbf'
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 35,
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
    backgroundColor: '#bfbfbf'
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