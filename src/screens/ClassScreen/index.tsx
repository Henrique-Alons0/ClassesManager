import 'react-native-gesture-handler';
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, useColorScheme, TouchableOpacity, FlatList, ViewStyle, Alert, Image } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/app.routes';
import ClassesContext from '../../context/ClassesContext';
import { ErrorHandler } from '../../services/ErrorHandler/ErrorHandler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style';

type ClassScreenRouteProp = RouteProp<RootStackParamList, 'ClassScreen'>;

export function ClassScreen() {
  const teams = ["TIME A", "TIME B"];

  const logoImage = require('../../assets/png/Logo.png');
  const context = useContext(ClassesContext);
  
  if (!context) {
    return <Text>Context not available</Text>;
  }
  
  const route = useRoute<ClassScreenRouteProp>();
  const { classData } = route.params;
  const { classes, removeClass, addParticipant, setTeamAClass, setTeamBClass} = context;

  const currentClass = () => {
    return classes.find(cls => cls.id === classData.id);
  }

  const [participantName, setParticipantName] = useState('');
  const [teamA, setTeamA] = useState<string[]>(currentClass()?.teamA ?? []);
  const [teamB, setTeamB] = useState<string[]>(currentClass()?.teamB ?? []);
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
          ErrorHandler('TEAM_RESOLUTION_ERROR', { teamName: selectedTeam || 'atual' });
        }
      } else { 
        ErrorHandler('PARTICIPANT_ALREADY_EXISTS', { participantName, teamName: selectedTeam || 'atual' });
      }
    } else {
      ErrorHandler('EMPTY_PARTICIPANT_NAME', { className: currentClass()?.title || 'atual' });
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
    isTeamA ? setTeamA(updatedA) : setTeamB(updatedB);
  };


  const handleTeamPress = (team: string) => {
    setSelectedTeam(team);
  };

  return (
    <View style={[styles.container, backgroundStyle]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
          <Icon style={styles.icon} name='arrow-back-ios' size={30} color="#fff"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoContainer} onPress={() => navigation.goBack()}>
          <Image source={logoImage} style={styles.logo} />
        </TouchableOpacity>
        <Text style={styles.icon}></Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{classData.title}</Text>
        <Text style={styles.subtitle}>Adicione a galera e separe os times</Text>
        <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nome do Participante"
          placeholderTextColor="#51515a"
          value={participantName}
          onChangeText={setParticipantName}
        />
        <TouchableOpacity style={styles.addButton} testID="add-button" onPress={addUser}>
          <Icon name="add" size={24} color="#00b37e" />
        </TouchableOpacity>
      </View>
        <View style={styles.teamsContainer}>
          <FlatList
            data={teams}
            keyExtractor={(team) => team}
            renderItem={({ item }) => (
              <View style={[styles.teamButton, selectedTeam === item && styles.selectedTeamButton]}>
                <TouchableOpacity testID={`set-team-${(item.split(" "))[1].toLocaleLowerCase()}-button`} onPress={() => handleTeamPress(item)}>
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
              <TouchableOpacity testID={`remove-participant-button-${item.trim()}`} onPress={() => removeTeamParticipant(selectedTeam === "TIME A" ? 'A' : 'B', item)}>
                <Icon style={styles.removeIcon} name="close" size={32} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        />
      <TouchableOpacity
        style={styles.buttonDelete}
        testID="remove-button"
        onPress={() => {
          if([undefined, null, ''].includes(currentClass()?.id)) {
            ErrorHandler('DELETION_ERROR');
            return;
          }
          removeClass(currentClass()?.id || '');
          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>Remover turma</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default ClassScreen;