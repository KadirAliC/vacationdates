import React, { useState, createContext, useContext } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export const CountryContext = createContext<string>('Turkey');

export default function TabLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Turkey');

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setCountryModalVisible(false);
  };

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Turkish');
  const handleLanguageSelect = (language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
    setLanguageModalVisible(false);
  };



  const styles = StyleSheet.create({
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
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <CountryContext.Provider value={selectedCountry}>
      <View style={{ flex: 1 }}>
        <View>
          <Modal transparent={true} visible={countryModalVisible} animationType="slide" onRequestClose={() => setCountryModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={[styles.modalText, { textAlign: 'center', fontWeight: 'bold', textDecorationLine: 'underline' }]}>{t('countryModalTitle')}</Text>
                <TouchableOpacity onPress={() => handleCountrySelect('Turkey')}>
                  <Text style={[styles.modalItem, styles.modalText]}>{t('countryModalTurkey')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCountrySelect('Germany')}>
                  <Text style={[styles.modalItem, styles.modalText]}>{t('countryModalGermany')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCountrySelect('Austria')}>
                  <Text style={[styles.modalItem, styles.modalText]}>{t('countryModalAustria')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleCountrySelect('Switzerland')}>
                  <Text style={[styles.modalItem, styles.modalText]}>{t('countryModalSwitzerland')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCountryModalVisible(false)} style={[styles.closeButton]}>
                  <Text style={styles.buttonText}>{t('countryModalCloseButton')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal transparent={true} visible={languageModalVisible} animationType="slide" onRequestClose={() => setLanguageModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={[styles.modalText, { textAlign: 'center', fontWeight: 'bold', textDecorationLine: 'underline' }]}>{t('languageModalTitle')}</Text>
                <TouchableOpacity onPress={() => handleLanguageSelect('tr')}>
                  <Text style={[styles.modalItem, styles.modalText]}>{t('languageModalTurkish')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLanguageSelect('de')}>
                  <Text style={[styles.modalItem, styles.modalText]}>{t('languageModalGerman')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLanguageSelect('en')}>
                  <Text style={[styles.modalItem, styles.modalText]}>{t('languageModalEnglish')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleLanguageSelect('fr')}>
                  <Text style={[styles.modalItem, styles.modalText]}>{t('languageModalFrench')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLanguageModalVisible(false)} style={[styles.closeButton]}>
                  <Text style={styles.buttonText}>{t('languageModalClose')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            // Disable the static render of the header on web
            // to prevent a hydration error in React Navigation v6.
            headerShown: useClientOnlyValue(false, true),
            tabBarStyle: {
              backgroundColor: "black",
            },
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: t('calendar'),
              tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
              headerRight: () => (
                <>
                  <Pressable
                    onPress={() => setCountryModalVisible(true)}
                  >
                    {({ pressed }) => (
                      <FontAwesome
                        name="globe"
                        size={25}
                        color={Colors[colorScheme ?? 'light'].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() => setLanguageModalVisible(true)}
                  >
                    {({ pressed }) => (
                      <FontAwesome
                        name="language"
                        size={25}
                        color={Colors[colorScheme ?? 'light'].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                  <Link href="/modal" asChild>
                    <Pressable>
                      {({ pressed }) => (
                        <FontAwesome
                          name="info-circle"
                          size={25}
                          color={Colors[colorScheme ?? 'light'].text}
                          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />
                      )}
                    </Pressable>
                  </Link>
                </>
              ),
            }}
          />
          <Tabs.Screen
            name="two"
            options={{
              title: t('holidayList'),
              tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
              headerTitleStyle: {
                color: colorScheme === 'dark' ? '#fff' : '#000',
                backgroundColor: Colors[colorScheme ?? 'light'].background,
              },
            }}
          />
        </Tabs>
      </View>
    </CountryContext.Provider>
  );

}
