import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import { Agenda as UdaciFitnessCalendar } from "react-native-calendars";
import MetricCard from './MetricCard'
import {AppLoading} from 'expo'

class History extends Component {
  // state = {ready: false}
  
  componentDidMount () {
    const { dispatch } = this.props

    fetchCalendarResults()
    
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({ entries }) => {
        if (!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()]: getDailyReminderValue()
          }))
        }
      })
      // .then(() => this.setState(() => ({ready: true})))
  }
  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {today ? (
        <View>
          <Text style={styles.noDataText}>{today}</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("EntryDetail", { entryId: formattedDate })
          }
        >
          <MetricCard metrics={metrics} />
        </TouchableOpacity>
      )}
    </View>
  )
  
  renderEmptyDate(formattedDate) {
    return (
      <View style={styles.item}>
        <Text style={styles.noDataText}>You didn't log any data on this day.</Text>
      </View>
    )
  }

  render() {
    // if (this.state.ready === false) {
    //   return <AppLoading />
    // }
  
    const { entries } = this.props

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    )
  }
}

const styles = StyleSheet.create({

  item: {
    backgroundColor: 'lavender',
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
    marginLeft: 7,
    marginRight: 25,
    marginTop: 20,
    justifyContent: 'center',
    shadowRadius: 5,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  },
  noDataText: {
    fontSize: 18,
    paddingTop: 15,
    paddingBottom: 15,
  }
})


  // const mapStateToProps = entries => ({ entries })
  // const actions = { receiveEntries, addEntry }
  // export default connect(mapStateToProps, actions)(History)

function mapStateToProps(entries){
    
  return{
      entries
  }
}
export default connect(mapStateToProps)(History)