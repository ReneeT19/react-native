import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue
} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
// import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import {white, purple, gray, lightPurp, aquamarine} from '../utils/colors'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity style={
      Platform.OS === "ios" ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
    }>
      <Text style={styles.submitBtnText}
      onPress={onPress}>
      SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0, 
    eat: 0,
  }
  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState((state) => {
      const count = state[metric] + step

      return {
        ...state,
        [metric]: count > max ? max : count,
      }
    })
  }
  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step

      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      }
    })
  }
  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }
  submit = () => {
    const key = timeToString()
    const entry = [this.state]

    // Update Redux
    this.props.dispatch(addEntry({
      [key]: entry
    }))

    this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }))

    // Navigate to home
    submitEntry({ key, entry })

    // Save to "DB"

    // Clear local notification
  };
  reset = () => {
    const key = timeToString();

    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))

    // route to home
    removeEntry(key)
  }

  render() {
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View  style={styles.center}>
          <Ionicons name={Platform.OS === "ios" ? "ios-happy" : "md-happy"} size={100} />
          <Text style={{fontSize: 11}}>You already logged your information for today.</Text>
          <TextButton style={{ padding: 10 }} onPress={this.reset}>Reset</TextButton>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {/* <DateHeader date={(new Date()).toLocaleDateString()}/> */}
        {/* testing purpose <Text>{JSON.stringify(this.state)}</Text>   */}
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <UdaciSteppers
                    value={value}
                    onIncrement={() => this.increment(key)}
                    onDecrement={() => this.decrement(key)}
                    {...rest}
                  />}
            </View>
          )
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "lightseagreen"
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  iosSubmitBtn: {
    backgroundColor: aquamarine,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: aquamarine,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: gray,
    fontSize: 22,
    textAlign: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 30,
    // marginRight: 30,
    backgroundColor: "azure",
  }
});

function mapStateToProps (state) {
  const key = timeToString()
  if (typeof state !== 'undefined') {
  return {
  alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
  }
  return {}
  }

export default connect(
  mapStateToProps
)(AddEntry)