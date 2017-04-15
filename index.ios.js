/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
"use strict";

var RandManager = require('./RandManager.js');
var Swiper = require('react-native-swiper');
var NetworkImage = require('react-native-image-progress');
var Progress = require('react-native-progress');
var {width, height} = React.Dimensions.get('window');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'

import ActivityIndicatorIOS from 'react-native'

const NUM_WALLPAPERS = 5;


export default class ReactNativePlayground extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      wallsJson: [],
    }
  }
  
  render() {
    var {isLoading} = this.state
    if (isLoading) {
      console.log("isLoading=true")
      return this.renderLoadingMessage()
    } else {
      console.log("isLoading=true")
      return this.renderResults() 
    }
  }
  
  renderLoadingMessage() {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{color: 'white'}}>Fetching images...</Text>
      </View>
    )
  }

  renderResults() {
    var {wallsJson, isLoading} = this.state;
    if (!isLoading) {
      return (
        <Swiper 
          dot={<View style={{backgroundColor: 'rgba(0,0,0,.4)', width: 8, height: 8, borderRadius: 10, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}}/>} 
          activeDot={<View style={{backgroundColor: '#000', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />} 
          loop={false} 
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          >
          {wallsJson.map((wallpapaer, index) => {
            return (
              <Text key={index}>
                {wallpapaer.author}
              </Text>
            );
          })}
        </Swiper>
      );
    }
  }
  
  fetchWallsJson() {
    var url = 'https://unsplash.it/list';
    fetch(url)
      .then( response => response.json() )
      .then( jsonData => {
        var randomIds = RandManager.uniqueRandomNumbers(NUM_WALLPAPERS, 0, jsonData.length);
        var walls = [];
        randomIds.forEach(randomId => {
          walls.push(jsonData[randomId]);
        });
      
        this.setState({
          isLoading: false,
          wallsJson: [].concat(walls)
        });
      })
      .catch( error => console.log('Fetch error ' + error))
  }
  
  componentDidMount() {
    this.fetchWallsJson()
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  }
});

AppRegistry.registerComponent('ReactNativePlayground', () => ReactNativePlayground);
