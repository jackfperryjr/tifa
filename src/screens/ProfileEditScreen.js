import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, Image, Keyboard, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class ProfileEditScreen extends Component {
    constructor(props){        
        super(props);        
        this.state={            
           username:'',
           password: '',
           firstname: '',
           lastname: '',
           age: '',
           dog: '',
           userid: '',
           token: '',
           picture: ''
        } 
    }
    componentWillMount() {
        AsyncStorage.getItem('username')
        .then((username) => {
            this.setState({ username })
        })
        AsyncStorage.getItem('password')
        .then((password) => {
            this.setState({ password })
        })
        AsyncStorage.getItem('userid')
        .then((userid) => {
            this.setState({ userid })
        })
        AsyncStorage.getItem('token')
        .then((token) => {
            this.setState({ token })
        })
        AsyncStorage.getItem('picture')
        .then((picture) => {
            this.setState({ picture })
        })
    }
    sendData = async()=> {
        const {userid, username, password, firstname, lastname, age, dog, token} = this.state;
        const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000/users/' : 'http://localhost:5000/users/';
        
        let response = await fetch(baseUrl + userid, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({ username: username, password: password, firstname: firstname, lastname: lastname, age: age, dog: dog })
            });

        if (response.status >= 200 && response.status < 300) {
            const {username, password} = this.state;
            AsyncStorage.setItem('username', username);
            AsyncStorage.setItem('password', password);
            AsyncStorage.setItem('firstname', firstname);
            AsyncStorage.setItem('lastname', lastname);
            AsyncStorage.setItem('age', age);
            AsyncStorage.setItem('dog', dog);
            Keyboard.dismiss();
            //Actions.profile();
        } else {
            console.log(response.status)
            alert("Wrong username or password!");
        } 
        
    }
    cancel () {
      }
    render() {
        return (
        <View style={styles.container}>
            <StatusBar
            backgroundColor="#000" 
            barStyle="light-content"
            />
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    {/* <Image style={{ width: 220, height: 220 }} source={{ uri: this.state.picture }} /> */}
                    <Image style={{ width: 220, height: 220 }} source={require('../images/icon-user.png')} />
                </View>
                <View style={{ alignItems: 'center', marginTop: 20, marginLeft: 10, marginRight: 10}}>
                    <TextInput style={styles.inputBox}
                    onChangeText={(username) => this.setState({username})}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Username"
                    autoCapitalize = 'none'
                    placeholderTextColor = "#000"
                    selectionColor="#00bfa5"
                    keyboardType="default"
                    />
                    
                    <TextInput style={styles.inputBox}
                    onChangeText={(password) => this.setState({password})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor = "#000"
                    selectionColor="#00bfa5"
                    ref={(input) => this.password = input}
                    />

                    <TextInput style={styles.inputBox}
                    onChangeText={(firstname) => this.setState({firstname})}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="First Name"
                    placeholderTextColor = "#000"
                    selectionColor="#00bfa5"
                    keyboardType="default"
                    />

                    <TextInput style={styles.inputBox}
                    onChangeText={(lastname) => this.setState({lastname})}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Last Name"
                    placeholderTextColor = "#000"
                    selectionColor="#00bfa5"
                    keyboardType="default"
                    />

                    <TextInput style={styles.inputBox}
                    onChangeText={(age) => this.setState({age})}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Age"
                    placeholderTextColor = "#000"
                    selectionColor="#00bfa5"
                    keyboardType="default"
                    />

                    <TextInput style={styles.inputBox}
                    onChangeText={(dog) => this.setState({dog})}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Dog"
                    placeholderTextColor = "#000"
                    selectionColor="#00bfa5"
                    keyboardType="default"
                    />
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.button}> 
                        <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={styles.buttonText} onPress={this.sendData}>Save</Text>
                            <Text style={styles.buttonText} onPress={this.cancel} >Cancel</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  inputBox: {
    width: 300,
    backgroundColor: '#eeeeee', 
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    marginVertical: 10
    },
    button: {
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00bfa5',
        textAlign: 'center'
    }
});