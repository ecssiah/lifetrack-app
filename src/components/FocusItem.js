import React from 'react';
import { 
  TouchableHighlight, TouchableOpacity, Text, View, ProgressViewIOS 
} from 'react-native';
import createStyles, { Colors } from '../styles'; 

const styles = createStyles({
  focusContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    marginVertical: 10,
  },
  focusItemLeft: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 20,
    color: Colors.text,
  },
  focusItemRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  focusLevel: {
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  focusProgress: {
    width: 80,
    marginTop: 1,
    transform: [
      { scaleX: 1.0 }, 
      { scaleY: 6.0 },
    ],
  },
});

class FocusItem extends React.Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.focusContainer}
        onPress={() => this.props.selectFocus(this.props.focus.id)}
      >
        <Text style={styles.focusItemLeft}>{this.props.focus.name}</Text>

        <View style={styles.focusItemRight} >
          <Text style={styles.focusLevel}>
            {this.props.focus.level}
          </Text>
          <ProgressViewIOS
            style={styles.focusProgress}
            progressTintColor={Colors.primary}
            progress={this.props.focus.experience / 100.0}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default FocusItem;