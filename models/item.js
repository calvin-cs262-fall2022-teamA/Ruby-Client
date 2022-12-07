/**
 *  A class representing a certain item in stock (e.g. cups)
 */
export class Item {
  constructor({ id, name, amount, minimumAmount, defaultIncrement, trailerName, trailerId }) {

    /**
     * A unique id
     * @type {number}
     */
    this.id = id || 123456;

    /**
     * What the item is called
     * @type {string}
     */
    this.name = name || "";

    /**
     * How much of the item is currently in stock
     * @type {number}
     */
    this.amount = amount || 0;

    /**
     * The amount at which a low inventory notification should be sent
     * @type {number}
     */
    this.minimumAmount = minimumAmount || 0;

    /**
     * The default number of items added or removed at one time
     * @type {number}
     */
    this.defaultIncrement = defaultIncrement || 1;

    /**
     * The name of the trailer the item is in
     * @type {string}
     */
    this.trailerName = trailerName || "";

    /**
     * The id of the trailer the item is in
     * @type {number}
     */
    this.trailerId = trailerId || 0;
  }

  /**
   * Attempts to edit a property and returns whether the item has been changed.
   *
   * @param {string} propertyName - The name of the property being set
   * @param {string | number} value - The value of the property being set
   * @returns - True if the item may have been changed, false if it hasn't.
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
      let valueAsNumber = parseInt(value);
      if (isNaN(valueAsNumber)) {
        return false;
      }
      if (valueAsNumber < 0) {
        valueAsNumber = 0;
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
      }
    }
    return true;
  }
}