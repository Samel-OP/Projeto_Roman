import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api';
import jwtDecode from 'jwt-decode';


export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomeUsuario: '',
            email: '',
        };
    }

    buscarDadosStorage = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');

            if (token != null) {
                console.warn(token)
                console.warn(jwtDecode(token))
                this.setState({ nomeUsuario: jwtDecode(token).name })
                this.setState({ email: jwtDecode(token).email })
            }

        } catch (error) {
            console.warn(error);
        }
    }

    realizarLogout = async () => {

        try {
            await AsyncStorage.removeItem('userToken');
            this.props.navigation.navigate('Login');
        } catch (error) {
            console.warn(error);
        }
    };

    componentDidMount() {
        this.buscarDadosStorage();
    }

    render() {
        return (
            <View style={styles.main}>
                <Image
                    source={require('../../assets/img/logoheader.png')}
                    style={styles.imgHeader}
                />

                {/* <View>
                     <TouchableOpacity
                         style={}
                         onPress={}>
                         <Text style={ }>Sugerir projeto</Text>
                     </TouchableOpacity>
                </View> */}

                <View
                    style={styles.boxPerfil}>
                    <Text
                        style={styles.nomeUsuario}>
                        {this.state.nomeUsuario}
                    </Text>
                    <Text
                        style={styles.nomeUsuario}>
                        {this.state.email}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.btnLogout}
                    onPress={this.realizarLogout}>
                    <Text style={styles.btnLogoutText}>Sair</Text>
                </TouchableOpacity>
            </View >



        );
    }
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FDBF00',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgHeader: {
        marginTop: 10,
        marginBottom: 10,
    },
    boxPerfil: {
        alignItems: 'center',
    },
    nomeUsuario: {
        marginTop: 5,
        color: 'white',
        fontFamily: 'RopaSans-Regular',
        fontSize: 25,
    },
    btnLogout: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9D2FFA',
        width: 200,
        height: 55,
        borderRadius: 20,
        marginTop: 50,
        marginBottom: 30
    },

    btnLogoutText: {
        fontSize: 23,
        color: '#fff'
    }



})