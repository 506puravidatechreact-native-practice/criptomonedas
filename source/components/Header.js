import React from 'react';
import {ScrollView, StyleSheet, Text, View, Platform} from 'react-native';

const Header = () => <Text style={styles.encabezado}>CRIPTOMONEDAS</Text>;

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    fontFamily: 'Lato-Black',
    backgroundColor: '#5E49E2',
    paddingBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    color: '#FFF',
    marginBottom: 20,
  },
});

export default Header;
