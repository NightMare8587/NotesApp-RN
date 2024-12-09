import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite'
export default function index() {
const db = SQLite.openDatabaseSync("notes.db")
const [input,setInput] = useState("");
useEffect(() => {
 db.execAsync('CREATE TABLE IF NOT EXISTS strings (id INTEGER PRIMARY KEY AUTOINCREMENT, value TEXT);', )
},[])
const saveNote = async () => {
  await db.execAsync( `INSERT INTO strings (value) VALUES ('${input}')` );
  setInput(""); 
  fetchNotes();
}
const fetchNotes = async () => {
  const response = await db.execAsync("SELECT value FROM strings");
  console.log(response);
}
  return (
    <View style={styles.container}>
       <TextInput style={styles.inputField}
       placeholder='Enter your notes'
       value={input}
       onChangeText={setInput}/>

       <TouchableOpacity style={styles.button} onPress={saveNote}>
        <Text style={styles.buttonText}>Add</Text>
       </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputField: {
    marginTop: 20,
    backgroundColor: '#e4dfde',
    borderRadius: 20,
    borderColor: 'black',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical:10,
    minHeight: 50
  },
  button: {
    width: 100,
    backgroundColor: 'orange',
    marginHorizontal: 'auto',
    marginTop: 20,
    borderRadius: 20,
    borderColor: 'black'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20
  },
  list: {
    marginTop: 20
  }
})