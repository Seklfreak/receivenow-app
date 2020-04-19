import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import TouchableOpacity from "react-native-web/dist/exports/TouchableOpacity";
import {auth, store} from "../firebase";
import {firestore} from "firebase";

export default class AddDelivery extends Component {
    constructor(props) {
        super(props);

        this.state = {id: '', blocked: false}
    }

    handleIDChange(text) {
        this.setState({id: text});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({blocked: true});

        const {id} = this.state;
        if (!id) {
            this.setState({blocked: false});
            return;
        }

        store.collection('deliveries').doc(id).set(
            {
                id: id,
            },
            {merge: true},
        )
            .then(_ => {
                store.collection('users').doc(auth.currentUser.uid).set(
                    {
                        deliveries: firestore.FieldValue.arrayUnion(id),
                    },
                    {merge: true}
                )
                    .then(_ => {
                        this.setState({blocked: false});
                    })
                    .catch(error => {
                        console.error('Error storing delivery:', error)
                    })
            })
            .catch(error => {
                console.error('Error storing delivery:', error)
            })
    }

    render() {
        return (
            <View>
                <Text>Add delivery</Text>
                <TextInput style={addDeliveryStyles.input}
                           onChangeText={text => this.handleIDChange(text)}
                           placeholder="Tracking ID"/>
                <TouchableOpacity style={addDeliveryStyles.button}
                                  disabled={this.state.blocked}
                                  onPress={e => this.handleSubmit(e)}
                >
                    <Text style={addDeliveryStyles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const addDeliveryStyles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        backgroundColor: 'blue',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});
