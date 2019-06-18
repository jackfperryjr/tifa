import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Platform, Alert, Keyboard } from 'react-native'

export default class SignupScreen extends Component {
  goBack () {
  }
  sendData = async()=> {
    const {username, password} = this.state;
    const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000/users/' : 'http://localhost:5000/users/';

      let response = await fetch(baseUrl + 'register', {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username: username, password: password })
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

      if (response.status >= 200 && response.status < 300) {
          Keyboard.dismiss();
          Alert.alert("Registered!",
              "Now you can login.",
              [
              {text: 'Go!'},
              ],
              {cancelable: true}
          )
          Actions.login();
      } else {
          Alert.alert("Unable to register!",
              "Check your cellular or wifi connection.",
              [
              {text: 'Got it!'},
              ],
              {cancelable: true}
          )
      }  
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
                <Text style={styles.buttonText} onPress={this.sendData} >Signup</Text>
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
