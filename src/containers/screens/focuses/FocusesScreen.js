import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../../../config/fbConfig';
import { setId } from '../../../actions/FocusActions';
import { UNCATEGORIZED } from '../../../constants/Categories';
import { addFocusHandler } from '../../../handlers/FocusesHandlers';
import { setCategoryShowHandler } from '../../../handlers/CategoryHandlers';
import createStyles from '../../../styles';

import LTIcon from '../../../components/LT/LTIcon';
import FocusList from '../../../components/focuses/FocusList';
import FocusAddModal from '../../../components/modals/FocusAddModal';

const styles = createStyles({
});

class FocusesScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      newFocusName: '',
      categoryName: UNCATEGORIZED,
      addModalShow: false,
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Focuses',
    headerRight: (
      <LTIcon
        type='ios-add'
        size={42}
        onPress={() => navigation.state.params.addModalToggle()}
      />
    ),
  });

  componentDidMount() {
    this.props.navigation.setParams({
      addModalToggle: this._onAddModalToggle,
    });
  };

  _onAddModalToggle = () => {
    this.setState({
      addModalShow: !this.state.addModalShow,
    });
  };

  _onAddConfirm = () => {
    const focus = {
      userId: auth.currentUser.uid,
      name: this.state.newFocusName,
      category: this.state.categoryName,
      level: 0,
      experience: 0.0,
      time: this.props.settings.workPeriod,
      workPeriod: this.props.settings.workPeriod,
      periods: 0,
      workGoal: this.props.settings.workGoal,
      breakPeriod: this.props.settings.breakPeriod,
      working: true,
      timerActive: false,
      timer: null,
    };

    this.props.addFocus(focus);

    this.setState({
      addModalShow: false,
      newFocusName: '',
      categoryName: this.state.categoryName,
    });
  };

  _onAddCancel = () => {
    this.setState({
      addModalShow: false,
      newFocusName: '',
      categoryName: UNCATEGORIZED,
    });
  };

  _onCategorySelect = categoryName => {
    this.props.setCategoryShow(
      categoryName, 
      !this.props.categories[categoryName].show
    );
  };

  _onFocusSelect = id => {
    this.props.setId(id);
    this.props.navigation.navigate('Focus');
  };

  _onCategoryValueChange = categoryName => {
    this.setState({
      categoryName,
    });
  };

  _getSectionData = () => {
    let categoryNames = Object.keys(this.props.categories);
    categoryNames.sort((a, b) => a.localeCompare(b));

    const sectionData = categoryNames.map(categoryName => {
      let data = [];
      const category = this.props.categories[categoryName];

      if (category.show) {
        for (const key in this.props.focuses) {
          if (this.props.focuses[key].category === categoryName) {
            data.push({
              id: key,
              ...this.props.focuses[key],
            });
          }
        }

        data.sort((a, b) => a.name.localeCompare(b.name));
      }

      return {
        title: categoryName,
        show: category.show,
        data,
      };
    });

    return sectionData;
  };

  render() {
    return (
      <View style={styles.container}>
        <FocusList
          sections={this._getSectionData()}
          onCategorySelect={this._onCategorySelect}
          onFocusSelect={this._onFocusSelect}
        />

        <FocusAddModal
          categories={this.props.categories}
          show={this.state.addModalShow}
          categoryName={this.state.categoryName}
          newFocusName={this.state.newFocusName}
          onConfirm={this._onAddConfirm}
          onCancel={this._onAddCancel}
          onFocusNameChange={text => this.setState({newFocusName: text})}
          onCategoryValueChange={value => this._onCategoryValueChange(value)}
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
  focus: state.focus,
  focuses: state.focuses,
  categories: state.categories,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setId: id => dispatch(setId(id)),
  addFocus: focus => addFocusHandler(dispatch, focus), 
  setCategoryShow: (name, show) => setCategoryShowHandler(dispatch, name, show),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusesScreen);