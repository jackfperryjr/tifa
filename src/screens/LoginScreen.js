import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Image, Alert, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default class LoginScreen extends Component {
    constructor(props){        
        super(props);        
        this.state={            
           username:'',
           password: '',
           userid: '',
           token: ''    
        } 
    }
sendData = async()=> {
    const {username, password} = this.state
    // baseUrl is only being used for my DEV environment
    // Android and iOS find the local server differently, too, hence the ternary conditional
    // In PROD this would be whatever url the API is located at
    const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000/users/' : 'http://localhost:5000/users/'
    const navigation = this.props.navigation

    let that = this
    let response = await fetch(baseUrl + 'authenticate', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password })
        })
        .then(function(response){ 
            return response.json();   
            })
            .then(function(data){ 
              if (data.message) {
                Alert.alert(data.message,
                    "Check your credentials.",
                    [
                    {text: 'Got it!'},
                    ],
                    {cancelable: true}
                )
              } else {
                that.state.userid = data.userId.toString()
                that.state.token = data.token
                const {username, password, userid, token} = that.state
                AsyncStorage.setItem('username', username)
                AsyncStorage.setItem('password', password)
                AsyncStorage.setItem('userid', userid)
                AsyncStorage.setItem('token', token)
                Keyboard.dismiss()
                that.props.navigation.navigate('Home')
              }
        })
        .catch(error => {
            if (error) {
                Alert.alert("No network connection!",
                    "Check your wifi or cellular connection.",
                    [
                    {text: 'Got it!'},
                    ],
                    {cancelable: true}
                )
            }
    });
  }
  render () {
    return (
      <View style={styles.container}>
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
        <Image style={{ width: 140, height: 140 }} source={require('../images/icon-puppy.png')} />
        <Text style={{fontWeight: "bold"}}>Find your puppy's match!</Text>
        <View style={styles.inputContainer}>
            <TextInput style={styles.inputBox}
            onChangeText={(username) => this.setState({username})}
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder="Username"
            autoCapitalize = 'none'
            placeholderTextColor = "#000"
            selectionColor="#00bfa5"
            keyboardType="default"
            onSubmitEditing={()=> this.password.focus()}/>
            
            <TextInput style={styles.inputBox}
            onChangeText={(password) => this.setState({password})} 
            underlineColorAndroid='rgba(0,0,0,0)' 
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor = "#000"
            selectionColor="#00bfa5"
            ref={(input) => this.password = input}
            />

            <TouchableOpacity style={styles.button}> 
                <Text style={styles.buttonText} onPress={this.sendData} >Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 20
  },
  signupTextCont: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 16,
    flexDirection: 'row',
    paddingBottom: 50
  },
  signupText: {
    color: '#000',
    fontSize: 16
  },
  signupButton: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold'
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
    width: 300,
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
})
