import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    ScrollView,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api';
import { FlatList } from 'react-native-gesture-handler';

export default class Listagem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listaProjetos: [],
        };
    }

    buscarProjetos = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const resposta = await api('/projeto'
            );

            console.warn(resposta)

            if (resposta.status == 200) {
                console.warn(resposta);
                const dadosProjeto = resposta.data;
                this.setState({ listaProjetos: dadosProjeto })
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

                <View>
                    <FlatList
                        data={this.state.listaProjetos}
                        keyExtractor={item => item.idProjeto}
                        renderItem={this.renderItem}
                    />
                </View>


            </View>
        );
    }

    renderItem = ({ item }) => (
        <ScrollView style={styles.boxConteudo}>
            <Text style={styles.boxTexto}>{item.idUsuarioNavigation.nome}</Text>
            <Text style={styles.boxTexto}>{item.nomeProjeto}</Text>
            <Text style={styles.boxTexto}>{item.idTemaNavigation.nomeTema}</Text>
        </ScrollView>
    )

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
    },
    boxConteudo: {
        backgroundColor: '#9D2FFA',
        flex: 4,
        width: 250,
        width: 200,
        marginBottom: 10,
    },
    boxTexto: {
        color: '#fff',
        marginBottom: 5,
    },
    boxTextoTema: {
        backgroundColor: '',
    }
})