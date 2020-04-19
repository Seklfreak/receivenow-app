import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function DeliveriesScreen() {
    return (
        <View style={deliveriesStyles.container}>
            <ScrollView style={deliveriesStyles.container} contentContainerStyle={deliveriesStyles.contentContainer}>

                <Text>Hello World!</Text>

            </ScrollView>
        </View>
    );
}

const deliveriesStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
});
