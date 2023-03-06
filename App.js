import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
import React, { useState, useEffect } from 'react';

export default function App() {

const firebaseConfig = {
  apiKey: "AIzaSyAiNze9_N7Or9_V_CAZLx5Ir3gC6kmOYps",
  authDomain: "ostoslistafirebase-f5f50.firebaseapp.com",
  databaseURL: "https://ostoslistafirebase-f5f50-default-rtdb.firebaseio.com",
  projectId: "ostoslistafirebase-f5f50",
  storageBucket: "ostoslistafirebase-f5f50.appspot.com",
  messagingSenderId: "998724184060",
  appId: "1:998724184060:web:bcc78ceb8b037f6f7d7479",
  measurementId: "G-FRBVM4Z6WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const database = getDatabase(app);

const [amount, setAmount] = useState('');
const [product, setProduct] = useState('');
const [ostokset, setOstokset] = useState([]);

useEffect(() => {
  const itemsRef = ref(database, 'ostokset/');
  onValue(itemsRef, (snapshot) => {
  const data = snapshot.val();
  setOstokset(Object.values(data));

  const ostokset = data ? Object.keys(data).map(key => ({key, ...data[key] })) : [];
  console.log(ostokset)
  setOstokset(ostokset);
  })
  }, []);


const saveItem = () => {
  push(ref(database, 'ostokset/'),
  { 'product': product, 'amount': amount });
  }

const deleteItem = (key) => {
  console.log('deleteItem', key);
  remove(ref(database, '/ostokset/' + key))
};


const listSeparator = () => {
  return (
    <View
      style={{
        height: 5,
        width: "80%",
        backgroundColor: "#fff",
        marginLeft: "10%"
      }}
    />
  );
};

  return (
      <View style={styles.container}>
        <TextInput placeholder='Product' style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(product) => setProduct(product)}
          value={product}/>  
        <TextInput placeholder='Amount' style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(amount) => setAmount(amount)}
          value={amount}/>      
        <Button onPress={saveItem} title="Save" /> 
        <Text style={{marginTop: 30, fontSize: 20}}>Shopping list</Text>
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.key} 
          renderItem={({item}) => <View style={styles.listcontainer}><Text style={{fontSize: 18}}>{item.product}, {item.amount}</Text>
          <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => deleteItem(item.key)}> Bought</Text></View>} 
          data={ostokset} 
          ItemSeparatorComponent={listSeparator} 
        />      
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
   listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
   },
  });
