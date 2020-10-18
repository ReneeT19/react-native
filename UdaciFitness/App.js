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
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { TabNavigator } from 'react-navigation'
import { purple, white, orange } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Constants from 'expo-constants'
import {createStackNavigator} from '@react-navigation/stack'
import EntryDetail from "./components/EntryDetail"


function UdaciStatusBar ({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

// Config for TabNav
const RouteConfigs = {
  History:{
    name: "History",
    component: History,
    options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'History'}
  }, 
  AddEntry:{
    component: AddEntry,
    name: "Add Entry",
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Entry'}
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
  };

const Tab = Platform.OS === 'ios'
        ? createBottomTabNavigator() 
        : createMaterialTopTabNavigator()

const TabNav = () =>(
  <Tab.Navigator {...TabNavigatorConfig}>
      <Tab.Screen {...RouteConfigs['History']} />
      <Tab.Screen {...RouteConfigs['AddEntry']} />
  </Tab.Navigator>
)

// Config for StackNav
const StackNavigatorConfig = {
  headerMode: "screen"
}
const StackConfig = {
  TabNav:{
    name: "Home",
    component: TabNav,
    options: {headerShown: false}
  }, 
  EntryDetail:{
    name: "EntryDetail",
    component: EntryDetail,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: purple
      },
      title: "Entry Detail"
    }
  }
}
const Stack = createStackNavigator();
const MainNav = () =>(
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['EntryDetail']} />
  </Stack.Navigator>
)

// App 
export default class App extends React.Component{
  render(){
    const store = createStore(reducer)
    return(
      <Provider store={store}>
        <View style={{flex:1}}>
        <UdaciStatusBar backgroundColor={"coral"} barStyle='light-content' />
          <NavigationContainer >
              <MainNav />
          </NavigationContainer>
        </View>
      </Provider>    
    )
  }
}
// export default class App extends React.Component {
//   render() {
//     return (
//       <Provider store={createStore(reducer)}>
//         <View style={{flex: 1}}>
//           <Tabs />
//         </View>
//       </Provider>
//     )
//   }
// }
