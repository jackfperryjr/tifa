import React, { Component } from 'react'
import { StyleSheet, View, Text, Alert, Image } from 'react-native'
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import AsyncStorage from '@react-native-community/async-storage'

export default class SwipeScreen extends Component {
  constructor (props) {
    super(props)
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
  componentWillMount () {
    AsyncStorage.getItem('picture')
    .then((picture) => {
        this.setState({ picture })
    })
  }
  componentDidMount () {
    fetch('https://randomuser.me/api/')
    .then(function(response){ 
        return response.json();   
    })
    .then(function(data){ 
        this.state.picture = data.results[0].picture.medium
        AsyncStorage.setItem('picture', this.state.picture);
    })
  }
  fetchData () {
    fetch('https://randomuser.me/api/')
    .then(function(response){ 
        return response.json();   
    })
    .then(function(data){ 
        this.state.picture = data.results[0].picture.medium
        AsyncStorage.setItem('picture', this.state.picture);
    })
  }
  onSwipeLeft(gestureState) {
    console.log("Left swipe")
    this.fetchData()
  }
  onSwipeRight(gestureState) {
    console.log("Right swipe")
    this.fetchData()
  }
  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        break;
      case SWIPE_DOWN:
        break;
      case SWIPE_LEFT:
        break;
      case SWIPE_RIGHT:
        break;
    }
  }
  render () {
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
      }
    return (
      <View style={styles.container}>
          <View style={{ alignItems: 'center', backgroundColor: '#00bfa5', height: 35 }}>
          </View>
          <View style={{ alignItems: 'center'}}>
            <Text style={{ fontSize: 20 }}>SwipeScreen</Text>
          </View>
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeUp={(state) => this.onSwipeUp(state)}
            onSwipeDown={(state) => this.onSwipeDown(state)}
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}
            style={{
            flex: 1,
            backgroundColor: this.state.backgroundColor
            }}>
                <Image style={{ width: 220, height: 220 }} source={{ uri: this.state.picture }} />
            </GestureRecognizer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
