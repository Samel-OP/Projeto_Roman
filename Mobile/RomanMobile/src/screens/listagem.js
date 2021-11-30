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
                    <FlatList
                        data={this.state.listaProjetos}
                        keyExtractor={item => item.idProjeto}
                        renderItem={this.renderItem}
                        />
                </View>
            </View >

        );
    }

    renderItem = ({ item }) => (
        <ScrollView style={styles.boxConteudo}>
            <Text style={styles.boxTextoNomeUsuario}>{item.idUsuarioNavigation.nome}</Text>
            <Text style={styles.boxTexto}>{item.nomeProjeto}</Text>
            <Text style={styles.boxTextoDescricao}>Descrição: {item.descricao}</Text>
            <Text style={styles.boxTextoTema}>{item.idTemaNavigation.nomeTema}</Text>
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
        width: 350,
        height: 168,
        marginBottom: 10,
        borderRadius: 30,
    },
    boxTexto: {
        fontFamily: 'RopaSans-Regular',
        fontSize: 20,
        color: '#fff',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    boxTextoNomeUsuario: {
        fontFamily: 'RopaSans-Regular',
        fontSize: 20,
        color: '#fff',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
    },
    boxTextoDescricao: {
        fontFamily: 'RopaSans-Regular',
        color: '#fff',
        fontSize: 15,
        marginTop: 8,
        marginLeft: 15,
        marginRight: 15,
    },
    boxTextoTema: {
        backgroundColor: '#FFDA2D',
        fontFamily: 'RopaSans-Regular',
        fontSize: 15,
        padding: 5,
        width: 60,
        height: 30,
        marginTop: 8,
        marginLeft: 15,
        borderRadius: 30,
    }
})