import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import 'react-native-gesture-handler';
import Constants from 'expo-constants';
import Home from './Home.js';

//Amplify
import {Amplify, Auth} from 'aws-amplify';
import config from './aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';

//Firebase
import * as firebase from 'firebase';
import 'firebase/firestore';


Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const firebaseConfig = {
  apiKey: "AIzaSyBNzkelvPU6hby0NX0ZMGpVaQGHe6LmdlE",
  databaseURL: "https://flex-b42de.firebaseio.com",
  projectId: "flex-b42de",
  storageBucket: "flex-b42de.appspot.com",
};

firebase.initializeApp(firebaseConfig);
const myfb = firebase.firestore();

function App() {
    return (
            <View style={styles.screen}>
              <Header
                backgroundColor='#FFFFFF'
                outerContainerStyles={styles.header}
                containerStyles={styles.shadow}
                centerComponent={{ text: 'FLEX DASHBOARD', style: {fontSize:20, color: '#6200ee', fontWeight:'bold'}}}
              />
              <Home fb={myfb} />
            </View>
            
    );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    overflow:'hidden',
  }, 
  header: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    height:100,
  },
  shadow: {
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: '#A9A9A9',
    shadowOpacity: 1.0,
    shadowRadius:10,
    borderRadius:10,
  }
});

