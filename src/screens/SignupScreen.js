import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class SignupScreen extends Component {
  goBack () {
    Actions.pop()
  }
  sendData = async()=> {
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
        <View style={styles.container}>
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
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account? </Text>
          <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}>Login</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
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
  }
})
