import '../../assets/i18n';
import { Text, View, StyleSheet, Alert, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useState, useMemo, useContext, useEffect } from 'react';
import { CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import holidays from '../holidays.json';
import { useTranslation } from 'react-i18next';
import { CountryContext, AppearanceContext } from './_layout';
import { MultiSelect } from 'react-native-element-dropdown';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TabOneScreen() {
  const selectedCountry = useContext(CountryContext);
  const { appearance, setAppearance } = useContext(AppearanceContext);
  const { t } = useTranslation();
  LocaleConfig.locales['de'] = {
    monthNames: [
      t('languageModalEnglish') === 'English' ? 'January' : (t('languageModalGerman') === 'Deutsch' ? 'Januar' : 'janvier'),
      t('languageModalEnglish') === 'English' ? 'February' : (t('languageModalGerman') === 'Deutsch' ? 'Februar' : 'février'),
      t('languageModalEnglish') === 'English' ? 'March' : (t('languageModalGerman') === 'Deutsch' ? 'März' : 'mars'),
      t('languageModalEnglish') === 'English' ? 'April' : (t('languageModalGerman') === 'Deutsch' ? 'April' : 'avril'),
      t('languageModalEnglish') === 'English' ? 'May' : (t('languageModalGerman') === 'Deutsch' ? 'Mai' : 'mai'),
      t('languageModalEnglish') === 'English' ? 'June' : (t('languageModalGerman') === 'Deutsch' ? 'Juni' : 'juin'),
      t('languageModalEnglish') === 'English' ? 'July' : (t('languageModalGerman') === 'Deutsch' ? 'Juli' : 'juillet'),
      t('languageModalEnglish') === 'English' ? 'August' : (t('languageModalGerman') === 'Deutsch' ? 'August' : 'août'),
      t('languageModalEnglish') === 'English' ? 'September' : (t('languageModalGerman') === 'Deutsch' ? 'September' : 'septembre'),
      t('languageModalEnglish') === 'English' ? 'October' : (t('languageModalGerman') === 'Deutsch' ? 'Oktober' : 'octobre'),
      t('languageModalEnglish') === 'English' ? 'November' : (t('languageModalGerman') === 'Deutsch' ? 'November' : 'novembre'),
      t('languageModalEnglish') === 'English' ? 'December' : (t('languageModalGerman') === 'Deutsch' ? 'Dezember' : 'décembre')
    ],
    monthNamesShort: [
      t('languageModalEnglish') === 'English' ? 'Jan.' : (t('languageModalGerman') === 'Deutsch' ? 'Jan.' : 'janv.'),
      t('languageModalEnglish') === 'English' ? 'Feb.' : (t('languageModalGerman') === 'Deutsch' ? 'Feb.' : 'févr.'),
      t('languageModalEnglish') === 'English' ? 'Mär.' : (t('languageModalGerman') === 'Deutsch' ? 'Mär.' : 'mars'),
      t('languageModalEnglish') === 'English' ? 'Apr.' : (t('languageModalGerman') === 'Deutsch' ? 'Apr.' : 'avril'),
      t('languageModalEnglish') === 'English' ? 'May' : (t('languageModalGerman') === 'Deutsch' ? 'Mai' : 'mai'),
      t('languageModalEnglish') === 'English' ? 'Jun.' : (t('languageModalGerman') === 'Deutsch' ? 'Jun.' : 'juin'),
      t('languageModalEnglish') === 'English' ? 'Jul.' : (t('languageModalGerman') === 'Deutsch' ? 'Jul.' : 'juillet'),
      t('languageModalEnglish') === 'English' ? 'Aug.' : (t('languageModalGerman') === 'Deutsch' ? 'Aug.' : 'août'),
      t('languageModalEnglish') === 'English' ? 'Sep.' : (t('languageModalGerman') === 'Deutsch' ? 'Sep.' : 'septembre'),
      t('languageModalEnglish') === 'English' ? 'Oct.' : (t('languageModalGerman') === 'Deutsch' ? 'Oct.' : 'octobre'),
      t('languageModalEnglish') === 'English' ? 'Nov.' : (t('languageModalGerman') === 'Deutsch' ? 'Nov.' : 'novembre'),
      t('languageModalEnglish') === 'English' ? 'Dec.' : (t('languageModalGerman') === 'Deutsch' ? 'Dec.' : 'décembre')
    ],
    dayNames: [
      t('languageModalEnglish') === 'English' ? 'Sunday' : (t('languageModalGerman') === 'Deutsch' ? 'Sonntag' : 'dimanche'),
      t('languageModalEnglish') === 'English' ? 'Monday' : (t('languageModalGerman') === 'Deutsch' ? 'Montag' : 'lundi'),
      t('languageModalEnglish') === 'English' ? 'Tuesday' : (t('languageModalGerman') === 'Deutsch' ? 'Dienstag' : 'mardi'),
      t('languageModalEnglish') === 'English' ? 'Wednesday' : (t('languageModalGerman') === 'Deutsch' ? 'Mittwoch' : 'mercredi'),
      t('languageModalEnglish') === 'English' ? 'Thursday' : (t('languageModalGerman') === 'Deutsch' ? 'Donnerstag' : 'jeudi'),
      t('languageModalEnglish') === 'English' ? 'Friday' : (t('languageModalGerman') === 'Deutsch' ? 'Freitag' : 'vendredi'),
      t('languageModalEnglish') === 'English' ? 'Saturday' : (t('languageModalGerman') === 'Deutsch' ? 'Samstag' : 'samedi')
    ],
    dayNamesShort: [
      t('languageModalEnglish') === 'English' ? 'Sun' : (t('languageModalGerman') === 'Deutsch' ? 'So.' : 'dim.'),
      t('languageModalEnglish') === 'English' ? 'Mon' : (t('languageModalGerman') === 'Deutsch' ? 'Mo.' : 'lun.'),
      t('languageModalEnglish') === 'English' ? 'Tue' : (t('languageModalGerman') === 'Deutsch' ? 'Di.' : 'mar.'),
      t('languageModalEnglish') === 'English' ? 'Wed' : (t('languageModalGerman') === 'Deutsch' ? 'Mi.' : 'mer.'),
      t('languageModalEnglish') === 'English' ? 'Thu' : (t('languageModalGerman') === 'Deutsch' ? 'Do.' : 'jeu.'),
      t('languageModalEnglish') === 'English' ? 'Fri' : (t('languageModalGerman') === 'Deutsch' ? 'Fr.' : 'ven.'),
      t('languageModalEnglish') === 'English' ? 'Sat' : (t('languageModalGerman') === 'Deutsch' ? 'Sa.' : 'sam.')
    ],
  };
  
  LocaleConfig.defaultLocale = 'de';
  
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
        const nationalHolidays = holidays[year]?.[selectedCountry]?.National;
        if (Array.isArray(nationalHolidays)) {
          nationalHolidays.forEach(holiday => {
            result[holiday.date] = result[holiday.date] || { dots: [] };
            if (!result[holiday.date].dots.some(dot => dot.key === `holiday_${selectedCountry}_National`)) {
              result[holiday.date].dots.push({
                key: `holiday_${selectedCountry}_National`,
                color: 'red',
                holiday: holiday.holiday
              });
            }
          });
        }

        const schoolHolidays = holidays[year]?.[selectedCountry]?.School;
        if (schoolHolidays) {
          if (Array.isArray(schoolHolidays)) {
            schoolHolidays.forEach(holiday => {
              result[holiday.date] = result[holiday.date] || { dots: [] };
              if (!result[holiday.date].dots.some(dot => dot.key === `holiday_${selectedCountry}_School`)) {
                result[holiday.date].dots.push({
                  key: `holiday_${selectedCountry}_School`,
                  color: 'green',
                  holiday: holiday.holiday
                });
              }
            });
          } else if (typeof schoolHolidays === 'object') {
            Object.keys(schoolHolidays).forEach(state => {
              (schoolHolidays[state] || []).forEach(holiday => {
                result[holiday.date] = result[holiday.date] || { dots: [] };
                if (!result[holiday.date].dots.some(dot => dot.key === `holiday_${selectedCountry}_School`)) {
                  result[holiday.date].dots.push({
                    key: `holiday_${selectedCountry}_School`,
                    color: 'green',
                    holiday: holiday.holiday
                  });
                }
              });
            });
          }
        }

        const religiousHolidays = holidays[year]?.[selectedCountry]?.Religious;
        if (religiousHolidays) {
          if (Array.isArray(religiousHolidays)) {
            religiousHolidays.forEach(holiday => {
              result[holiday.date] = result[holiday.date] || { dots: [] };
              if (!result[holiday.date].dots.some(dot => dot.key === `holiday_${selectedCountry}_Religious`)) {
                result[holiday.date].dots.push({
                  key: `holiday_${selectedCountry}_Religious`,
                  color: 'blue',
                  holiday: holiday.holiday
                });
              }
            });
          } else if (typeof religiousHolidays === 'object') {
            Object.keys(religiousHolidays).forEach(state => {
              (religiousHolidays[state] || []).forEach(holiday => {
                result[holiday.date] = result[holiday.date] || { dots: [] };
                if (!result[holiday.date].dots.some(dot => dot.key === `holiday_${selectedCountry}_Religious`)) {
                  result[holiday.date].dots.push({
                    key: `holiday_${selectedCountry}_Religious`,
                    color: 'blue',
                    holiday: holiday.holiday
                  });
                }
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
  const currentDatePlus1 = new Date(today);
  const currentDatePlus2 = new Date(today);
  const currentDatePlus3 = new Date(today);
  const currentDatePlus4 = new Date(today);
  const currentDatePlus5 = new Date(today);
  const currentDatePlus6 = new Date(today);
  const currentDatePlus7 = new Date(today);
  const currentDatePlus8 = new Date(today);
  const currentDatePlus9 = new Date(today);
  const currentDatePlus10 = new Date(today);
  const currentDatePlus11 = new Date(today);
  currentDatePlus1.setMonth(currentDatePlus1.getMonth() + 1);
  currentDatePlus2.setMonth(currentDatePlus1.getMonth() + 1);
  currentDatePlus3.setMonth(currentDatePlus1.getMonth() + 2);
  currentDatePlus4.setMonth(currentDatePlus1.getMonth() + 3);
  currentDatePlus5.setMonth(currentDatePlus1.getMonth() + 4);
  currentDatePlus6.setMonth(currentDatePlus1.getMonth() + 5);
  currentDatePlus7.setMonth(currentDatePlus1.getMonth() + 6);
  currentDatePlus8.setMonth(currentDatePlus1.getMonth() + 7);
  currentDatePlus9.setMonth(currentDatePlus1.getMonth() + 8);
  currentDatePlus10.setMonth(currentDatePlus1.getMonth() + 9);
  currentDatePlus11.setMonth(currentDatePlus1.getMonth() + 10);
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
    setAppearance('one');
  };
  const [selected, setSelected] = useState([]);

  const [stateSelectionModal, setStateSelectionModal] = useState(false);

  const handleDayPress = (day: { dateString: string }) => {
    const date = day.dateString;
    const year = date.split('-')[0];

    let alertMessage = '';
    let hasHolidays = false;

    const holidayTypes = ['National', 'School', 'Religious'];

    holidayTypes.forEach(type => {
      const holidayList = holidays[year]?.[selectedCountry]?.[type];
      if (holidayList) {
        if (Array.isArray(holidayList)) {
          const holiday = holidayList.find(h => h.date === date);
          if (holiday) {
            hasHolidays = true;
            alertMessage += `🕊 ${holiday.holiday}\n`;
          }
        } else if (typeof holidayList === 'object') {
          if (selected.length > 0) {
            selected.forEach(state => {
              const stateHolidays = holidayList[state] || [];
              const holiday = stateHolidays.find(h => h.date === date);
              if (holiday) {
                hasHolidays = true;
                alertMessage += type === 'School' ? `📚 ${holiday.holiday} - (${state}) \n`
                  : (type === 'Religious' ? `⛪ ${holiday.holiday} - (${state}) \n`
                    : '');
              }
            });
          } else {
            Object.keys(holidayList).forEach(state => {
              const holiday = (holidayList[state] || []).find(h => h.date === date);
              if (holiday) {
                hasHolidays = true;
                alertMessage += type === 'School' ? `📚 ${holiday.holiday} - (${state}) \n`
                  : (type === 'Religious' ? `⛪ ${holiday.holiday} - (${state}) \n`
                    : '');
              }
            });
          }
        }
      }
    });

    if (hasHolidays) {
      const selectedStatesText = selected.length > 0
        ? `(${selected.join(', ')})`
        : '';
      Alert.alert(
        t('languageModalGerman') === 'Deutsch' ? `${selectedCountry} Feiertage am ${date}` : (t('languageModalEnglish') === 'English' ? `${selectedCountry} Holidays on ${date}` : `Jours fériés de ${selectedCountry} le ${date}`),
        alertMessage.trim(),
        [
          {
            text: t('languageModalGerman') === 'Deutsch' ? 'OK' : (t('languageModalEnglish') === 'English' ? 'OK' : 'D\'accord'),
            onPress: () => {},
          },
        ]
      );
    }
    else {
      Alert.alert(
        `No holidays found`,
        selected.length > 0
          ? `No holidays found on ${date} for ${selected.join(', ')}`
          : `No holidays found on ${date}`
      );
    }
  };

  const handleStateSelect = (states: string[]) => {
    setSelected(states);
  };

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
  }, [agendaItems]);

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
                    <Text style={styles.modalText}>{item.name}</Text>
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
          {appearance === 'one' && <View style={{ height: '80%', width: '100%', alignSelf: 'center', backgroundColor: '#D8E8E8', right: t('languageModalFrench') === 'Französisch' ? '-40' : (t('languageModalEnglish') === 'English' ? '0' : (t('languageModalGerman') === 'Deutsch' ? '0' : '1')) }}>

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
              pastScrollRange={3}
              futureScrollRange={68}
              current={currentDate}
              showScrollIndicator={true}
              theme={{
                calendarBackground: '#D8E8E8',
                monthTextColor: '#000',
                arrowColor: '#000',
                textMonthFontWeight: 'bold',
                textMonthFontSize: 20,
                textDayFontSize: 20,
                weekVerticalMargin: 21
              }}
              markingType={'multi-dot'}
              markedDates={{
                ...events,
                [today]: { selected: true, selectedColor: '#fe7210' }
              }}
              onDayPress={handleDayPress}
              showScrollIndicator={false}
            />

            <TouchableOpacity


              style={{
                position: 'absolute',
                bottom: -75,
                right: t('languageModalFrench') === 'Französisch' ? 85 : (t('languageModalEnglish') === 'English' ? 15 : (t('languageModalGerman') === 'Deutsch' ? '15' : '20')),
                backgroundColor: '#fe7210',
                padding: 10,
                borderRadius: '50%',
                shadowColor: '#000',
                shadowOffset: {
                  width: 10,
                  height: 2
                },
                shadowOpacity: 0.15,
                shadowRadius: 3.84,

                elevation: 5
              }}
              onPress={async () => {
                await AsyncStorage.getItem('country') !== selectedCountry ? setSelected([]) : null;
                await AsyncStorage.getItem('country') !== selectedCountry ? AsyncStorage.setItem('country', selectedCountry) : null;
                setStateSelectionModal(true)
              }}
            >
              {/* <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                {t('stateSelectionButton')}
              </Text> */}

              {selected.length > 0 &&
                <View
                  style={{
                    position: 'absolute', right: -3, top: 3, backgroundColor: 'black',
                    padding: 2, borderRadius: '50%', marginTop: -12
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 12 }}>  {selected.length}  </Text>
                </View>}

              <FontAwesome
                name="map-marker"
                size={25}
                style={{ paddingLeft: 5, paddingRight: 5 }}
              />
            </TouchableOpacity>

            <Modal transparent={true} visible={stateSelectionModal} animationType="slide" onRequestClose={() => setStateSelectionModal(false)}>
              <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { height: 700 }]}>
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{t('selectAStateText')}</Text>
                  </View>

                  <View style={{ left: 0, width: '100%', top: 20 }}>
                    <View style={{ gap: 3, flexDirection: 'row', alignItems: 'center', marginBottom: -10 }}>
                      <FontAwesome
                        name="info-circle"
                        size={14}
                      />
                      <Text style={{ fontSize: 11, fontWeight: '400' }}>{t('multiSelectInfo')}</Text>
                    </View>
                    <MultiSelect
                      style={styles.dropdown}
                      placeholderStyle={selected.length > 0 ? { fontFamily: 'bold', fontSize: 13 } : styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      search
                      data={
                        selectedCountry === "Austria" ?
                          ["Burgenland", "Kärnten", "Salzburg", "Vorarlberg",
                            "Tirol", "Steiermark", "Oberösterreich", "Niederösterreich",
                            "Wien"].map((item) => ({ label: selected.includes(item) ? item + '  ✔' : item, value: item })) :
                          selectedCountry === "Germany" ? ["Baden-Württemberg", "Bayern",
                            "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hessen",
                            "Mecklenburg-Vorpommern", "Niedersachsen", "Nordrhein-Westfalen",
                            "Rheinland-Pfalz", "Saarland", "Sachsen", "Sachsen-Anhalt",
                            "Schleswig-Holstein", "Thüringen"].map((item) =>
                              ({ label: selected.includes(item) ? item + '  ✔' : item, value: item })) :
                            selectedCountry === "Switzerland" ?
                              ["Aargau", "Appenzell Innerrhoden",
                                "Appenzell Ausserrhoden", "Bern",
                                "Basel - Landschaft", "Basel-Stadt",
                                "Fribourg", "Cenevre", "Glarus",
                                "Grisons", "Jura", "Luzern", "Neuchâtel",
                                "Nidwalden", "Obwalden", "St.Gallen",
                                "Schaffhausen", "Solothurn", "Schwyz",
                                "Thurgau", "Ticino", "Uri", "Vaud",
                                "Valais", "Zug", "Zürich"].map((item) =>
                                  ({ label: selected.includes(item) ? item + '  ✔' : item, value: item })) : []}
                      labelField="label"
                      valueField="value"
                      placeholder={selected.length > 0 ? t('textNumberOfStatesSelected') + selected.length.toString() : t('stateSelectionButton')}
                      searchPlaceholder={t('stateSelectionButton')}
                      value={selected}
                      onChange={handleStateSelect}
                      selectedStyle={styles.selectedStyle}
                    />
                  </View>

                  <TouchableOpacity onPress={() => setStateSelectionModal(false)} style={[styles.closeButton, { width: 200, position: 'absolute', bottom: 10, right: 50 }]}>
                    <Text style={styles.buttonText}>{t('languageModalClose')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>


          </View>}

          {appearance === 'three' && <View style={{ top: -4, height: '84%', width: '250', alignSelf: 'center', backgroundColor: '#D8E8E8', right: t('languageModalFrench') === 'Französisch' ? '-10' : '0' }}>
            <CalendarList
              horizontal={true}
              pagingEnabled={false}
              scrollEnabled={false}
              firstDay={1}
              calendarHeight={200}
              calendarWidth={250}
              pastScrollRange={3}
              futureScrollRange={59}
              current={currentDate}
              showScrollIndicator={true}
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
                [today]: { selected: true, selectedColor: '#fe7210' }
              }}
              onDayPress={() => setAppearance('one')}
              showScrollIndicator={false}
            />

            {/* <CalendarList
              calendarHeight={200}
              calendarWidth={250}
              current={currentDate}
              markingType={'multi-dot'}
              horizontal={true}
              pagingEnabled={false}
              scrollEnabled={false}
              firstDay={1}
              pastScrollRange={3}
              futureScrollRange={59}
              theme={{
                calendarBackground: 'yellow',
                monthTextColor: '#000',
                arrowColor: '#000',
                textMonthFontWeight: 'bold',
                textMonthFontSize: 13,
                textDayFontSize: 14,
                weekVerticalMargin: -6,
                marginBottom: 100
              }}
              markedDates={{
                ...events,
                [today]: { selected: true, selectedColor: '#fe7210' }
              }}
              onDayPress={() => setAppearance('one')}
              showScrollIndicator={false}
            />

            <Text>asasdasd</Text> */}

            <CalendarList
              horizontal={true}
              pagingEnabled={false}
              scrollEnabled={false}
              firstDay={1}
              calendarHeight={200}
              calendarWidth={250}
              pastScrollRange={3}
              futureScrollRange={59}
              current={currentDatePlus1.toISOString().split('T')[0]}
              showScrollIndicator={true}
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
                [today]: { selected: true, selectedColor: '#fe7210' }
              }}
              onDayPress={() => {
                setAppearance('one');
                setCurrentDate(currentDatePlus1.toISOString().split('T')[0]);
              }}
              showScrollIndicator={false}
            />

            <CalendarList
              horizontal={true}
              pagingEnabled={false}
              scrollEnabled={false}
              firstDay={1}
              calendarHeight={200}
              calendarWidth={250}
              pastScrollRange={3}
              futureScrollRange={59}
              current={currentDatePlus2.toISOString().split('T')[0]}
              showScrollIndicator={true}
              showScrollIndicator={true}
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
                [today]: { selected: true, selectedColor: '#fe7210' }
              }}
              onDayPress={() => {
                setAppearance('one');
                setCurrentDate(currentDatePlus2.toISOString().split('T')[0]);
              }}
              showScrollIndicator={false}
            />

          </View>}

          {appearance === 'six' && (
            <View style={{ backgroundColor: '#D8E8E8', top: -4, height: '84%', alignSelf: 'center', right: t('languageModalFrench') === 'Französisch' ? '-10' : '0' }}>
              <View style={{ backgroundColor: '#D8E8E8', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ right: t('languageModalFrench') === 'Französisch' ? '-20' : '0', width: t('languageModalFrench') === 'Französisch' ? '40%' : '49%', backgroundColor: '#D8E8E8' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={200}
                    calendarWidth={180}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDate}
                    showScrollIndicator={true}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 13,
                      textDayFontSize: 14,
                      weekVerticalMargin: -6,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{
                      ...events,
                      // [today]: { selected: true, selectedColor: '#fe7210' }
                    }}
                    onDayPress={() => {
                      setAppearance('one');
                    }}
                    showScrollIndicator={false}
                  />
                </View>
                <View style={{ width: '49%', backgroundColor: '#D8E8E8' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={200}
                    calendarWidth={180}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus1.toISOString().split('T')[0]}
                    showScrollIndicator={true}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 13,
                      textDayFontSize: 14,
                      weekVerticalMargin: -6,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{
                      ...events,
                      [today]: { selected: true, selectedColor: '#fe7210' }
                    }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus1.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>
              </View>
              <View style={{ backgroundColor: '#D8E8E8', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ right: t('languageModalFrench') === 'Französisch' ? '-20' : '0', width: t('languageModalFrench') === 'Französisch' ? '40%' : '49%', width: '48%', backgroundColor: '#D8E8E8' }}>
                  <CalendarList
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={200}
                    calendarWidth={180}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus2.toISOString().split('T')[0]}
                    showScrollIndicator={true}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 13,
                      textDayFontSize: 14,
                      weekVerticalMargin: -6,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{
                      ...events,
                      [today]: { selected: true, selectedColor: '#fe7210' }
                    }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus2.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>
                <View style={{ right: t('languageModalFrench') === 'Französisch' ? '15' : '0', width: t('languageModalFrench') === 'Französisch' ? '40%' : '49%', width: '48%', backgroundColor: '#D8E8E8' }}>
                  <CalendarList
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={200}
                    calendarWidth={180}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus3.toISOString().split('T')[0]}
                    showScrollIndicator={true}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 13,
                      textDayFontSize: 14,
                      weekVerticalMargin: -6,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{
                      ...events,
                      [today]: { selected: true, selectedColor: '#fe7210' }
                    }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus3.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>
              </View>
              <View style={{ backgroundColor: '#D8E8E8', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ right: t('languageModalFrench') === 'Französisch' ? '-20' : '0', width: t('languageModalFrench') === 'Französisch' ? '40%' : '49%', width: '48%', backgroundColor: '#D8E8E8' }}>
                  <CalendarList
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={200}
                    calendarWidth={180}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus4.toISOString().split('T')[0]}
                    showScrollIndicator={true}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 13,
                      textDayFontSize: 14,
                      weekVerticalMargin: -6,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{
                      ...events,
                      [today]: { selected: true, selectedColor: '#fe7210' }
                    }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus4.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>
                <View style={{ right: t('languageModalFrench') === 'Französisch' ? '15' : '0', width: t('languageModalFrench') === 'Französisch' ? '40%' : '49%', width: '48%', backgroundColor: '#D8E8E8' }}>
                  <CalendarList
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={200}
                    calendarWidth={180}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus5.toISOString().split('T')[0]}
                    showScrollIndicator={true}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 13,
                      textDayFontSize: 14,
                      weekVerticalMargin: -6,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{
                      ...events,
                      [today]: { selected: true, selectedColor: '#fe7210' }
                    }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus5.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>
              </View>

            </View>
          )}

          {appearance === 'oneYear' && (
            <View style={{ backgroundColor: '#D8E8E8', top: -4, height: '84%', alignSelf: 'center', right: t('languageModalFrench') === 'Französisch' ? '-10' : '0' }}>
              <View style={{ backgroundColor: '#D8E8E8', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ left: t('languageModalFrench') === 'Französisch' ? 20 : 0, width: '33%', backgroundColor: '#D8E8E8', overflow: 'hidden' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={70}
                    calendarWidth={140}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDate}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 11,
                      textDayFontSize: 8,
                      weekVerticalMargin: -8,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{ ...events }}
                    onDayPress={() => {
                      setAppearance('one');
                    }}
                    showScrollIndicator={false}
                  />
                </View>

                <View style={{ left: -5, width: '33%', backgroundColor: '#D8E8E8', overflow: 'hidden' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={70}
                    calendarWidth={140}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus1.toISOString().split('T')[0]}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 11,
                      textDayFontSize: 8,
                      weekVerticalMargin: -8,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{ ...events, [today]: { selected: true, selectedColor: '#fe7210' } }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus1.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>

                <View style={{ left: t('languageModalFrench') === 'Französisch' ? -30 : -10, width: '33%', backgroundColor: '#D8E8E8', overflow: 'hidden' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={70}
                    calendarWidth={140}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus2.toISOString().split('T')[0]}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 11,
                      textDayFontSize: 8,
                      weekVerticalMargin: -8,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{ ...events, [today]: { selected: true, selectedColor: '#fe7210' } }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus2.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>
              </View>

              <View style={{ backgroundColor: '#D8E8E8', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ left: t('languageModalFrench') === 'Französisch' ? 20 : 0, width: '33%', backgroundColor: '#D8E8E8', overflow: 'hidden' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={160}
                    calendarWidth={140}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus3.toISOString().split('T')[0]}
                    theme={{
                      calendarBackground: '#white',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 11,
                      textDayFontSize: 8,
                      weekVerticalMargin: -8,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{ ...events }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus3.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>

                <View style={{ left: -5, width: '33%', backgroundColor: '#D8E8E8', overflow: 'hidden' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={70}
                    calendarWidth={140}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus4.toISOString().split('T')[0]}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 11,
                      textDayFontSize: 8,
                      weekVerticalMargin: -8,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{ ...events, [today]: { selected: true, selectedColor: '#fe7210' } }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus4.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>

                <View style={{ left: t('languageModalFrench') === 'Französisch' ? -30 : -10, width: '33%', backgroundColor: '#D8E8E8', overflow: 'hidden' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={70}
                    calendarWidth={140}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus5.toISOString().split('T')[0]}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 9,
                      textDayFontSize: 8,
                      weekVerticalMargin: -8,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{ ...events, [today]: { selected: true, selectedColor: '#fe7210' } }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus5.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>
              </View>

              <View style={{ backgroundColor: '#D8E8E8', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ left: t('languageModalFrench') === 'Französisch' ? 20 : 0, width: '33%', backgroundColor: '#D8E8E8', overflow: 'hidden' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={160}
                    calendarWidth={140}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus6.toISOString().split('T')[0]}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 11,
                      textDayFontSize: 8,
                      weekVerticalMargin: -8,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{ ...events }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus6.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>

                <View style={{ left: -5, width: '33%', backgroundColor: '#D8E8E8', overflow: 'hidden' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={70}
                    calendarWidth={140}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus7.toISOString().split('T')[0]}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 9,
                      textDayFontSize: 8,
                      weekVerticalMargin: -8,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{ ...events, [today]: { selected: true, selectedColor: '#fe7210' } }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus7.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>

                <View style={{ left: t('languageModalFrench') === 'Französisch' ? -30 : -10, width: '33%', backgroundColor: '#D8E8E8', overflow: 'hidden' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={70}
                    calendarWidth={140}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus8.toISOString().split('T')[0]}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 9,
                      textDayFontSize: 8,
                      weekVerticalMargin: -8,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{ ...events, [today]: { selected: true, selectedColor: '#fe7210' } }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus8.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>
              </View>

              <View style={{ backgroundColor: '#D8E8E8', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ left: t('languageModalFrench') === 'Französisch' ? 20 : 0, width: '33%', backgroundColor: '#D8E8E8', overflow: 'hidden' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={70}
                    calendarWidth={140}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus9.toISOString().split('T')[0]}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 11,
                      textDayFontSize: 8,
                      weekVerticalMargin: -8,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{ ...events }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus9.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>

                <View style={{ left: -5, width: '33%', backgroundColor: '#D8E8E8', overflow: 'hidden' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={70}
                    calendarWidth={140}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus10.toISOString().split('T')[0]}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 9,
                      textDayFontSize: 8,
                      weekVerticalMargin: -8,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{ ...events, [today]: { selected: true, selectedColor: '#fe7210' } }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus10.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>

                <View style={{ left: t('languageModalFrench') === 'Französisch' ? -30 : -10, width: '33%', backgroundColor: '#D8E8E8', overflow: 'hidden' }}>
                  <CalendarList
                    key={calendarKey}
                    horizontal={true}
                    pagingEnabled={false}
                    scrollEnabled={false}
                    firstDay={1}
                    calendarHeight={70}
                    calendarWidth={140}
                    pastScrollRange={3}
                    futureScrollRange={59}
                    current={currentDatePlus11}
                    theme={{
                      calendarBackground: '#D8E8E8',
                      monthTextColor: '#000',
                      arrowColor: '#000',
                      textMonthFontWeight: 'bold',
                      textMonthFontSize: 11,
                      textDayFontSize: 8,
                      weekVerticalMargin: -8,
                      textDayHeaderFontSize: 1,
                      textSectionTitleDisabledColor: 'transparent',
                      textSectionTitleColor: 'transparent'
                    }}
                    markingType={'multi-dot'}
                    markedDates={{ ...events, [today]: { selected: true, selectedColor: '#fe7210' } }}
                    onDayPress={() => {
                      setAppearance('one');
                      setCurrentDate(currentDatePlus11.toISOString().split('T')[0]);
                    }}
                    showScrollIndicator={false}
                  />
                </View>
              </View>
            </View>
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18, backgroundColor: 'black', paddingLeft: 120, paddingRight: 120, bottom: -88, paddingBottom: 30, paddingTop: '10' }}>
            <Text onPress={() => setYearModalVisible(true)} style={{ color: '#fe7210', fontSize: 16, fontWeight: 'bold', left: t('languageModalFrench') === 'Französisch' ? '-70' : '-90' }}>{t('yearSelectionButton')}</Text>

            <TouchableOpacity onPress={goToToday}>
              <Text style={{ color: '#fe7210', fontSize: 22, fontWeight: 'bold' }}>  {t('goToTodayButton')}  </Text>
            </TouchableOpacity>

            <Text onPress={() => setMonthModalVisible(true)} style={{ color: '#fe7210', fontSize: 16, fontWeight: 'bold', alignSelf: 'right', right: t('languageModalFrench') === 'Französisch' ? '-70' : '-90' }}>{t('monthSelectionButton')}</Text>
          </View>

          <View style={{ position: 'absolute', bottom: -70, left: -80, right: -80, backgroundColor: 'black', paddingBottom: 30 }}>
            {/* <Text style={{ alignSelf: 'center', fontSize: 12, fontWeight: '300', color: 'white' }}>{selectedCountry}</Text> */}
            <Text style={{ alignSelf: 'center', fontSize: 11, fontWeight: '300', color: 'white' }}>{'<< ' + t('swipeToChangeMonthsText') + ' >>'}</Text>
          </View>

        </View>
      </View>
    </View >
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
  dropdown: {
    backgroundColor: '#D8E8E8',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  placeholderStyle: {
    fontSize: 13,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 12,
    color: '#333',
  },
  inputSearchStyle: {
    fontSize: 14,
    color: '#333',
  },
  iconStyle: {
    width: 20,
    height: 25,
  },
  selectedStyle: {
    backgroundColor: '#CEDAE1',
    borderRadius: 30,
  },
});