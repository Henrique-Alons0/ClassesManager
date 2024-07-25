import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, useColorScheme, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClassesContext from '../../context/ClassesContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function CreateClassScreen() {
  const [className, setClassName] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? '#202024' : '#ffffff' };
  const navigation = useNavigation();
  const context = useContext(ClassesContext);
  const logoImage = require('../../assets/png/Logo.png');

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
    }
  };

  return (
    <View style={[styles.container, backgroundStyle]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.goBack()}>
          <Image source={logoImage} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.icon}></Text>
      </View>
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
          style={styles.button}
          onPress={handleCreateClass}
        >
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    width: 'auto',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  content: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 128
  },
  header: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'relative',
    top: 0,
  },
  headerButton: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logoContainer: {
    flex: 2,
    alignItems: 'flex-end',
  },
  icon: {
    color: '#ffffff',
    fontSize: 34,
  },
  iconGroup: {
    color: '#00b37e',
    marginRight: 8
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
    width: '100%',
    backgroundColor: '#121214',
    color: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
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
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    width: 45,
    height: 45
  }
});
