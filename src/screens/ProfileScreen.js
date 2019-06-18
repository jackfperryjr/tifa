import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, StatusBar, Image, Text, TouchableOpacity, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default class ProfileScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      age: '',
      dog: '',
      picture: ''
    }
  }
  componentWillMount () {
    AsyncStorage.getItem('username')
      .then((username) => {
        this.setState({ username })
      })
    AsyncStorage.getItem('password')
      .then((password) => {
        this.setState({ password })
      })
    AsyncStorage.getItem('firstname')
      .then((firstname) => {
        this.setState({ firstname })
      })
    AsyncStorage.getItem('lastname')
      .then((lastname) => {
        this.setState({ lastname })
      })
    AsyncStorage.getItem('age')
      .then((age) => {
        this.setState({ age })
      })
    AsyncStorage.getItem('dog')
      .then((dog) => {
        this.setState({ dog })
      })
  }
  componentDidMount () {
    //this.getRandomPicture()
  }
  getRandomPicture () {
    let that = this
    fetch('https://randomuser.me/api/?gender=female')
    .then(function(response){ 
        return response.json();   
    })
    .then(function(data){ 
        that.state.picture = data.results[0].picture.medium
        AsyncStorage.setItem('picture', that.state.picture);
    })
  }
  edit () {
  }
  render () {
    AsyncStorage.getItem('picture')
      .then((picture) => {
        this.setState({ picture })
      })
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#000'
          barStyle='light-content'
        />
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            {/* <Image style={{ width: 220, height: 220 }} source={{ uri: this.state.picture }} /> */}
            <Image style={{ width: 220, height: 220 }} source={require('../images/icon-user.png')} />
          </View>
          <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
            <Text style={styles.profileText}>Username: {this.state.username}</Text>
            <Text style={styles.profileText}>Name: {this.state.firstname} {this.state.lastname}</Text>
            <Text style={styles.profileText}>Age: {this.state.age}</Text>
            <Text style={styles.profileText}>Dog: {this.state.dog}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText} onPress={this.edit} >Edit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
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
  },
  profileText: {
    fontSize: 20,
    color: '#000'
  }
})
