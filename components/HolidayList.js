import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import holidaysData from '../assets/holidays.json';

const HolidayList = ({ year, country, month }) => {
  const [filteredHolidays, setFilteredHolidays] = useState([]);

  useEffect(() => {
    const holidays =
      holidaysData[year]?.[country]?.national || [];

    const filtered = holidays.filter(item => {
      const itemMonth = new Date(item.date).getMonth() + 1; // Ocak = 0
      return itemMonth === month;
    });

    setFilteredHolidays(filtered);
  }, [year, country, month]);

  return (
    <View>
      <Text style={styles.title}>Tatil Günleri</Text>
      {filteredHolidays.length > 0 ? (
        <FlatList
          data={filteredHolidays}
          keyExtractor={item => item.date}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.name}>{item.holiday}</Text>
              <Text style={styles.day}>{item.day}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.empty}>Bu ayda tatil bulunamadı.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold', margin: 10 },
  card: {
    padding: 10,
    margin: 5,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  date: { fontWeight: 'bold' },
  name: { fontSize: 16 },
  day: { color: 'gray' },
  empty: { margin: 10, fontStyle: 'italic' },
});

export default HolidayList;
