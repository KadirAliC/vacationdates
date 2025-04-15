import { StyleSheet, FlatList, View, Modal, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import holidays from '../holidays.json';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function TabTwoScreen() {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState(Object.keys(holidays)[0]);
  const [yearModalVisible, setYearModalVisible] = useState(false);
  const [holidayListData, setHolidayListData] = useState([]);

  useEffect(() => {
    const updateHolidayList = () => {
      const countries = [
        { name: 'Germany', flag: '🇩🇪', color: 'grey' },
        { name: 'Austria', flag: '🇦🇹', color: '#f78181' },
        { name: 'Switzerland', flag: '🇨🇭', color: '#87d9ff' }
      ];
      const holidayTypes = {
        National: { emoji: '🕊' },
        Religious: { emoji: '⛪' },
        School: { emoji: '📚' }
      };

      const newList = countries.flatMap(country => {
        return Object.entries(holidayTypes).flatMap(([type, typeInfo]) => {
          const countryData = holidays[selectedYear]?.[country.name] || {};
          let holidaysForType = [];

          // Get the holiday data based on type
          const typeData = countryData[type] || [];
          
          // Handle Religious holidays (state-based)
          if (type === 'Religious') {
            holidaysForType = Object.values(typeData).flat();
          }
          // Handle School and National holidays (direct arrays)
          else {
            holidaysForType = Array.isArray(typeData) 
              ? typeData 
              : [];
          }

          if (holidaysForType.length > 0) {
            return holidaysForType.map((holiday) => ({
              year: selectedYear,
              country: country.name,
              countryFlag: country.flag,
              holiday: holiday.holiday,
              date: holiday.date,
              type: type,
              typeEmoji: typeInfo.emoji,
              backgroundColor: country.color,
              textColor: typeInfo.color
            }));
          }
          return [];
        });
      });

      setHolidayListData(newList);
    };

    updateHolidayList();
  }, [selectedYear]);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setYearModalVisible(false);
  };

  const years = Object.keys(holidays);

  const renderHolidayItem = ({ item }) => (
    <View style={[styles.itemContainer, { backgroundColor: item.backgroundColor }]}>
      <View style={styles.itemContent}>
        <Text style={[styles.itemText, { color: item.textColor }]}>
          {item.date} - {item.countryFlag} {item.typeEmoji} {item.holiday} ({item.type})
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => setYearModalVisible(true)} style={[styles.button, { flex: 0, width: 200 }]}>
          <Text style={styles.buttonText}>-{selectedYear}- {'\n'}</Text>
          <Text style={styles.buttonText}>{t('yearSelectionButton')}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={yearModalVisible}
        animationType="slide"
        onRequestClose={() => setYearModalVisible(false)}
      >
        <View style={styles.modalContainer}>
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
      </Modal>

      <FlatList
        data={holidayListData}
        renderItem={renderHolidayItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Listeyi baştan itibaren yerleştirmek için
    padding: 20,
    backgroundColor: '#bfbfbf'
  },
  itemContainer: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  turkeyStyle: {
    backgroundColor: '#f75757', // Türkiye tatilleri için kırmızı tonları
  },
  germanyStyle: {
    backgroundColor: '#81b2fc', // Almanya tatilleri için mavi tonları
  },
  itemText: {
    fontSize: 16,
    color: 'black', // Yazının rengi koyu gri
    fontWeight: 'bold',
  },
  countryText: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
