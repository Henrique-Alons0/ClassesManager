import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, useColorScheme, TouchableOpacity, FlatList, ViewStyle, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/app.routes';
import { StackNavigationProp } from '@react-navigation/stack';
import ClassesContext from '../../context/ClassesContext';

type ClassScreenRouteProp = RouteProp<RootStackParamList, 'ClassScreen'>;
type ClassScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClassScreen'>;

export function ClassScreen() {
  const teams = ["TIME A", "TIME B"];

  const context = useContext(ClassesContext);
  
  if (!context) {
    return <Text>Context not available</Text>;
  }
  
  const route = useRoute<ClassScreenRouteProp>();
  const { classData } = route.params;
  const { classes, addParticipant, setTeamAClass, setTeamBClass} = context;

  const currentClass = () => {
    return classes.find(cls => cls.id === classData.id);
  }

  const [participantName, setParticipantName] = useState('');
  const [teamA, setTeamA] = useState<string[]>(currentClass()?.teamA ?? []);
  const [teamB, setTeamB] = useState<string[]>(currentClass()?.teamB ?? []);
  const countParticipants = (team: string[]) => {
    return team.length;
  }
  const [selectedTeam, setSelectedTeam] = useState<string>(teams[0]);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? '#202024' : '#ffffff' } as ViewStyle;
  const navigation = useNavigation();

  if (!currentClass) {
    return <Text>Class not found</Text>;
  }

  const addUser = () => {
    if (participantName) {
      if((selectedTeam == "TIME A" ? !teamA.includes(participantName) : !teamB.includes(participantName))){
        addParticipant(classData.id, participantName, selectedTeam == "TIME A" ? "teamA" : "teamB");
        setParticipantName('');
        if(selectedTeam == "TIME A"){
          setTeamA((prevTeamA) => prevTeamA ? [...prevTeamA, participantName] : [participantName]);
        } else if(selectedTeam == "TIME B"){
          setTeamB((prevTeamB) => prevTeamB ? [...prevTeamB, participantName] : [participantName]);
        } else {
          Error("Could not resolve team participants!")
          Alert.alert("Erro", `Não foi possível resolver os participantes da equipe ${selectedTeam}!`);
        }
      } else {
        Error(`The participant "${participantName}" already exists in ${selectedTeam}`)
        Alert.alert("Erro", `O participante "${participantName}" já existe no ${selectedTeam}"`);
      }
    } else {
      Error(`Participant name cannot be empty!`)
      Alert.alert("Atenção", `O nome do participante não pode ser vazio!`);
    }
  };

  const removeTeamParticipant = (team: string, name: string) => {
    if (!["A", "B"].includes(team.toUpperCase())) {
      throw new Error("The team parameter is not a valid type");
    }

    const isTeamA = team.toUpperCase() === "A";
    const updatedTeamA = isTeamA ? (currentClass()?.teamA ?? []) : (currentClass()?.teamA ?? []);
    const updatedTeamB = !isTeamA ? (currentClass()?.teamB ?? []) : (currentClass()?.teamB ?? []);

    const updatedA = isTeamA ? updatedTeamA.filter(user => user !== name) : updatedTeamA;
    const updatedB = !isTeamA ? updatedTeamB.filter(user => user !== name) : updatedTeamB;

    isTeamA ? setTeamAClass(currentClass()?.id ?? "", updatedA) : setTeamBClass(currentClass()?.id ?? "", updatedB);
  };


  const handleTeamPress = (team: string) => {
    setSelectedTeam(team);
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
      <View style={styles.teamsContainer}>
        <FlatList
          data={teams}
          keyExtractor={(team) => team}
          renderItem={({ item }) => (
            <View style={[styles.teamButton, selectedTeam === item && styles.selectedTeamButton]}>
              <TouchableOpacity onPress={() => handleTeamPress(item)}>
                <Text style={styles.teamButtonText}>{item}</Text>
              </TouchableOpacity>
            </View>
          )}
          horizontal
        />
        <Text style={styles.teamCount}>{selectedTeam == "TIME A" ? currentClass()?.teamA.length : currentClass()?.teamB.length}</Text>
      </View>
      <FlatList
      data={selectedTeam === "TIME A" ? currentClass()?.teamA : currentClass()?.teamB}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={styles.userCard}>
          <Text style={styles.userName}>{item}</Text>
          <TouchableOpacity onPress={() => removeTeamParticipant(selectedTeam === "TIME A" ? 'A' : 'B', item)}>
            <Text style={styles.removeIcon}>x</Text>
          </TouchableOpacity>
        </View>
      )}
    />
    </View>
  );
}

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
    backgroundColor: '#121214',
    color: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamButton: {
    borderColor: 'transparent',
    borderWidth: 1,
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  selectedTeamButton: {
    borderColor: '#00b37e',
    borderWidth: 1,
  },
  teamButtonText: {
    color: '#FFF',
  },
  teamCount: {
    color: '#ffffff',
    fontSize: 16,
  },
  userCard: {
    backgroundColor: '#29292e',
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

export default ClassScreen;
