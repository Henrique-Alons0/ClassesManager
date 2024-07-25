// src/screens/ClassScreen.tsx
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, useColorScheme, TouchableOpacity, FlatList, ViewStyle } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/app.routes';
import { StackNavigationProp } from '@react-navigation/stack';

type ClassScreenRouteProp = RouteProp<RootStackParamList, 'ClassScreen'>;
type ClassScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClassScreen'>;

export function ClassScreen(){
  const route = useRoute<ClassScreenRouteProp>();
  const [participantName, setParticipantName] = useState('');
  const [users, setUsers] = useState<string[]>([]);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? '#202024' : '#ffffff' } as ViewStyle;
  const { classData } = route.params;
  const navigation = useNavigation();

  const addUser = () => {
    if (participantName) {
      setUsers([...users, participantName]);
      setParticipantName('');
    }
  };

  const removeUser = (name: string) => {
    setUsers(users.filter(user => user !== name));
  };

  return (
    <View style={[styles.container, backgroundStyle]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.icon}></Text>
      </View>
      <Text style={styles.title}>{classData.title}</Text>
      <Text style={styles.subtitle}>Adicione a galera e separe os times</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Participante"
        placeholderTextColor="#51515a"
        value={participantName}
        onChangeText={setParticipantName}
      />      
      <TouchableOpacity
        style={styles.button}
        onPress={addUser}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userName}>{item}</Text>
            <TouchableOpacity onPress={() => removeUser(item)}>
              <Text style={styles.removeIcon}>x</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: '#ffffff',
    fontSize: 24,
  },
  title: {
    fontSize: 32,
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#51515a',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#333',
    color: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  userCard: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    color: '#ffffff',
  },
  removeIcon: {
    color: '#ff0000',
    fontSize: 18,
  },
  button: {
    width: '100%',
    backgroundColor: '#00875f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 16,
    marginBottom: 32,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
