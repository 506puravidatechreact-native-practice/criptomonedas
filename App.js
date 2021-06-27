import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import Header from './source/components/Header';
import Formulario from './source/components/Formulario';
import Cotizacion from './source/components/Cotizacion';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');

  const [consultarAPI, setConsultarAPI] = useState(false);

  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    console.log('Consultar API, estado ha cambiado');
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        // consultar la api para obtener la cotización
        console.log('Listo para cotizar');
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);

        console.log(resultado.data.DISPLAY[criptomoneda][moneda]);
        setCargando(true);

        // Ocultar el spinner y mostrar el resultado
        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          setConsultarAPI(false);
          setCargando(false);
        }, 3000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarAPI, criptomoneda, moneda]);

  // mostrar el spinner o el resultado
  const componente = cargando ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <>
      <ScrollView>
        <Header />

        <Image
          style={styles.img}
          source={require('./assets/img/cryptomonedas.png')}
        />

        <View style={styles.wrapper}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
            setConsultarAPI={setConsultarAPI}
          />
        </View>
        <View style={{marginTop: 30}}>{componente}</View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  wrapper: {
    marginHorizontal: '2.5%',
  },
});

export default App;
