import React from 'react';
import {View, Text, Modal, Button} from 'react-native';

export default function Confirm({children, visible, onAccept, onDecline}) {
  console.log('running');
  console.log(visible);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}>
        <View
          style={{
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <View>
            <Text>{children}</Text>
          </View>
          <View>
            <Button title="YES" onPress={onAccept}></Button>
            <Button title="NO" onPress={onDecline}></Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
