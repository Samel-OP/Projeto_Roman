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


export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomeUsuario: '',
        };
    }
    
    buscarProjetos = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api('/projeto'
            );
            
            if (resposta.status == 200) {
                const dadosProjeto = resposta.data;
                this.setState({ nomeUsuario: dadosProjeto })
            }

        } catch (error) {
            console.warn(error);
        }
    }

    componentDidMount() {
        this.buscarProjetos();
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

                <View>
                    <Text>
                        Oi
                    </Text>
                </View>
            </View >

        );
    }
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FDBF00',
        alignItems: 'center',
    },
    imgHeader: {
        marginTop: 10,
        marginBottom: 10,
    }
})