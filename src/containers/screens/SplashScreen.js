import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { auth } from '../../config/firebaseConfig'
import { loadUserLocal } from '../../handlers/DataHandlers';
import createStyles, { Color, FontSize } from '../../styles'


const styles = createStyles({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  title: {
    fontSize: FontSize.splashTitle,
    color: '#dddddd',
    textShadowColor: '#111111',
    textShadowRadius: 1,
    textShadowOffset: { width: -3, height: 2, },
  },
})


class SplashScreen extends React.Component 
{
  componentDidMount() {
    auth.onAuthStateChanged(async user => {
      if (user) {
        this.props.navigation.navigate('App')
      } else {
        this.props.navigation.navigate('Auth')
      }
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LifeTrack</Text>
      </View>
    )
  }
}


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
  loadUserLocal: () => loadUserLocal(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)