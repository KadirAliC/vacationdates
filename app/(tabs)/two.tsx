import { StyleSheet, FlatList, View, Modal, TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import holidays from '../holidays.json';
import { useState } from 'react';

export default function TabTwoScreen() {
  // Tatil verilerini düz bir liste haline getiriyoruz
  const [selectedYear, setSelectedYear] = useState(Object.keys(holidays)[0]);
  const [yearModalVisible, setYearModalVisible] = useState(false);

  const holidayList = Object.keys(holidays).flatMap((year) => {
    if (year === selectedYear) {
      const turkeyHolidays = holidays[year].turkey.map((holiday) => ({
        year,
        country: 'Turkey',
        holiday: holiday.holiday,
        date: holiday.date,
      }));

      const germanyHolidays = holidays[year].germany.map((holiday) => ({
        year,
        country: 'Germany',
        holiday: holiday.holiday,
        date: holiday.date,
      }));

      return [...turkeyHolidays, ...germanyHolidays];
    }
    return [];
  });

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setYearModalVisible(false);
  };

  const years = Object.keys(holidays);

  // Liste öğelerini ekranda gösterecek FlatList
  const renderHolidayItem = ({ item }) => (
    <View style={[styles.itemContainer, item.country === 'Turkey' ? styles.turkeyStyle : styles.germanyStyle]}>
      <Text style={styles.itemText}>
        {item.date} - <Text style={styles.countryText}>{item.country}</Text>: {item.holiday}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <TouchableOpacity onPress={() => setYearModalVisible(true)} style={[styles.button, { flex: 0, width: 200 }]}> 
          <Text style={styles.buttonText}>-{selectedYear}- {'\n'}</Text>
          <Text style={styles.buttonText}>Choose Year</Text>
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
        data={holidayList}
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
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
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
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
