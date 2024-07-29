import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

export function Header() {
    const logoImage = require('../../assets/png/Logo.png');
    const navigation = useNavigation();
    
    return(
        <View style={styles.header}>
            <TouchableOpacity testID="go-back-button" style={styles.headerButton} onPress={() => navigation.goBack()}>
            <Icon style={styles.icon} name='arrow-back-ios' size={30} color="#fff"/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoContainer}>
            <Image source={logoImage} style={styles.logo} />
            </TouchableOpacity>
            <Text style={styles.icon}></Text>
        </View>
    );
}