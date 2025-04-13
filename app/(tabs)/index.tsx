import '../../assets/i18n';
import { StyleSheet, Alert, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useState, useMemo, useContext, useEffect } from 'react';
import { Text, View } from '@/components/Themed';
import { CalendarList, Agenda } from 'react-native-calendars';
import holidays from '../holidays.json';
import { useTranslation } from 'react-i18next';
import { CountryContext, AppearanceContext } from './_layout';

export default function TabOneScreen() {
  const selectedCountry = useContext(CountryContext);
  const appearance = useContext(AppearanceContext);
  const { t } = useTranslation();
  const months = [
    { number: '01', name: `1. ${t('january')}` },
    { number: '02', name: `2. ${t('february')}` },
    { number: '03', name: `3. ${t('march')}` },
    { number: '04', name: `4. ${t('april')}` },
    { number: '05', name: `5. ${t('may')}` },
    { number: '06', name: `6. ${t('june')}` },
    { number: '07', name: `7. ${t('july')}` },
    { number: '08', name: `8. ${t('august')}` },
    { number: '09', name: `9. ${t('september')}` },
    { number: '10', name: `10. ${t('october')}` },
    { number: '11', name: `11. ${t('november')}` },
    { number: '12', name: `12. ${t('december')}` },
  ];
  const years = Array.from({ length: 6 }, (_, i) => (2025 + i).toString());
  // const selectedCountry = useContext(CountryContext);
  const [selectedYear, setSelectedYear] = useState('2025');
  const holidaysMap = useMemo(() => {
    const result = {};
    Object.keys(holidays).forEach((year) => {
      result[year] = {};
      Object.keys(holidays[year]).forEach((country) => {
        result[year][country] = {
          National: holidays[year][country]?.National?.reduce((acc, holiday) => {
            acc[holiday.date] = holiday.holiday;
            return acc;
          }, {}),
          School: {},
          Religious: {}
        };

        // Handle state-based holidays for Germany
        if (country === 'Germany') {
          if (holidays[year][country]?.School) {
            Object.keys(holidays[year][country].School).forEach(state => {
              (holidays[year][country].School[state] || []).forEach(holiday => {
                result[year][country].School[holiday.date] = holiday.holiday;
              });
            });
          }
          if (holidays[year][country]?.Religious) {
            Object.keys(holidays[year][country].Religious).forEach(state => {
              (holidays[year][country].Religious[state] || []).forEach(holiday => {
                result[year][country].Religious[holiday.date] = holiday.holiday;
              });
            });
          }
        }
      });
    });
    return result;
  }, [holidays]);

  const events = useMemo(() => {
    const result = {};
    if (selectedCountry) {
      Object.keys(holidays).forEach(year => {
        // National holidays
        const nationalHolidays = holidays[year]?.[selectedCountry]?.National;
        if (Array.isArray(nationalHolidays)) {
          nationalHolidays.forEach(holiday => {
            result[holiday.date] = result[holiday.date] || { dots: [] };
            result[holiday.date].dots.push({ key: `holiday_${selectedCountry}_National`, color: 'red', holiday: holiday.holiday });
          });
        }

        // School holidays
        const schoolHolidays = holidays[year]?.[selectedCountry]?.School;
        if (schoolHolidays) {
          if (Array.isArray(schoolHolidays)) {
            schoolHolidays.forEach(holiday => {
              result[holiday.date] = result[holiday.date] || { dots: [] };
              result[holiday.date].dots.push({ key: `holiday_${selectedCountry}_School`, color: 'green', holiday: holiday.holiday });
            });
          } else if (typeof schoolHolidays === 'object') {
            // For state-based holidays
            Object.keys(schoolHolidays).forEach(state => {
              (schoolHolidays[state] || []).forEach(holiday => {
                result[holiday.date] = result[holiday.date] || { dots: [] };
                result[holiday.date].dots.push({
                  key: `holiday_${selectedCountry}_School_${state}`,
                  color: 'green',
                  holiday: holiday.holiday
                });
              });
            });
          }
        }

        // Religious holidays
        const religiousHolidays = holidays[year]?.[selectedCountry]?.Religious;
        if (religiousHolidays) {
          if (Array.isArray(religiousHolidays)) {
            religiousHolidays.forEach(holiday => {
              result[holiday.date] = result[holiday.date] || { dots: [] };
              result[holiday.date].dots.push({ key: `holiday_${selectedCountry}_Religious`, color: 'blue', holiday: holiday.holiday });
            });
          } else if (typeof religiousHolidays === 'object') {
            // For state-based holidays
            Object.keys(religiousHolidays).forEach(state => {
              (religiousHolidays[state] || []).forEach(holiday => {
                result[holiday.date] = result[holiday.date] || { dots: [] };
                result[holiday.date].dots.push({
                  key: `holiday_${selectedCountry}_Religious_${state}`,
                  color: 'blue',
                  holiday: holiday.holiday
                });
              });
            });
          }
        }
      });
    }
    return result;
  }, [selectedCountry, holidays]);



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
    console.log(CountryContext);
    setCurrentDate(today);
    setCalendarKey(prevKey => prevKey + 1);
  };

  const handleDayPress = (day: { dateString: string }) => {
    const date = day.dateString;
    const year = date.split('-')[0];

    let alertMessage = '';

    // Seçilen ülkenin her tatil türünü kontrol et
    const holidayTypes = ['National', 'School', 'Religious'];

    holidayTypes.forEach(type => {
      // Seçilen ülkenin her tatil türünü kontrol et
      const holidayList = holidays[year]?.[selectedCountry]?.[type];
      if (holidayList) {
        if (Array.isArray(holidayList)) {
          const holiday = holidayList.find(h => h.date === date);
          if (holiday) {
            alertMessage += `- ${holiday.holiday} - ${type} Holiday \n`;
          }
        } else if (typeof holidayList === 'object') {
          // For Germany's state-based holidays
          Object.keys(holidayList).forEach(state => {
            const holiday = (holidayList[state] || []).find(h => h.date === date);
            if (holiday) {
              alertMessage += `- ${holiday.holiday} - ${state} - ${type} Holiday \n`;
            }
          });
        }
      }
    });

    if (alertMessage) {
      Alert.alert(`${selectedCountry} Holidays on ${date}`, alertMessage.trim());
    } else {
      Alert.alert(`No holidays found`, `No holidays found on ${date}`);
    }
  };



  // Agenda Items Formatting
  const agendaItems = Object.keys(events).map(date => ({
    title: date,
    data: [
      ...Object.keys(events[date].dots).map(key => ({
        name: `Holiday - ${events[date].dots[key].key}`,
        type: key.includes('National') ? 'National' : 'School',
      }))
    ]
  }));

  useEffect(() => {
    // console.log(agendaItems);  // Burada veri yapısını kontrol et
  }, [agendaItems]);

  const a = 1;

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
          {appearance === 'one' && <View style={{ height: '80%', width: '100%', alignSelf: 'center', backgroundColor: '#D8E8E8', right: t('languageModalFrench') === 'Französisch' ? '-40' : '0' }}>

            {/* <Agenda
            key={calendarKey}
              pastScrollRange={3}
              futureScrollRange={59}


              sections={agendaItems}
              renderSectionHeader={(section) => (
                <View style={styles.header}>
                  <Text style={styles.headerText}>{section.title}</Text>
                </View>
              )}
              renderItem={(item) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}> {item.name}</Text>
                  <Text style={styles.typeText}>{item.type === 'national' ? 'Resmi Tatil' : 'Okul Tatili'}</Text>
                </View>
              )}
            /> */}

            <CalendarList
              key={calendarKey}
              horizontal={true}
              pagingEnabled={false}
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
          </View>}

          {appearance === 'three' && <View style={{ top: -4, height: '80%', width: '250', alignSelf: 'center', backgroundColor: '#D8E8E8', right: t('languageModalFrench') === 'Französisch' ? '-10' : '0' }}>
            <CalendarList
              key={calendarKey}
              horizontal={true}
              pagingEnabled={false}
              scrollEnabled={false}
              firstDay={1}

              calendarHeight={100}
              calendarWidth={250}

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
                textMonthFontSize: 13,
                textDayFontSize: 14,
                weekVerticalMargin: -6
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

            <CalendarList
              key={calendarKey}
              horizontal={true}
              pagingEnabled={false}
              scrollEnabled={false}
              firstDay={1}

              calendarHeight={100}
              calendarWidth={250}

              // Gösterilecek ay sayısı (örneğin: 12 ay = 1 yıl)
              pastScrollRange={3}
              futureScrollRange={59}

              // İlk gösterilecek ay
              current={'2025-05-12'}

              // Ay başlıklarını göster
              showScrollIndicator={true}

              // Stil özelleştirme
              theme={{
                calendarBackground: '#D8E8E8',
                monthTextColor: '#000',
                arrowColor: '#000',
                textMonthFontWeight: 'bold',
                textMonthFontSize: 13,
                textDayFontSize: 14,
                weekVerticalMargin: -6
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

            <CalendarList
              key={calendarKey}
              horizontal={true}
              pagingEnabled={false}
              scrollEnabled={false}
              firstDay={1}

              calendarHeight={100}
              calendarWidth={250}

              // Gösterilecek ay sayısı (örneğin: 12 ay = 1 yıl)
              pastScrollRange={3}
              futureScrollRange={59}

              // İlk gösterilecek ay
              current={'2025-06-12'}

              // Ay başlıklarını göster
              showScrollIndicator={true}

              // Stil özelleştirme
              theme={{
                calendarBackground: '#D8E8E8',
                monthTextColor: '#000',
                arrowColor: '#000',
                textMonthFontWeight: 'bold',
                textMonthFontSize: 13,
                textDayFontSize: 14,
                weekVerticalMargin: -5
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
          </View>}

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