import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Alert} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptomoneda,
  setMoneda,
  setCriptomoneda,
  setConsultarAPI,
}) => {
  
  const [criptomonedas, setCriptomonedas] = useState([]);

  const obtenerMoneda = coin => {
    setMoneda(coin);
  };

  const obtenerCriptomoneda = cripto => {
    setCriptomoneda(cripto);
  };

  const cotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    //Pasa la validacion
    console.log('Cotizando ...!!');

    // Cambiar el state de consultar api
    setConsultarAPI(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error', 'Ambos campos son requeridos', [{Text: 'Ok'}]);
  };

  //useEffect esta basado en promesas, para ahorrar codigo 'async' y 'await'
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      console.log(resultado.data.Data);
      setCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={moneda => obtenerMoneda(moneda)}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Selecciones -" value="" />
        <Picker.Item label="Dolar de EEUU" value="USD" />
        <Picker.Item label="EURO" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
        <Picker.Item label="Colon de Costa Rica" value="CRC" />
        <Picker.Item label="Peso de Mexico" value="MXN" />
      </Picker>

      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={criptomoneda => obtenerCriptomoneda(criptomoneda)}
        itemStyle={{height: 120}}>
        <Picker.Item label="- Selecciones -" value="" />
        {criptomonedas.map(cripto => (
          <Picker.Item
            key={cripto.CoinInfo.id}
            label={cripto.CoinInfo.FullName}
            value={cripto.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.labelCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  labelCotizar: {
    color: '#FFF',
    fontFamily: 'Lato-Black',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default Formulario;
