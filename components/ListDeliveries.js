import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {auth, store} from "../firebase";
import DeliveryItem from "./DeliveryItem";

export default class ListDeliveries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deliveries: []
    };

    store.collection('users').doc(auth.currentUser.uid).onSnapshot(snapshot => {
      this.setState({deliveries: snapshot.data().deliveries});
    });
  }

  render() {
    const {deliveries} = this.state;

    const deliveriesHTML = deliveries.map((item) => {
      return (
          <View style={listDeliveriesStyles.delivery} key={item}>
            <DeliveryItem id={item}/>
          </View>
      )
    })

    return (
        <View>
          <Text>Deliveries</Text>
          {deliveriesHTML}
        </View>
    );
  }
}

const listDeliveriesStyles = StyleSheet.create({
  delivery: {
    marginTop: 15,
  },
});
