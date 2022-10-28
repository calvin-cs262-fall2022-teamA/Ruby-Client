import React from 'react';
import { View, FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { globalStyles } from '../styles/global';
import ListItem from '../components/listitem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Item } from "../models/item";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../states/auth';
import { Notifications } from './notifications';




/*
    A screen that lists the items in inventory.
    This screen is similar for both the admin and site logins,
    but the admin has a few more actions they can take.
*/
export default function ItemsScreen({ navigation, route }) {
    const [searchText, setSearchText] = React.useState("");

    React.useEffect(() => {
        navigation.setOptions({ headerTitle: ItemsHeader });
    }, [navigation]);

    /* Rerender when leaving edit screen to make sure any edits are reflected */
    const [refresh, refreshItems] = React.useState(false);
    navigation.addListener("focus", () => refreshItems(!refresh));

    const { userType } = route.params;
    console.log(JSON.stringify(userType));

    const { signOut } = React.useContext(AuthContext);

    return (
        <View>
            <View style={itemsStyles.searchAndFilterRow}>
                <View style={itemsStyles.search}>
                    <Icon name="search" size={30}></Icon>
                    <TextInput style={itemsStyles.searchBox}
                        value={searchText}
                        placeholder="Search..."
                        onChangeText={setSearchText}
                    />
                    <TouchableOpacity style={itemsStyles.clearSearch}
                        onPress={() => setSearchText("")}
                    >
                        {searchText === "" ? <View /> : <Icon name="close" size={20} color="#d55342"></Icon>}
                    </TouchableOpacity>
                </View>
                <Icon name="sort" size={30}></Icon>

            </View>
            <View style={itemsStyles.container}>
                <View style={itemsStyles.content}>
                    <FlatList data={allItems.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))}
                        keyExtractor={(item) => `${item.name}:${item.amount}:${item.defaultIncrement}`} // TODO: also ID
                        renderItem={({ item }) => (
                            <ListItem item={item} navigation={navigation} isAdmin={userType === "Admin"}></ListItem>
                        )}>
                    </FlatList>
                    {/* // Temporary to test login features with different user views */}
                    <TouchableOpacity style={globalStyles.loginNav} onPress={signOut}>
                        <Text style={globalStyles.loginNavText}>Signout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );

}

function ItemsHeader() {
    return (
        <View style={globalStyles.header}>
            <Text style={globalStyles.headerText} numberOfLines={1}>Item List</Text>
        </View>
    );
};


const itemsStyles = StyleSheet.create({
    searchAndFilterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    search: {
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 10,
        alignItems: "center",
        paddingHorizontal: 5,
    },
    searchBox: {
        marginLeft: 10,
        fontSize: 18,
        width: "60%",
        flexGrow: 1,
    },
    clearSearch: {
        width: 20,
    }
});

/* Test data to use without database */
const allItems = [(new Item({
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