import React from 'react';
import { Item } from "../models/item";
import Toast from "react-native-simple-toast";
import { ActivityIndicator, StyleSheet, View } from 'react-native';

/**
 * Stores the items and trailers for the user and methods to modify them.
 */
export const ItemsContext = React.createContext({
  items: [],
  trailers: [],
  fetchItemsAndTrailers: async () => { },
  deleteItem: () => { },
  addItem: async () => { },
  saveItem: () => { },
  sortItems: () => { },
});

/**
 * A component that provides the ItemsContext
 *
 * @param {Component} children - the children of the provider (passed as the children not an attribute)
 * @param {string} username - the username of the current user
 * @returns the provider component
 */
export function ItemsProvider({ children, username }) {
  const [items, setItems] = React.useState([]);
  const [trailers, setTrailers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [haveFetched, setHaveFetched] = React.useState(false);

  /**
   * Fetches and sets the items and trailers for the current user.
   */
  const fetchItemsAndTrailers = async () => {
    console.log(`Fetching items and trailers for username=${username}`);
    try {
      const response = await fetch(`https://be-a-ruby.herokuapp.com/traileritems/${username}`);
      const json = await response.json();
      setTrailers(json[0]);
      setItems(json[1].map((item) => new Item({
        id: item.id,
        name: item.iname,
        amount: item.quantity,
        minimumAmount: item.notificationlevel,
        defaultIncrement: item.increment,
        trailerName: item.tname,
        trailerId: item.tid,
      })));
    }
    catch (error) {
      console.log(error);
      Toast.show("An error occurred while fetching items");
    }
  };

  /**
   * Deletes and item from the database (as well as locally)
   *
   * @param {int} id - the id of the item to delete
   */
  const deleteItem = (id) => {
    console.log(`Deleting! id=${id}`);
    try {
      fetch('https://be-a-ruby.herokuapp.com/items', {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID: id })
      });
      setItems(items.filter(i => i.id !== id));
    }
    catch (error) {
      console.log(error);
      Toast.show("An error occurred while deleting the item");
    }
  }

  /**
   * Adds the item with the specified id from the database (as well as locally)
   *
   * @param {Item} item - the item to add (the id is set automatically by this function)
   */
  const addItem = async (item) => {
    try {
      const response = await fetch('https://be-a-ruby.herokuapp.com/items', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TID: item.trailerId, iname: item.name, qty: item.amount, notif: item.minimumAmount, inc: item.defaultIncrement })
      });
      const json = await response.json();
      item.id = json.id;
    }
    catch (error) {
      console.log(error);
      Toast.show("An error occurred while creating the item");
    }
    items.unshift(item);
    setItems(items);
  };

  /**
   * Saves an item in the database.
   *
   * @param {int} id - the id of the item to save
   */
  const saveItem = (id) => {
    const item = items.find(i => i.id === id);
    setItems(items);
    console.log(`Saving! id=${item.id} name=${item.name} amount=${item.amount} minimumAmount=${item.minimumAmount} defaultIncrement=${item.defaultIncrement}`);
    try {
      fetch('https://be-a-ruby.herokuapp.com/items', {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ID: id, name: item.name, quantity: item.amount, notificationlevel: item.minimumAmount, increment: item.defaultIncrement })
      });
    }
    catch (error) {
      console.log(error);
      Toast.show("An error occurred while saving the item");
    }
  };

  /**
   * Sorts the items.
   *
   * @param {(Item, Item) => int} comparer - a function that compares two Items
   */
  const sortItems = (comparer) => {
    setItems(items.sort(comparer));
  };


  React.useEffect(() => {
    if (!haveFetched) {
      setHaveFetched(true);
      fetchItemsAndTrailers().then(() => setIsLoading(false));
    }
  }
  );

  return (
    <ItemsContext.Provider value={{ items, trailers, fetchItemsAndTrailers, deleteItem, addItem, saveItem, sortItems }}>
      {isLoading ?
        <View style={styles.container}><ActivityIndicator size={80} color="rgb(213,83,66)" /></View> :
        children
      }
    </ItemsContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  }
});