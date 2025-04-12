import '../../assets/i18n';
import { StyleSheet, Alert, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useState, useMemo, useContext } from 'react';
import { Text, View } from '@/components/Themed';
import { Calendar, CalendarList, ExpandableCalendar } from 'react-native-calendars';
import holidays from '../holidays.json';
import { useTranslation } from 'react-i18next';
import { CountryContext } from './_layout';

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
  const selectedCountry = useContext(CountryContext);
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
      
      <View style={styles.calendarContainer}>
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
                <Text style={styles.buttonText}>{t('languageModalClose')}</Text>
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
                <Text style={styles.buttonText}>{t('languageModalClose')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={{ backgroundColor: '#D8E8E8' }}>
          <View style={{ height: '80%', width: '96%', alignSelf: 'center', backgroundColor: '#D8E8E8' }}>

            <CalendarList
              key={calendarKey}
              horizontal={true}
              pagingEnabled={true}
              scrollEnabled={true}
              firstDay={1}

              // Gösterilecek ay sayısı (örneğin: 12 ay = 1 yıl)
              pastScrollRange={3}
              futureScrollRange={59}

              // İlk gösterilecek ay
              current={currentDate}

              // Ay başlıklarını göster
              showScrollIndicator={true}

              // Stil özelleştirme
              theme={{
                calendarBackground: '#D8E8E8',
                monthTextColor: '#000',
                arrowColor: '#000',
                textMonthFontWeight: 'bold',
                textMonthFontSize: 20,
                textDayFontSize: 20,
                weekVerticalMargin: 28
              }}
              markingType={'multi-dot'}
              markedDates={{
                ...events,
                [today]: { selected: true, selectedColor: '#fe7210' } // Bugünü yuvarlak içine alma
              }}
              onDayPress={handleDayPress}
              // borderRadius={10}
              showScrollIndicator={false}
            />

          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18, backgroundColor: 'black', paddingLeft: 120, paddingRight: 120, bottom: -88, paddingBottom: 30, paddingTop: '10' }}>
            <Text onPress={() => setYearModalVisible(true)} style={{ color: '#fe7210', fontSize: 16, fontWeight: 'bold', left: t('languageModalFrench') === 'Französisch' ? '-70' : '-90' }}>{t('yearSelectionButton')}</Text>

            <TouchableOpacity onPress={goToToday}>
              <Text style={{ color: '#fe7210', fontSize: 22, fontWeight: 'bold' }}>  {t('goToTodayButton')}  </Text>
            </TouchableOpacity>

            <Text onPress={() => setMonthModalVisible(true)} style={{ color: '#fe7210', fontSize: 16, fontWeight: 'bold', alignSelf: 'right', right: t('languageModalFrench') === 'Französisch' ? '-70' : '-90' }}>{t('monthSelectionButton')}</Text>
          </View>

          <View style={{ position: 'absolute', bottom: -70, left: -80, right: -80, backgroundColor: 'black', paddingBottom: 30 }}>
            {/* <Text style={{ alignSelf: 'center', fontSize: 12, fontWeight: '300', color: 'white' }}>{selectedCountry}</Text> */}
            <Text style={{ alignSelf: 'center', fontSize: 12, fontWeight: '300', color: 'white' }}>{'<< ' + t('swipeToChangeMonthsText') + ' >>'}</Text>
          </View>

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
    backgroundColor: '#D8E8E8'
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
  countryDisplay: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8E8E8',
  },
  countryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarContainer: {
    flex: 1,
    backgroundColor: '#D8E8E8',
  },
});