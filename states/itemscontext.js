import React from 'react';

/* Provides the items currently displayed */
export const itemsContext = React.createContext({
  items: [],
  deleteItem: (id) => { },
  addItem: (item) => { },
  saveItem: (id) => { },
});