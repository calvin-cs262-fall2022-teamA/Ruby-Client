import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

/* A component used to display each item in the ItemsScreen */
export default function NotificationItem({ item, amount }) {


    return (
        <View style={NotificationItemStyles.notifObj}>
            <Icon name="priority-high" size={35} style={NotificationItemStyles.notifIcon}></Icon>
            <View style={NotificationItemStyles.notifContainer}>
                <Text style={NotificationItemStyles.notifText}>You only have {amount} {item} left. Restocking is recommended</Text>
            </View>
        </View>
    );
}

const NotificationItemStyles = StyleSheet.create({
    notifContainer: {
        borderColor: "rgb(37,65,81)",
        borderWidth: 5,
        backgroundColor: 'rgb(37,65,81)',

        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 270,
        borderRadius: 25,
        marginLeft: 0,
        marginRight: 0,
        marginVertical: 0,

    },
    notifObj: {
        borderColor: "rgb(37,65,81)",
        borderWidth: 5,
        backgroundColor: 'grey',

        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        marginLeft: '7.5%',
        borderRadius: 30,
        margin: 10,

    },
    notifIcon: {
        padding: 5,
        marginLeft: 10,
        alignSelf: 'center',
        backgroundColor: 'rgb(255, 0, 102)',
        borderRadius: 25,

    },
    notifText: {
        padding: 5,
        marginLeft: "2%",
        color: 'white',
        fontSize: 15,

    }
});