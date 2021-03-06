import React from 'react'
import { TextInput } from 'react-native'
import createStyles, { Color, FontSize, Font } from '../../styles'

const styles = createStyles({
  focus: {
    fontFamily: Font.primary,
    fontSize: FontSize.modalTitle, 
    color: 'black',
    borderWidth: 3,
    borderRadius: 6,
    borderColor: Color.working,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 14,
    margin: 10,
  },
  blur: {
    fontFamily: Font.primary,
    fontSize: FontSize.modalTitle, 
    color: 'black',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 14,
    margin: 12,
  },
})

class LTEdit extends React.Component 
{
  static defaultProps = {
    placeholder: '',
  }


  constructor(props) {
    super(props)

    this.state = {
      style: styles.blur,
    }
  }


  _onFocus = () => {
    this.setState({style: styles.focus})
  }


  _onBlur = () => {
    this.setState({style: styles.blur})
  }


  render() {
    return (
      <TextInput
        style={[this.state.style, this.props.style]}
        value={this.props.text}
        placeholder={this.props.placeholder}
        textAlign='center'
        maxLength={24}
        returnKeyType='done'
        keyboardAppearance='dark'
        selectionColor={Color.primary}
        onBlur={this._onBlur}
        onFocus={this._onFocus}
        onChangeText={this.props.onChangeText}
        onSubmitEditing={this.props.onSubmitEditing}
      />
    )
  }
}


export default LTEdit