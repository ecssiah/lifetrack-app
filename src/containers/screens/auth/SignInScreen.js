import React from 'react';
import { connect } from 'react-redux';
import { Button, View, TextInput } from 'react-native';
import createStyles, { FontSize } from '../../../styles';
import { signInHandler } from '../../../handlers/AuthHandlers';

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
});

class SignInScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Sign In',
  });

  _onPressSignIn = () => {
    this.props.signIn({
      email: this.state.email, 
      password: this.state.password,
    });

    this.setState({
      password: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.emailInput}
          value={this.state.email}
          placeholder={'email'}
          textAlign='center'
          autoCapitalize='none'
          keyboardType='email-address'
          keyboardAppearance='dark'
          onChangeText={email => this.setState({email})}
        />

        <TextInput
          style={styles.passwordInput}
          value={this.state.password}
          placeholder={'password'}
          secureTextEntry={true}
          textAlign='center'
          autoCapitalize='none'
          keyboardAppearance='dark'
          onChangeText={password => this.setState({password})}
        />

        <Button
          title="Sign In"
          color="#841584"
          onPress={this._onPressSignIn}
        />

        <Button
          title="Sign Up"
          color="#841584"
          onPress={ () => this.props.navigation.navigate('SignUp') }
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => signInHandler(dispatch, email, password),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);