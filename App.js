import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useWebSocket from 'react-use-websocket';
import { useState } from 'react';

export default function App() {

  const [data, setData] = useState({});

  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/btcusdt@ticker`, {
    onOpen: () => { },
    onMessage: () => {
      if(lastJsonMessage){
        setData(lastJsonMessage);
      }
    },
    onError: (event) => alert(event),
    shouldReconnect: () => true,
    reconnectInterval: 3000

  })

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
