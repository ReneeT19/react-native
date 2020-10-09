import React from 'react'
import { Text } from 'react-native'
import { aquamarine } from '../utils/colors'

export default function DateHeader ({ date }) {
  return (
    <Text style={{color: aquamarine, fontSize: 20}}>
      {date}
    </Text>
  )
}