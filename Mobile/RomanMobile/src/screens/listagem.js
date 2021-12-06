import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
} from 'react-native';

import PickerModalListar from './index.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNPickerSelect from 'react-native-picker-select';

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api';
import { FlatList } from 'react-native-gesture-handler';
// import Picker from './picker';
// import PickerModal from 'react-native-picker-modal-view';


export default class Listagem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisivel: false,
            nomeProjeto: '',
            descricao: '',
            idTema: 0,
            listaProjetos: [],
        };
    }

    buscarProjetos = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const resposta = await api('/projeto',
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                },
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
            const id = await AsyncStorage.getItem('select-Modal');
            const resposta = api.post('/projeto',
                {
                    idTema: id,
                    nomeProjeto: this.state.nomeProjeto,
                    descricao: this.state.descricao
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                },
            );

            console.warn(resposta.data);

            if (resposta.status == 201) {
                console.warn("cadastrou!");
            }
        } catch (error) {
            console.warn(error);
        }
    }

    setModalVisivel = (visible) => {
        this.setState({ modalVisivel: visible })
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
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisivel}
                        onRequestClose={() => {
                            this.setModalVisivel(!this.state.modalVisivel)
                        }}>
                        <View style={styles.modalCentralizado}>
                            <View
                                style={styles.modalView}>
                                <Text style={styles.textModal}>Título: </Text>
                                <TextInput onChangeText={nomeProjeto => this.setState({ nomeProjeto })} style={styles.textModalInput}></TextInput>
                                <Text style={styles.textModal}>Descrição: </Text>
                                <TextInput onChangeText={descricao => this.setState({ descricao })} style={styles.textModalInputDescricao}></TextInput>
                                <Text style={styles.textModal}>Tema: </Text>
                                <View style={styles.containerSelecionar}>
                                    <View>
                                        <PickerModalListar />
                                    </View>
                                    <Pressable
                                        style={styles.btnEnviarModel}
                                        onPress={() => this.cadastrarProjeto()}>
                                        <Text style={styles.enviarTextModal}>Enviar</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <Pressable
                                style={styles.btnSairModal}
                                onPress={() => this.setModalVisivel(!this.state.modalVisivel)}>
                                <Text style={styles.fecharTextModal}>Fechar</Text>
                            </Pressable>
                        </View>
                    </Modal>
                </View>
                <TouchableOpacity
                    style={styles.btnSugerir}
                    onPress={() => this.setModalVisivel(true)}>
                    <Text style={styles.btnSugerirText}>Sugerir projeto</Text>
                </TouchableOpacity>


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
        <View style={styles.boxConteudo}>
            <Text style={styles.boxTextoNomeUsuario}>{item.idUsuarioNavigation.nome}</Text>
            <Text style={styles.boxTexto}>{item.nomeProjeto}</Text>
            <Text style={styles.boxTextoDescricao}>Descrição: {item.descricao}</Text>
            <View style={styles.boxTextoTema}>
                <Text style={styles.textTema}>{item.idTemaNavigation.nomeTema}</Text>
            </View>
        </View>
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
    modalCentralizado: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        width: 350,
        height: 340,
        backgroundColor: '#FFDA2D',
        borderRadius: 30,
        justifyContent: 'center',
        paddingBottom: 20
    },
    textModal: {
        fontFamily: 'RopaSans-Regular',
        fontSize: 20,
        color: 'black',
        marginTop: 20,
        marginLeft: 25,
    },
    containerSelecionar: {
        width: 125,
        height: 35,
        flexDirection: 'row',
        borderRadius: 30,
        marginLeft: 20,
        marginBottom: 50
    },
    textModalInput: {
        width: 300,
        height: 40,
        backgroundColor: 'white',
        fontSize: 15,
        borderRadius: 30,
        marginLeft: 20,
    },
    textModalInputDescricao: {
        width: 300,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 15,
        marginLeft: 20,
        flex: 1,
        flexWrap: 'wrap'
    },
    btnSugerir: {
        backgroundColor: '#6918AD',
    },
    btnSugerir: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6918AD',
        width: 350,
        height: 55,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 30
    },
    btnSugerirText: {
        fontSize: 20,
        color: 'white'
    },
    estiloSelect: {
        width: 200,
        height: 200,
        color: "white",
        backgroundColor: "blue",
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnEnviarModel: {
        width: 125,
        height: 35,
        backgroundColor: '#48A7FA',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginLeft: 50,
        marginTop: 15
    },
    enviarTextModal: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'RopaSans-Regular',
    },
    btnSairModal: {
        width: 110,
        height: 30,
        backgroundColor: "red",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 30
    },
    fecharTextModal: {
        color: 'white',
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'RopaSans-Regular',
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
        width: 100,
        height: 30,
        marginTop: 8,
        marginLeft: 15,
        borderRadius: 30,
        justifyContent:'center',
        alignItems: 'center'
    },
    textTema: {
        fontFamily: 'RopaSans-Regular',
        fontSize: 15,
        color: 'black'
    }
})