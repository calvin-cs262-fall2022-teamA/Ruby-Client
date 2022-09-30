/*
  A class representing a certain item in stock (e.g. cups)
*/
export class Item {
  /* Create an Item.
    item should be a JS object with the same properties as Item.
    */
  constructor(item) {
    // What the item is called
    this.name = item.name;

    // How much of the item is currently in stock
    this.amount = item.amount;

    // The amount at which a low inventory notification should be sent
    this.minimumAmount = item.minimumAmount;

    // The default number of items added or removed at one time
    this.defaultIncrement = item.defaultIncrement;
  }
}