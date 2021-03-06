import React, {Component} from 'react';
import {Text, View, Button, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {employeeFetch} from '../actions';
import _ from 'lodash';

export class EmployeeeList extends Component {
  componentDidMount() {
    this.props.employeeFetch();
    // console.log(this.props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.employees.length !== this.props.employees.length) {
      this.props.employeeFetch();
    }
  }

  renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('Employee edit', {item: item})
        }>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.props.employees}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(employee, index) => index.toString()}
        />
        <Button
          title="Go to create"
          onPress={() => this.props.navigation.navigate('Employee create')}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const employees = _.map(state.employees, (val, uid) => {
    return {
      ...val,
      uid,
    };
  });
  return {employees};
};

export default connect(mapStateToProps, {employeeFetch})(EmployeeeList);
