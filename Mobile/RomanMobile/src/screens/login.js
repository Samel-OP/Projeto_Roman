import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            senha: '',
        };
    }

    realizarLogin = async () => {

        console.warn(this.state.email + ' ' + this.state.senha);

        const resposta = await api.post('/login', {
            email: this.state.email,
            senha: this.state.senha,
        });

        const token = resposta.data.token;
        await AsyncStorage.setItem('userToken', token);

        if (resposta.status == 200) {
            this.props.navigation.navigate('Main');
        }

        console.warn(token);


    };


    render() {
        return (
            <ImageBackground
                source={require('../../assets/img/backgroundlogin.png')}
                style={StyleSheet.absoluteFillObject}>
                <View style={styles.overlay} />
                <View style={styles.main}>
                    <Image
                        source={require('../../assets/img/logo.png')}
                        style={styles.mainImgLogin}
                        />
                        <Text style={styles.textLogin}>Projeto Roman</Text>


                    <TextInput
                        style={styles.inputLogin}
                        placeholder="EMAIL"
                        placeholderTextColor="#6918AD"
                        keyboardType="email-address"
                       
                        onChangeText={email => this.setState({ email })}
                    />

                    <TextInput
                        style={styles.inputLogin}
                        placeholder="SENHA"
                        placeholderTextColor="#6918AD"
                        keyboardType="default" //para default nao obrigatorio.
                        secureTextEntry={true} //proteje a senha.
                       
                        onChangeText={senha => this.setState({ senha })}
                    />

                    <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={this.realizarLogin}>
                        <Text style={styles.btnLoginText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
  
    // conteúdo da main
    main: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    mainImgLogin:{
        justifyContent: 'center',
      alignItems: 'center',
        marginBottom:10,    
    },
    textLogin:{
        fontSize:24,
        color:'#fff',
        fontFamily:'Ropa Sans;',
        marginBottom:70,
        textTransform:'uppercase'
    },

    inputLogin: {
        backgroundColor:'#FFF',
        width: 310, 
        marginBottom: 40, 
        fontSize: 18,
        borderColor: 'black',
        borderRadius: 20,
      },
      
      placeholder:{
        textTransform:'uppercase'    
      },

      btnLogin:{
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'#FFDA2D',
          width:200,
          height: 55,
          borderRadius:20,
          marginTop:50,
          marginBottom:30
      },
      btnLoginText:{
          fontSize:23,
          color:'#6918AD'
      }
  });