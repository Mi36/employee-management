import React, {Component} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {connect} from 'react-redux';
import {
  employeeUpdate,
  employeeCreate,
  employeeSave,
  employeeDelete,
} from '../actions';
import {Picker} from '@react-native-community/picker';
import _ from 'lodash';
import Communications from 'react-native-communications';
import Confirm from './common/Confirm';

export class EmployeeEdit extends Component {
  state = {showModal: false};
  componentDidMount() {
    _.each(this.props.route.params.item, (value, prop) => {
      this.props.employeeUpdate({prop, value});
    });
  }

  onAccept() {
    const {uid} = this.props.route.params.item;
    //pass as object and also make sure receive as objects
    this.props.employeeDelete({uid});
  }
  onDecline() {
    this.setState({showModal: false});
  }

  onTextPress() {
    const {phone, shift} = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onButtonPress() {
    const {name, phone, shift} = this.props;

    this.props.employeeSave({
      name,
      phone,
      shift: shift || 'MONDAY',
      uid: this.props.route.params.item.uid,
    });
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

        <Button title="UPDATE" onPress={this.onButtonPress.bind(this)}></Button>
        <Button title="MESSAGE" onPress={this.onTextPress.bind(this)}></Button>

        <Button
          title="FIRE EMPLOYEE"
          onPress={() =>
            this.setState({showModal: !this.state.showModal})
          }></Button>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}>
          Are yOu want to delete ?
        </Confirm>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {name, phone, shift} = state.employeeForm;
  return {name, phone, shift};
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeCreate,
  employeeSave,
  employeeDelete,
})(EmployeeEdit);
