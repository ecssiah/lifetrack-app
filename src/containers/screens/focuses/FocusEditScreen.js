import React from 'react'
import { connect } from 'react-redux'
import { Alert, View } from 'react-native'
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
} from '../../../constants/Focuses'
import { 
  updateFocus, updateFocusDB,
  deleteFocus, deleteFocusDB, 
} from '../../../handlers/FocusesHandlers'
import createStyles from '../../../styles'

import LTIcon from '../../../components/LT/LTIcon'
import CategoryModal from '../../../components/modals/CategoryModal'
import SettingsModal from '../../../components/modals/SettingsModal'
import FocusEditList from '../../../components/focuses/FocusEditList'

const styles = createStyles({
  container: {
    flex: 1,
  },
})

class FocusEditScreen extends React.Component 
{
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Focus',
    headerLeft: (
      <LTIcon
        type='ios-arrow-back'
        size={32}
        onPress={() => navigation.goBack()}
      />
    ),
  })


  constructor(props) {
    super(props)

    this.state = {
      nameInputStyle: styles.nameInputBlur,
      name: props.focuses[props.selection.id].name,
      categoryName: props.focuses[props.selection.id].category,
      settingName: '',
      settingValue: 1,
      categoryModalShow: false,
      settingsModalShow: false,
      deleteModalShow: false,
    }
  }


  _onEditNameChange = name => {
    this.setState({
      name,
    })
  }


  _onEditNameConfirm = () => {
    const update = { name: this.state.name }
    
    this.props.updateFocus(this.props.selection.id, update)
    this.props.updateFocusDB(this.props.selection.id, update)
  }


  _onEditNameFocus = () => {
    this.setState({
      nameInputStyle: styles.nameInputFocus,
    })
  }


  _onEditNameBlur = () => {
    this.setState({
      nameInputStyle: styles.nameInputBlur,
    })
  }


  _onSettingSelect = settingName => {
    let settingValue
    const focus = this.props.focuses[this.props.selection.id]

    switch (settingName) {
      case WORK_PERIOD: {
        settingValue = focus.workPeriod.toString()
        break
      }
      case BREAK_PERIOD: {
        settingValue = focus.breakPeriod.toString()
        break
      }
      case WORK_GOAL: {
        settingValue = focus.workGoal.toString()
        break
      }
      default: {
        console.error('Invalid setting: ' + settingName)
      }
    }

    this.setState({
      settingName,
      settingValue,
      settingsModalShow: true,
    })
  }


  _onSettingValueChange = settingValue => {
    this.setState({
      settingValue,
    })
  }


  _onSettingConfirm = () => {
    const update = {}

    switch (this.state.settingName) {
      case WORK_PERIOD: {
        update.workPeriod = parseInt(this.state.settingValue)

        if (this.props.focuses[this.props.selection.id].working) {
          update.time = 60 * update.workPeriod
        }

        break
      }
      case BREAK_PERIOD: {
        update.breakPeriod = parseInt(this.state.settingValue)
        break
      }
      case WORK_GOAL: {
        update.workGoal = parseInt(this.state.settingValue)
        break
      }
      default: {
        console.error('Invalid setting: ' + this.state.settingValue)
      }
    }

    this.props.updateFocus(this.props.selection.id, update)
    this.props.updateFocusDB(this.props.selection.id, update)

    this.setState({
      settingsModalShow: false,
    })
  }


  _onSettingCancel = () => {
    this.setState({
      settingsModalShow: false,
    })
  }


  _onCategorySelect = () => {
    this.setState({
      categoryModalShow: true, 
    })
  }


  _onCategoryValueChange = categoryName => {
    this.setState({
      categoryName,
    })
  }


  _onCategoryConfirm = () => {
    const update = { category: this.state.categoryName }

    this.props.updateFocus(this.props.selection.id, update)
    this.props.updateFocusDB(this.props.selection.id, update)

    this.setState({
      categoryName: this.state.categoryName,
      categoryModalShow: false,
    })
  }


  _onCategoryCancel = () => {
    this.setState({
      categoryName: this.props.focuses[this.props.selection.id].category,
      categoryModalShow: false,
    })
  }


  _onDeleteSelect = () => {
    const focusName = this.props.focuses[this.props.selection.id].name

    Alert.alert(
      'Are you sure you want to delete ' + focusName + '?',
      '',
      [
        { text: 'Cancel', onPress: null },
        { text: 'Confirm', onPress: this._onDeleteConfirm },
      ],
    )
  }


  _onDeleteConfirm = async () => {
    clearInterval(this.props.focuses[this.props.selection.id].timer)

    this.props.deleteFocus(this.props.selection.id)
    await this.props.deleteFocusDB(this.props.selection.id)

    this.props.navigation.navigate('Focuses')
  }


  _onDeleteCancel = () => {
    this.setState({
      deleteModalShow: false,
    })
  }


  render() {
    const focus = this.props.focuses[this.props.selection.id]

    if (!focus) return null

    return (
      <View style={styles.container}>
        <FocusEditList
          name={this.state.name}
          focus={this.props.focuses[this.props.selection.id]}
          onEditNameChange={this._onEditNameChange}
          onEditNameConfirm={this._onEditNameConfirm}
          onSettingSelect={this._onSettingSelect} 
          onCategorySelect={this._onCategorySelect}
          onDeleteSelect={this._onDeleteSelect}
        />

        <CategoryModal
          categories={this.props.categories}
          show={this.state.categoryModalShow}
          categoryName={this.state.categoryName}
          onConfirm={this._onCategoryConfirm}
          onCancel={this._onCategoryCancel}
          onCategoryValueChange={value => this._onCategoryValueChange(value)} 
        />

        <SettingsModal
          show={this.state.settingsModalShow}
          settingName={this.state.settingName}
          settingValue={this.state.settingValue}
          onConfirm={this._onSettingConfirm}
          onCancel={this._onSettingCancel}
          onSettingValueChange={value => this._onSettingValueChange(value)}
        />
      </View>
    )
  }
}


const mapStateToProps = state => ({
  selection: state.selection,
  focuses: state.focuses,
  categories: state.categories,
})


const mapDispatchToProps = dispatch => ({
  updateFocus: (id, update) => updateFocus(dispatch, id, update),
  updateFocusDB: (id, update) => updateFocusDB(id, update),
  deleteFocus: id => deleteFocus(dispatch, id),
  deleteFocusDB: id => deleteFocusDB(id),
})


export default connect(mapStateToProps, mapDispatchToProps)(FocusEditScreen)