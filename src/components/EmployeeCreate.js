import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {connect} from 'react-redux';
import {employeeUpdate, employeeCreate} from '../actions';
import {Picker} from '@react-native-community/picker';

export class EmployeeCreate extends Component {
  onButtonPress() {
    const {name, phone, shift} = this.props;
    this.props.employeeCreate({name, phone, shift: shift || 'MONDAY'});
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Name"
          style={{borderColor: 'red', borderWidth: 2, marginVertical: 2}}
          autoCapitalize="none"
          value={this.props.name}
          onChangeText={(text) =>
            this.props.employeeUpdate({prop: 'name', value: text})
          }
        />
        <TextInput
          placeholder="Phone"
          style={{borderColor: 'red', borderWidth: 2, marginVertical: 2}}
          autoCapitalize="none"
          value={this.props.phone}
          onChangeText={(text) =>
            this.props.employeeUpdate({prop: 'phone', value: text})
          }
        />
        <Text> SHIFT</Text>

        <Picker
          selectedValue={this.props.shift}
          // style={{height: 50, width: 100}}
          onValueChange={(day) =>
            this.props.employeeUpdate({prop: 'shift', value: day})
          }>
          <Picker.Item label="MONDAY" value="MONDAY" />
          <Picker.Item label="TUESDAY" value="TUESDAY" />
          <Picker.Item label="WEDNESDAY" value="WEDNESDAY" />
          <Picker.Item label="THURSDAY" value="THURSDAY" />
          <Picker.Item label="FRIDAY" value="FRIDAY" />
          <Picker.Item label="SATARDAY" value="SATARDAY" />
          <Picker.Item label="SUNDAY" value="SUNDAY" />
        </Picker>

        <Button title="SAVE" onPress={this.onButtonPress.bind(this)}></Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {name, phone, shift} = state.employeeForm;
  return {name, phone, shift};
};

export default connect(mapStateToProps, {employeeUpdate, employeeCreate})(
  EmployeeCreate,
);
