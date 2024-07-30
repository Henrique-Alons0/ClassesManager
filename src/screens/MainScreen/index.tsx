import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList, useColorScheme, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClassesContext from '../../context/ClassesContext/ClassesContext';
import { RootStackParamList } from '../../routes/app.routes';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;

export function MainScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? '#202024' : '#ffffff' };

  const navigation = useNavigation<MainScreenNavigationProp>();
  const context = useContext(ClassesContext);

  const logoImage = require('../../assets/png/Logo.png');

  if (!context) {
    throw new Error('ClassesContext must be used within a ClassesProvider');
  }

  const { classes } = context;

  const handleClassPress = (classItem: { id: string; title: string }) => {
    navigation.navigate('ClassScreen', { classData: classItem });
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text testID='emptyClasses' style={styles.emptyText}>Nenhuma turma.</Text>
    </View>
  );

  return (
    <View style={[styles.container, backgroundStyle]}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.title}>Turmas</Text>
      <Text style={styles.subtitle}>Jogue com a sua turma</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity testID={`class_${item.id}`} onPress={() => handleClassPress(item)}>
            <View style={styles.card}>
              <Icon style={styles.icon} name="groups" size={30} color="#000" />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={renderEmptyComponent}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateClassScreen')}
      >
        <Text style={styles.buttonText}>Criar nova turma</Text>
      </TouchableOpacity>
    </View>
  );
};