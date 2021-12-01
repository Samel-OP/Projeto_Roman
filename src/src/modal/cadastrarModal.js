import React from "react";
import {
    Alert,
    Modal,
    View,
    StyleSheet,
    Text,
    TextInput,
} from 'react-native'

import api from '../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default class Cadastrar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomeProjeto: '',
            descricao: '',
            idTema: 0,
        };
    }

    buscarProjetos = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api('/projeto'
            );

            if (resposta.status == 200) {
                const dadosProjeto = resposta.data;
                this.setState({ listaProjetos: dadosProjeto })
            }

        } catch (error) {
            console.warn(error);
        }
    }

    cadastrarProjeto = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api.post('/projeto');

            if (resposta.status == 201) {
                const projetoDados = resposta.data;
                this.setState({ nomeProjeto: projetoDados.nomeProjeto }),
                    this.setState({ descricao: projetoDados.descricao }),
                    this.setState({ idTema: projetoDados.idTema })
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
            <View style={styles.containerModal}>
                <TextInput />
            </View>
        )
    }
}

