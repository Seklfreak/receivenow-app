import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'firebase/firestore';
import {auth, store} from "../firebase";
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";
import firebase from 'firebase/app';

export default class DeliveryItem extends Component {
    constructor(props) {
        super(props);

        const {id} = props

        this.state = {
            id: id,
            data: null,
            removeBlocked: false,
        };

        store.collection('deliveries').doc(id).onSnapshot(snapshot => {
            this.setState({data: snapshot.data()});
        });
    }

    handleRemove(_) {
        this.setState({removeBlocked: true});

        const {id} = this.state

        store.collection('users').doc(auth.currentUser.uid).set(
            {
                deliveries: firebase.firestore.FieldValue.arrayRemove(id),
            },
            {merge: true}
        )
            .then(_ => {
                this.setState({removeBlocked: false});
            })
            .catch(error => {
                console.error('Error storing delivery:', error)
            })
    }

    render() {
        const {data} = this.state;

        if (!data) {
            return (<Text>Loading…</Text>);
        }

        let detailsHTML;
        if (data.message !== '') {
            detailsHTML = (<Text>Status: {data.message}</Text>)
        } else if (data.history.length > 0) {
            let lastHistory = data.history[data.history.length - 1]
            detailsHTML = (<Text>Last update: <b>{lastHistory.message}</b> at <b>{lastHistory.location}</b></Text>)
        }

        return (
            <View>
                <Text style={deliveryItemStyles.idText}>{data.id}</Text>
                {detailsHTML}
                <TouchableOpacity style={deliveryItemStyles.button}
                                  onPress={e => this.handleRemove(e)}
                                  disabled={this.state.removeBlocked}>
                    <Text style={deliveryItemStyles.buttonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const deliveryItemStyles = StyleSheet.create({
    idText: {
        fontSize: 30,
    },
    button: {
        backgroundColor: 'blue',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});
