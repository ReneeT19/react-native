// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// export default class App extends React.Component {
//   // componentDidMount() {
//   //   console.log('Before')
//   //   debugger
//   //   console.log('After')
//   // }
//   render() {
//     return (
//       <View style={styles.container}>
//         {/* <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text> */}
//         <FontAwesome5 name="baby-carriage" size={100} color="grey" />
//         <MaterialCommunityIcons name="baby-face-outline" size={200} color="orange" />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react'
import { View } from 'react-native'
import AddEntry from './components/AddEntry'

export default class App extends React.Component {
  render() {
    return (
      <View>
        <AddEntry />
      </View>
    )
  }
}
