import React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import styles from './style';
import { auth } from '../../config';

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onPressSignIn = () => {
    auth.signInWithEmailAndPassword(
      this.state.email, this.state.password
    ).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.warn("error " + errorCode + ": " + errorMessage);
    });

    this.setState({
      password: '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.section} >
          Email
        </Text>

        <TextInput
          style={{height: 40, width: 240, borderColor: 'gray', borderWidth: 1}}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />

        <Text style={styles.section} >
          Password
        </Text>

        <TextInput
          secureTextEntry={true}
          style={{height: 40, width: 240, borderColor: 'gray', borderWidth: 1}}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />

        <Button
          onPress={this.onPressSignIn}
          title="SignIn"
          color="#841584"
        />

        <Button
          onPress={ () => this.props.navigation.navigate('SignUp') }
          title="SignUp"
          color="#841584"
        />
      </View>
    );
  }
}

export default SignInScreen;