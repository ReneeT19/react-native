import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
// import { gray } from './colors'

export default function UdaciSteppers ({ max, unit, step, value, onIncrement, onDecrement }) {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={onDecrement}>
        <AntDesign name="minuscircle" size={24} color= "gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncrement}>
        <AntDesign name="pluscircle" size={24} color= "gray" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  )
}