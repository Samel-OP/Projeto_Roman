import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Modal,
    Pressable,
    SafeAreaView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/api';
import { FlatList } from 'react-native-gesture-handler';


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

    setModalVisivel = (visible) => {
        this.setState({ modalVisivel: visible })
    }

    componentDidMount() {
        this.buscarProjetos();
    }

    render() {
        const { modalVisivel } = this.state
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
                        visible={modalVisivel}
                        onRequestClose={() => {
                            this.setModalVisivel(!modalVisivel)
                        }}>
                        <View style={styles.modalCentralizado}>
                            <View
                                style={styles.modalView}>
                                <Text style={styles.textModal}>Título: </Text>
                                <TextInput style={styles.textModalInput}></TextInput>
                                <Text style={styles.textModal}>Descrição: </Text>
                                <TextInput style={styles.textModalInputDescricao}></TextInput>
                                <Text style={styles.textModal}>Tema: </Text>
                                <View style={styles.containerSelecionar}>
                                    <View>
                                        <RNPickerSelect style={styles.estiloSelect}
                                            placeholder={{
                                                label: "Selecione um tema",
                                                value: null,
                                            }}

                                            onValueChange={idTema => this.setState({ idTema })}
                                            items={[
                                                { key: 1, label: 'Gestão', value: 1 },
                                                { key: 2, label: 'HQs', value: 2 },
                                                { key: 3, label: 'Games', value: 3 },
                                                { key: 4, label: 'Tecnologia', value: 4 },
                                                { key: 5, label: 'ReactNative', value: 5 },
                                                { key: 6, label: 'Fisica Quântica', value: 6 },
                                            ]}

                                        />
                                    </View>
                                    <Pressable
                                        style={styles.btnEnviarModel}
                                        onPress={() => cadastrarProjeto()}>
                                        <Text style={styles.enviarTextModal}>Enviar</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <Pressable
                                style={styles.btnSairModal}
                                onPress={() => this.setModalVisivel(!modalVisivel)}>
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
        <SafeAreaView>
            <ScrollView style={styles.boxConteudo}>
                <Text style={styles.boxTextoNomeUsuario}>{item.idUsuarioNavigation.nome}</Text>
                <Text style={styles.boxTexto}>{item.nomeProjeto}</Text>
                <Text style={styles.boxTextoDescricao}>Descrição: {item.descricao}</Text>
                <Text style={styles.boxTextoTema}>{item.idTemaNavigation.nomeTema}</Text>
            </ScrollView>
        </SafeAreaView>
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
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 30,
        marginLeft: 20,
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
        marginLeft: 170,
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
        width: 60,
        height: 30,
        marginTop: 8,
        marginLeft: 15,
        borderRadius: 30,
    }
})