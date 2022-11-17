import React from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import ListItem from '../components/listitem';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Entypo';
import { AuthContext } from '../states/auth';
import { ItemsContext } from '../states/itemscontext';
import { Item } from "../models/item";
import { ActionButton } from '../components/actionbutton';
import { ModalSelector } from '../components/modalselector';


/*
    A screen that lists the items in inventory.
    This screen is similar for both the admin and site logins,
    but the admin has a few more actions they can take.
*/
export default function ItemsScreen({ navigation, route }) {
    const { signOut } = React.useContext(AuthContext);
    const { items, trailers, addItem, fetchItemsAndTrailers, sortItems } = React.useContext(ItemsContext);

    const { userType } = route.params;
    const isAdmin = (userType === "Admin");

    const [isRefreshing, setIsRefreshing] = React.useState(false);

    const [searchText, setSearchText] = React.useState("");

    const [trailer, setTrailer] = React.useState(trailers[0]);
    const [showTrailerSelector, setShowTrailerSelector] = React.useState(false);

    const sortOptions = [
        {
            description: "Name",
            comparer: (item1, item2) => item1.name.localeCompare(item2.name)
        },
        {
            description: "Amount",
            comparer: (item1, item2) => (item1.amount - item2.amount)
        },
        {
            description: "Nearness to Notification Level", //todo
            comparer: (item1, item2) => ((item1.amount - item1.minimumAmount) / (item1.defaultIncrement + .01) - (item2.amount - item2.minimumAmount) / (item2.defaultIncrement + .01))
        }
    ];
    const [showSortSelector, setShowSortSelector] = React.useState(false);

    const ItemsHeader = () => (
        <View style={globalStyles.header}>
            <View style={itemsStyles.headerTitle}>
                {(userType === "Admin") ?
                    <>
                        <TouchableOpacity style={itemsStyles.trailerDropdown}
                            onPress={() => setShowTrailerSelector(true)}
                        >
                            <Text style={globalStyles.headerText}>
                                {trailer.tname}&apos;s
                            </Text>
                            <Icon name="chevron-down" style={itemsStyles.trailerDropdownIcon}></Icon>
                        </TouchableOpacity>
                        <Text style={globalStyles.headerText} numberOfLines={1}>Item List</Text>
                    </>
                    :
                    <Text style={globalStyles.headerText}>
                        {trailer.tname}&apos;s Item List
                    </Text>
                }
            </View>
        </View >);

    React.useEffect(() => {
        navigation.setOptions({ headerTitle: ItemsHeader });
    }, [navigation, trailer]);

    return (
        <View style={globalStyles.container}>

            {/* Search and Filter Row */}
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
                <MaterialIcon name="sort" size={30}
                    onPress={() => setShowSortSelector(true)}
                />

            </View>

            {/* List of Items */}
            <View style={globalStyles.container}>
                <View>
                    <FlatList
                        onRefresh={() => {
                            setIsRefreshing(true);
                            fetchItemsAndTrailers().then(() => setIsRefreshing(false));
                        }}
                        refreshing={isRefreshing}
                        data={items.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) && item.trailerName === trailer.tname)}
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
                    <ActionButton style={itemsStyles.addButton}
                        iconName="plus"
                        onPress={() => {
                            const newItem = new Item({ name: "Unnamed Items", trailerName: trailer.tname, trailerId: trailer.tid });
                            addItem(newItem);
                            navigation.navigate("ItemEditScreen", newItem);
                        }}>
                    </ActionButton >
                    :
                    <View></View>
            }

            {/* Trailer Selection Modal */}
            <ModalSelector
                visible={showTrailerSelector}
                promptText="Show items in..."
                options={trailers}
                optionTextSelector={(trailer) => trailer.tname}
                onOptionChosen={(trailer) => setTrailer(trailer)}
                onRequestClose={() => setShowTrailerSelector(false)}
            />

            {/* Sort Selection Modal */}
            <ModalSelector
                visible={showSortSelector}
                promptText="Sort by..."
                options={sortOptions}
                optionTextSelector={(sortOption) => sortOption.description}
                onOptionChosen={(sortOption) => sortItems(sortOption.comparer)}
                onRequestClose={() => setShowSortSelector(false)}
            />
        </View >
    );
}


const itemsStyles = StyleSheet.create({
    searchAndFilterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        paddingVertical: 10,
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
        width: 60,
        height: 60,
        bottom: 20,
        right: 20,
    },
    headerTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    trailerDropdown: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginRight: 10,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: 'rgb(37,65,81)',
        padding: 4,
    },
    trailerDropdownIcon: {
        fontSize: 20,
        color: "rgb( 213,83,66)",
        textAlignVertical: "center",
    }
});