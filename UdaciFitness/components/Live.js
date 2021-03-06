import React, { Component } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white, lavender } from '../utils/colors'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { calculateDirection } from '../utils/helpers';

export default class Live extends Component {
    state = {
      coords: 0,
      status: 'granted',
      direction: '',
      bounceValue: new Animated.Value(1),
    }
    componentDidMount () {
      Permissions.getAsync(Permissions.LOCATION)
        .then(({ status }) => {
          if(status === 'granted') {
            return this.setLocation()
          }
  
          this.setState(() => ({ status }))
        })
          .catch((error) => {
            console.warn('Error getting Location permissoin')
  
            this.setState(() => ({ status: 'undetermined' }))
          })
    }
    askPermission = () => {
      Permissions.askAsync(Permissions.LOCATION)
        .then(({ status }) => {
          if( status === 'granted') {
            return this.setLocation()
          }
  
          this.setState(() => ({ status }))
        })
        .catch((error) => console.warn('error asking Location permissoin',error))
    }
    setLocation = () => {
      Location.watchPositionAsync({ //stupid me spelling watch as whatch lol
        enableHighAccuracy: true,
        timeInterval:1,
        distanceInterval: 1,
      }, ({ coords }) => {
        const newDirection = calculateDirection(coords.heading) // one more stupid me here put ,header
        const { direction, bounceValue  } = this.state
  
        if(newDirection !== direction){
          Animated.sequence([
                    Animated.timing(bounceValue, {duration: 200, toValue: 1.02, useNativeDriver: false}),
                    Animated.spring(bounceValue, {toValue: 1, friction:4})
                  ]).start()
        }
        this.setState(() => ({
          coords,
          status: 'granted',
          direction: newDirection,
        }))
      })
    }
    render() {
      const { status, coords, direction, bounceValue } = this.state
  
      if ( status === null ) {
        return  <ActivityIndicator style={{marginTop: 30}} />
      }
  
      if (status === 'denied') {
        return (
          <View style={styles.center}>
          <Foundation name='alert' size={100}/>
           <Text>You denied your location. You can fix this by enabling location services for this app from settings.</Text>
          </View>
          )
      }
  
  
      if (status === 'undetermined') {
        return (
          <View style={styles.center}>
          <Foundation name='alert' size={100}/>
            <Text>
            Please enable location services.
            </Text>
            <TouchableOpacity onPress={this.askPermission} style={styles.button}>
              <Text style={styles.buttonText}>
               Enable
              </Text>
            </TouchableOpacity>
          </View>
          )
          }
  
      return (
        <View style={styles.container}>
            <View style={styles.directionContainer}>
            <Text style={styles.header}>You're heading</Text>
            <Animated.Text style={[styles.direction,{transform: [{scale:bounceValue}]}]}>
              {direction}
            </Animated.Text>
          </View>
          <View style={styles.metricContainer}>
            <View style={styles.metric}>
              <Text style={[styles.header, {color: white}]}>
                Altitude
              </Text>
              <Text style={[styles.subHeader, {color: white}]}>
                {Math.round(coords.altitude * 3.2808)} Feet
              </Text>
            </View>
            <View style={styles.metric}>
              <Text style={[styles.header, {color: white}]}>
                Speed
              </Text>
              <Text style={[styles.subHeader, {color: white}]}>
                {(coords.speed * 2.2).toFixed(1)} MPH
              </Text>
            </View>
          </View>
        </View>
        )
    }
  };
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30,
      marginRight: 30,
    },
    button: {
      padding: 10,
      backgroundColor: lavender,
      alignSelf: 'center',
      borderRadius: 5,
      margin: 20,
    },
    buttonText: {
      color: "lightgrey",
      fontSize: 20,
    },
    directionContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      fontSize: 35,
      textAlign: 'center',
    },
    direction: {
      color: "coral",
      fontSize: 120,
      textAlign: 'center',
    },
    metricContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: lavender,
    },
    metric: {
      flex: 1,
      paddingTop: 15,
      paddingBottom: 15,
      backgroundColor: 'lightblue',
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 10,
      marginRight: 10,
    },
    subHeader: {
      fontSize: 25,
      textAlign: 'center',
      marginTop: 5,
    },
  })