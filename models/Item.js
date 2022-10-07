/*
  A class representing a certain item in stock (e.g. cups)
*/
export class Item {
  constructor({ name, amount, minimumAmount, defaultIncrement }) {
    // What the item is called
    this.name = name;

    // How much of the item is currently in stock
    this.amount = amount;

    // The amount at which a low inventory notification should be sent
    this.minimumAmount = minimumAmount;

    // The default number of items added or removed at one time
    this.defaultIncrement = defaultIncrement;
  }

  /*
    Attempts to set the specified property and save.
    If the property is not valid (i.e. value is not a number when it should be),
    false is returned.
  */
  trySave(propertyName, value) {
    if (propertyName === "name") {
      if (value === "") {
        return false;
      }
      this.name = value;
    }
    else { // numeric properties
      const valueAsNumber = parseInt(value);
      if (isNaN(valueAsNumber)) {
        return false;
      }

      switch (propertyName) {
        case ("amount"):
          this.amount = valueAsNumber;
          break;
        case ("minimumAmount"):
          this.minimumAmount = valueAsNumber;
          break;
        case ("defaultIncrement"):
          this.defaultIncrement = valueAsNumber;
          break;
        default:
          return false;
      };
    }

    this.save();
    return true;
  }

  /*
    Saves the item to the database.
  */
  save() {
    console.log(`Saving! name=${this.name} amount=${this.amount} minimumAmount=${this.minimumAmount} defaultIncrement=${this.defaultIncrement}`);
    // TODO: save in database
  }
}