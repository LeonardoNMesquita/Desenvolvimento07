import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Keyboard, Text } from 'react-native';
import PrevisaoItem from './Components/PrevisaoItem';

export default function App() {

  const endPoint = "https://api.openweathermap.org/data/2.5/weather?lang=pt&units=metric&q=";
  const apiKey = '71555f192ef9a1720c78a0024b1a7ab9';

  const [cidade, setCidade] = useState('');
  const [previsoes, setPrevisoes] = useState([]);
  

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }

  const obtemPrevisoes = () => {
    setPrevisoes([]);

  const target = endPoint + cidade + "&appid=" + apiKey;
    fetch(target)
    .then((dados) => dados.json())
    .then((dados) => {

      setPrevisoes([dados])
      Keyboard.dismiss()
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
      <TextInput
      style={styles.nomeCidade}
      placeholder="Digite o nome de uma cidade"
      value={cidade}
      onChangeText={capturarCidade}
      />
      <Button title="Pesquisar" onPress={obtemPrevisoes}/>
      </View>
      {
        <FlatList
          data={previsoes}
          renderItem={
            previsao => (
            <PrevisaoItem previsao={previsao} />
          )
          }
        />

      }
    </View>
    );
    
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#ffa'
  },
  nomeCidade: {
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.7
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
});
