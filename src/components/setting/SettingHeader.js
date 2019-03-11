import React from 'react';
import { 
  Text, View 
} from 'react-native';
import createStyles, { FontSize } from '../../styles'; 

const styles = createStyles({
  container: {
    backgroundColor: '#666666',
    borderTopWidth: 1,
    borderTopColor: '#777777',
    borderBottomWidth: 1,
    borderBottomColor: '#555555',
  },
  title: {
    color: 'white',
    fontSize: FontSize.sectionHeader,
    marginLeft: 4,
    marginVertical: 2,
  },
});

class SettingsHeader extends React.PureComponent 
{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.title}
        </Text>
      </View>
    );
  };
};

export default SettingsHeader;