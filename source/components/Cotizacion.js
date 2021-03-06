import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Cotizacion = ({resultado}) => {
  if (Object.keys(resultado).length === 0) {
    return null;
  }

  return (
    <View style={styles.resultado}>
      <Text style={[styles.texto, styles.precio]}>
        <Text style={styles.span}>{resultado.PRICE} </Text>
      </Text>
      <Text style={styles.texto}>
        Precio más alto del día:{' '}
        <Text style={styles.span}> {resultado.HIGHDAY} </Text>
      </Text>
      <Text style={styles.texto}>
        Precio más bajo del día:{' '}
        <Text style={styles.span}> {resultado.LOWDAY} </Text>
      </Text>
      <Text style={styles.texto}>
        Variación últimas 24 horas:{' '}
        <Text style={styles.span}> {resultado.CHANGEPCT24HOUR} % </Text>
      </Text>
      <Text style={styles.texto}>
        Última Actualización:{' '}
        <Text style={styles.span}> {resultado.LASTUPDATE} </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: '#5E49E2',
    padding: 15,
  },
  texto: {
    color: '#FFF',
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    marginBottom: 5,
  },
  precio: {
    fontSize: 28,
  },
  span: {
    fontFamily: 'Lato-Black',
  },
});

export default Cotizacion;
