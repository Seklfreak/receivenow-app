import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AddDelivery from "../components/AddDelivery";
import ListDeliveries from "../components/ListDeliveries";

export default function DeliveriesScreen() {
    return (
        <View style={deliveriesStyles.container}>
            <ScrollView style={deliveriesStyles.container} contentContainerStyle={deliveriesStyles.contentContainer}>

                <View style={deliveriesStyles.item}>
                    <AddDelivery/>
                </View>

                <View style={deliveriesStyles.item}>
                    <ListDeliveries/>
                </View>

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
    item: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
        flexDirection: 'row',
    }
});
