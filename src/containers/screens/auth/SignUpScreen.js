import React from 'react'
import { connect } from 'react-redux'
import { signUp } from '../../../handlers/AuthHandlers'
import { Alert, Button, View, TextInput } from 'react-native'
import createStyles, { FontSize } from '../../../styles'

import LTSpacer from '../../../components/LT/LTSpacer';

const styles = createStyles({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  emailInput: {
    width: '86%', 
    height: 40, 
    fontSize: FontSize.modalInput,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'gray', 
    marginTop: 14,
  },
  passwordInput: {
    width: '86%', 
    height: 40, 
    fontSize: FontSize.modalInput,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'gray', 
    marginTop: 14,
  },
  confirmInput: {
    width: '86%', 
    height: 40, 
    fontSize: FontSize.modalInput,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'gray', 
    marginTop: 14,
  },
})

class SignUpScreen extends React.Component 
{
  static navigationOptions = ({ navigation }) => ({
    title: 'Register',
  })


  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirm: '',
    }
  }


  _onPressSignUp = async () => {
    if (this.state.password === this.state.confirm) {
      try {
        await this.props.signUp(this.state.email, this.state.password)

        this.props.navigation.navigate('App')
      } catch (error) {
        Alert.alert(
          error.message,
          '',
          [
            { text: 'Confirm', onPress: null },
          ],
        )
      }
    } else {
      Alert.alert(
        'Password confirmation \ndoes not match.',
        '',
        [
          { text: 'Confirm', onPress: null },
        ],
      )
    }

    this.setState({
      password: '',
      confirm: '',
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.emailInput}
          value={this.state.email}
          placeholder='email'
          textAlign='center'
          autoCapitalize='none'
          keyboardType='email-address'
          keyboardAppearance='dark'
          onChangeText={email => this.setState({email})}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.passwordInput}
          value={this.state.password}
          placeholder='password'
          textAlign='center'
          autoCapitalize='none'
          keyboardAppearance='dark'
          onChangeText={password => this.setState({password})}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.confirmInput}
          value={this.state.confirm}
          placeholder='confirm password'
          textAlign='center'
          autoCapitalize='none'
          keyboardAppearance='dark'
          onChangeText={confirm => this.setState({confirm})}
        />

        <LTSpacer />

        <Button
          onPress={this._onPressSignUp}
          title='Confirm Registration'
          color="#841584"
        />
      </View>
    )
  }
}


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
  signUp: (email, password) => signUp(dispatch, email, password),
})


export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)