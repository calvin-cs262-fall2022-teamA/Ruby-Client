import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { globalStyles } from '../styles/global';
import ListItem from '../components/listitem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Item } from "../models/item";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../states/auth';

/*
    A screen that lists the items in inventory.
    This screen is similar for both the admin and site logins,
    but the admin has a few more actions they can take.
*/
export default function ItemsScreen({ navigation, route }) {
    React.useEffect(() => {
        navigation.setOptions({ headerTitle: ItemsHeader });
    }, [navigation]);

    const { userType } = route.params;
    console.log(JSON.stringify(userType));

    const { signOut } = React.useContext(AuthContext);

    return (

        <View>
            <FlatList data={items} renderItem={({ item }) => (
                <ListItem item={item} navigation={navigation}></ListItem>
            )}>
            </FlatList>
            {/* // Temporary to test login features with different user views */}
            <TouchableOpacity style={globalStyles.loginNav} onPress={signOut}>
                <Text style={globalStyles.loginNavText}>Signout</Text>
            </TouchableOpacity>
        </View>
    );
}

function ItemsHeader() {
    return (
        <View style={itemsStyles.headerStyle}>
            <Text style={itemsStyles.textStyle}>Item List</Text>
            <View style={itemsStyles.iconStyle}>
                <Icon name="sort" size={30}></Icon>
                <Icon name="search" size={30}></Icon>
            </View>
        </View>
    );
};

const itemsStyles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
    },
    textStyle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    iconStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "20%",
    },

});

/* Test data to use without database */
const items = [(new Item({
    name: "Cups",
    amount: 200,
    defaultIncrement: 20,
    minimumAmount: 10,
})),
(new Item({
    name: "Forks",
    amount: 300,
    defaultIncrement: 10,
    minimumAmount: 10,
})),
(new Item({
    name: "Knives",
    amount: 300,
    defaultIncrement: 10,
    minimumAmount: 10,
})),
(new Item({
    name: "Spoons",
    amount: 300,
    defaultIncrement: 15,
    minimumAmount: 10,
}))];