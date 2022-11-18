import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


/**
 * 
 * @param {string} name of the item that is below notification level
 * @param {string} amount that is left in the inventory/database of given item
 * @returns notification component alert to notification screen 
 * A component used to display each item in the notification screen
 */
export default function NotificationItem({ item, amount }) {


    return (
        <View style={NotificationItemStyles.page}>
            <View style={NotificationItemStyles.notifObj}>
                <Icon name="priority-high" size={35} style={NotificationItemStyles.notifIcon}></Icon>
                <View style={NotificationItemStyles.notifContainer}>
                    <Text style={NotificationItemStyles.notifText}>You only have {amount} {item} left. Restocking is recommended</Text>
                </View>
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
        height: '100%',
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
        margin: 5,



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

    },
    page: {
        marginTop: 10,
    }
});