import React from 'react'
import { TouchableOpacity } from 'react-native'
import createStyles, { FontSize, Color } from '../../styles'
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD 
} from '../../constants/Focuses'

import LTText from '../LT/LTText'
import LTEdit from '../LT/LTEdit'
import SettingItem from '../setting/SettingItem'
import SettingList from '../setting/SettingList'

const styles = createStyles({
  deleteText: {
    fontSize: FontSize.modalTitle,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.highlight,
    margin: 16,
  },
})

class FocusEditList extends React.Component
{
  _renderName = () => {
    return (
      <LTEdit
        text={this.props.name}
        onChangeText={this.props.onEditNameChange}
        onSubmitEditing={this.props.onEditNameConfirm}
      />
    )
  }

  _renderCategory = ({item}) => {
    return (
      <SettingItem 
        setting={item} 
        onSettingSelect={this.props.onCategorySelect} 
      />
    )
  }

  _renderDelete = ({item, index}) => {
    return (
      <TouchableOpacity 
        key={index} 
        activeOpacity={0.7}
        onPress={this.props.onDeleteSelect}
      >
        <LTText style={styles.deleteText}>
          {item.name}
        </LTText>
      </TouchableOpacity> 
    )
  }

  _getSections = () => {
    return [
      {
        title: '',
        data: [
          { name: '', value: this.props.focus.name },
        ],
        renderItem: this._renderName,
      },
      {
        title: '',
        data: [ 
          { name: 'Category', value: this.props.focus.category },
        ],
        renderItem: this._renderCategory,
      },
      {
        title: '',
        data: [ 
          { name: WORK_PERIOD, value: this.props.focus.workPeriod },
          { name: BREAK_PERIOD, value: this.props.focus.breakPeriod },
          { name: WORK_GOAL, value: this.props.focus.workGoal },
        ],
      },
      {
        title: '',
        data: [
          { name: 'Delete', value: '' },
        ],
        renderItem: this._renderDelete,
      },
      {
        title: '',
        data: [],
      },
    ]
  }

  render() {
    return (
      <SettingList
        sections={this._getSections()} 
        onSettingSelect={this.props.onSettingSelect}
      />
    )
  }
}

export default FocusEditList