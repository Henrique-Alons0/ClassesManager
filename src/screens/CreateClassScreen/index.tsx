import React, { useState, useContext } from 'react';
import { View, Text, TextInput, useColorScheme, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClassesContext from '../../context/ClassesContext/ClassesContext';
import { Header } from '../../components/Header';
import { ErrorHandler } from '../../services/ErrorHandler/ErrorHandler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

export function CreateClassScreen() {
  const [className, setClassName] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? '#202024' : '#ffffff' };
  const navigation = useNavigation();
  const context = useContext(ClassesContext);

  if (!context) {
    throw new Error('useContext must be used within a ClassesProvider');
  }

  const { addClass } = context;

  const handleCreateClass = () => {
    if (className) {
      const newClass = { id: Date.now().toString(), title: className };
      addClass(newClass);
      setClassName('');
      navigation.goBack();
    } else {
      ErrorHandler('EMPTY_CLASS_NAME');
    }
  };

  return (
    <View style={[styles.container, backgroundStyle]}>
      <Header />
      <View style={styles.content}>
        <Icon style={styles.iconGroup} name="groups" size={60} color="#000" />
        <Text style={styles.title}>Nova Turma</Text>
        <Text style={styles.subtitle}>Crie uma turma para adicionar pessoas</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome da Turma"
          placeholderTextColor="#51515a"
          value={className}
          onChangeText={setClassName}
        />
        <TouchableOpacity
          testID='create-class-button'
          style={styles.button}
          onPress={handleCreateClass}
        >
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}