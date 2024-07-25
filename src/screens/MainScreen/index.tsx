import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList, useColorScheme, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ClassesContext from '../../context/ClassesContext';
import { RootStackParamList } from '../../routes/app.routes';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

  // Component for when the list is empty
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhuma turma.</Text>
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
          <TouchableOpacity onPress={() => handleClassPress(item)}>
            <View style={styles.card}>
              <Icon style={styles.icon} name="groups" size={30} color="#000" />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={renderEmptyComponent}
      />
      {/* <Button
        title="Criar Turma"
        color="#00875f"
        onPress={() => navigation.navigate('CreateClassScreen')}
      /> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateClassScreen')}
      >
        <Text style={styles.buttonText}>Criar Turma</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    fontFamily: 'Roboto'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#51515a',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    minWidth: "100%",
    width: "auto",
    backgroundColor: '#29292e',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '#00b37e',
    marginRight: 8
  },
  cardTitle: {
    color: '#ffffff',
  },
  logo: {
    margin: 32,
    width: 60,
    height: 60,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#51515a',
    fontSize: 16,
  },
});
