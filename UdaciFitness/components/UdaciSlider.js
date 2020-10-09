import React from 'react'
import { View, Slider, StyleSheet, Text } from 'react-native'
import { gray,white } from '../utils/colors'

export default function UdaciSlider ({ max, unit, step, value, onChange }) {
  return (
    <View style={styles.row}>
      <Slider
        style={{flex: 1}}
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center', color: white}}>{value}</Text>
        <Text style={{fontSize: 18, color: "lightgray"}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  metricCounter: {
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: -5,
  },
})