/*
  A class representing a certain item in stock (e.g. cups)
*/
export class Item {
  constructor(name, amount, minimumAmount, defaultIncrement) {
    // What the item is called
    this.name = name;

    // How much of the item is currently in stock
    this.amount = amount;

    // The amount at which a low inventory notification should be sent
    this.minimumAmount = minimumAmount;

    // The default number of items added or removed at one time
    this.defaultIncrement = defaultIncrement;
  }
}