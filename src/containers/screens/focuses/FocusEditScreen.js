import React from 'react';
import { connect } from 'react-redux';
import firebase from '../../../config/fbConfig';
import { Alert, View } from 'react-native';
import {
  addCategory,
} from '../../../actions/CategoriesActions';
import { 
  deleteFocus,
  setName, setCategory,
  setWorkPeriod, setWorkGoal, setBreakPeriod,
} from '../../../actions/FocusesActions';
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
} from '../../../constants/Focus';
import createStyles from '../../../styles';

import LTIcon from '../../../components/LT/LTIcon';
import CategoryModal from '../../../components/modals/CategoryModal';
import SettingsModal from '../../../components/modals/SettingsModal';
import DeleteFocusModal from '../../../components/modals/DeleteFocusModal';
import FocusEditList from '../../../components/focuses/FocusEditList';

const styles = createStyles();

class FocusEditScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      name: props.focuses[props.focus.id].name,
      nameInputStyle: styles.nameInputBlur,
      categoryName: props.focuses[props.focus.id].category,
      newCategoryName: '',
      settingName: '',
      settingValue: 1,
      categoryModalShow: false,
      settingsModalShow: false,
      deleteModalShow: false,
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Focus',
    headerLeft: (
      <LTIcon
        type='ios-arrow-back'
        size={32}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  _onEditNameChange = name => {
    this.setState({
      name,
    });
  };

  _onEditNameConfirm = () => {
    this.props.setName(this.props.focus.id, this.state.name);
  };

  _onEditNameFocus = () => {
    this.setState({
      nameInputStyle: styles.nameInputFocus,
    });
  };

  _onEditNameBlur = () => {
    this.setState({
      nameInputStyle: styles.nameInputBlur,
    });
  };

  _onSettingSelect = settingName => {
    let settingValue;
    const focus = this.props.focuses[this.props.focus.id];

    switch (settingName) {
      case WORK_PERIOD: {
        settingValue = focus.workPeriod.toString();
        break;
      }
      case WORK_GOAL: {
        settingValue = focus.workGoal.toString();
        break;
      }
      case BREAK_PERIOD: {
        settingValue = focus.breakPeriod.toString();
        break;
      }
      default: {
        console.error('invalid setting: ' + settingName);
      }
    }

    this.setState({
      settingName,
      settingValue,
      settingsModalShow: true,
    });
  };

  _onSettingValueChange = settingValue => {
    this.setState({
      settingValue,
    });
  };

  _onSettingConfirm = () => {
    switch (this.state.settingName) {
      case WORK_PERIOD: {
        this.props.setWorkPeriod(
          this.props.focus.id, parseInt(this.state.settingValue)
        );
        break;
      }
      case WORK_GOAL: {
        this.props.setWorkGoal(
          this.props.focus.id, parseInt(this.state.settingValue)
        );
        break;
      }
      case BREAK_PERIOD: {
        this.props.setBreakPeriod(
          this.props.focus.id, parseInt(this.state.settingValue)
        );
        break;
      }
      default: {
        console.error('invalid focus attribute');
      }
    }

    this.setState({
      settingsModalShow: false,
    });
  };

  _onSettingCancel = () => {
    this.setState({
      settingsModalShow: false,
    });
  };

  _onCategorySelect = () => {
    this.setState({
      newCategoryName: '',
      categoryModalShow: true, 
    });
  };

  _onCategoryValueChange = categoryName => {
    this.setState({
      categoryName,
    });
  };

  _onCategoryConfirm = () => {
    let categoryName;

    if (this.state.newCategoryName === '') {
      categoryName = this.state.categoryName;
    } else {
      categoryName = this.state.newCategoryName;

      const category = {
        show: true,
      };

      db.collection('categories').doc(auth.currentUser.uid).update({
        categoryName: category,
      });

      this.props.addCategory(category);
    }

    this.props.setCategory(this.props.focus.id, categoryName);

    this.setState({
      categoryName,
      categoryModalShow: false,
    });
  };

  _onCategoryCancel = () => {
    this.setState({
      categoryName: this.props.focuses[this.props.focus.id].category,
      categoryModalShow: false,
    });
  };

  _onDeleteSelect = () => {
    const focusName = this.props.focuses[this.props.focus.id].name;

    Alert.alert(
      'Are you sure you want to delete ' + focusName + '?',
      '',
      [
        { text: 'Cancel', onPress: null, },
        { text: 'Confirm', onPress: this._handleFocusDelete, },
      ],
    );
  };

  _handleFocusDelete = () => {
    db.collection('focuses').doc(this.props.focus.id).delete().then(() => {
      this.props.deleteFocus(this.props.focus.id);
      this.props.navigation.navigate('Focuses');
    }).catch(err => {
      console.error(err);
    }); 
  };

  _onDeleteConfirm = () => {
    db.collection('focuses').doc(this.props.focus.id).delete().then(() => {
      this.props.deleteFocus(this.props.focus.id);
      this.props.navigation.navigate('Focuses');
    }).catch(err => {
      console.error(err);
    }); 

    this.setState({
      deleteModalShow: false,
    });
  };

  _onDeleteCancel = () => {
    this.setState({
      deleteModalShow: false,
    });
  };

  render() {
    const focus = this.props.focuses[this.props.focus.id];

    if (!focus) return null;

    return (
      <View style={styles.container}>
        <FocusEditList
          name={this.state.name}
          focus={this.props.focuses[this.props.focus.id]}
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
          newCategoryName={this.state.newCategoryName}
          onConfirm={this._onCategoryConfirm}
          onCancel={this._onCategoryCancel}
          onCategoryTextChange={text => this.setState({newCategoryName: text})}
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

        <DeleteFocusModal
          show={this.state.deleteModalShow}
          onConfirm={this._onDeleteConfirm}
          onCancel={this._onDeleteCancel}
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
  categories: state.categories,
  focus: state.focus,
  focuses: state.focuses,
});

const mapDispatchToProps = dispatch => ({
  addCategory: category => dispatch(addCategory(category)),
  deleteFocus: id => dispatch(deleteFocus(id)),
  setName: (id, name) => dispatch(setName(id, name)),
  setCategory: (id, category) => dispatch(setCategory(id, category)),
  setWorkPeriod: (id, period) => dispatch(setWorkPeriod(id, period)),
  setWorkGoal: (id, goal) => dispatch(setWorkGoal(id, goal)),
  setBreakPeriod: (id, period) => dispatch(setBreakPeriod(id, period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusEditScreen);