/**
 *  A class representing a certain item in stock (e.g. cups)
 */
export class Item {
  constructor({ id, name, amount, minimumAmount, defaultIncrement }) {
    // A unique id
    this.id = id || 0;

    // What the item is called
    this.name = name || "";

    // How much of the item is currently in stock
    this.amount = amount || 0;

    // The amount at which a low inventory notification should be sent
    this.minimumAmount = minimumAmount || 0;

    // The default number of items added or removed at one time
    this.defaultIncrement = defaultIncrement || 1;
  }

  /**
   * Edits a property and returns whether the resulting item is valid.
   *
   * @param {string} propertyName - The name of the property being set
   * @param {string | number} value - The value of the property being set
   * @returns - True if the property is valid, false if it isn't.
   */
  editProperty(propertyName, value) {
    if (propertyName === "name") {
      value = value.trim();
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
          if (valueAsNumber < 0) {
            this.amount = 0;
            return false;
          }
          this.amount = valueAsNumber;
          break;
        case ("minimumAmount"):
          if (valueAsNumber < 0) {
            this.minimumAmount = 0;
            return false;
          }
          this.minimumAmount = valueAsNumber;
          break;
        case ("defaultIncrement"):
          if (valueAsNumber < 0) {
            this.defaultIncrement = 0;
            return false;
          }
          this.defaultIncrement = valueAsNumber;
          break;
        default:
          return false;
      }
    }

    return true;
  }

  /**
   * Archives the item (shown in UI as "delete")
   */
  archive() {
    // TODO: move this function to itemsContext
    console.log(`Archiving! id=${this.id} name=${this.name}`);
    // TODO: archive in database
  }
}