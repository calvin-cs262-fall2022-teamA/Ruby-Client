import React from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import ListItem from '../components/listitem';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../states/auth';
import { itemsContext } from '../states/itemscontext';
import { Item } from "../models/item";


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

    const { items, addItem } = React.useContext(itemsContext);

    const { userType } = route.params;
    const isAdmin = (userType === "Admin");
    console.log(JSON.stringify(userType));

    const { signOut } = React.useContext(AuthContext);

    return (
        <View style={globalStyles.container}>
            <View style={itemsStyles.searchAndFilterRow}>
                <View style={itemsStyles.search}>
                    <MaterialIcon name="search" size={30}></MaterialIcon>
                    <TextInput style={itemsStyles.searchBox}
                        value={searchText}
                        placeholder="Search..."
                        onChangeText={setSearchText}
                    />
                    <TouchableOpacity style={itemsStyles.clearSearch}
                        onPress={() => setSearchText("")}
                    >
                        {searchText === "" ? <View /> : <MaterialIcon name="close" size={20} color="#d55342"></MaterialIcon>}
                    </TouchableOpacity>
                </View>
                <MaterialIcon name="sort" size={30}></MaterialIcon>

            </View>
            <View style={globalStyles.container}>
                <View>
                    <FlatList data={items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))}
                        keyExtractor={(item) => `${item.id}:${item.name}:${item.amount}:${item.defaultIncrement}`}
                        renderItem={({ item }) => (
                            <ListItem item={item} navigation={navigation} isAdmin={isAdmin}></ListItem>
                        )}>
                    </FlatList>
                    {/* // Temporary to test login features with different user views */}
                    <TouchableOpacity style={globalStyles.loginNav} onPress={signOut}>
                        <Text style={globalStyles.loginNavText}>Signout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Add item floating button */}
            {
                isAdmin ?
                    <TouchableOpacity style={itemsStyles.addButton}
                        onPress={() => {
                            const newItem = new Item({});
                            addItem(newItem);
                            navigation.navigate("ItemEditScreen", newItem);
                        }}>
                        <Icon name="plus" style={itemsStyles.addButtonIcon}></Icon>
                    </TouchableOpacity >
                    :
                    <View></View>
            }
        </View >
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
    },
    addButton: {
        position: "absolute",
        backgroundColor: "rgb(213,83,66)",
        width: 60,
        height: 60,
        borderRadius: 30,
        bottom: 20,
        right: 20,
        justifyContent: 'center',
    },
    addButtonIcon: {
        color: "white",
        textAlign: "center",
        fontSize: 50,
    }
});