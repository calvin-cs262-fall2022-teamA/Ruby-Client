/***
 * Help displayed in the help tab.
 */
export const helpTexts = [
  {
    topic: "How to Remove Items from Inventory",
    text: `To remove items from the trailer's inventory, identify the item you wish to remove a quantity of. Tap the subtraction button until the desired quantity is reached.
    \nIf necessary, change the value of the increment value that is located to the right of the orange subtraction button to the quantity you wish to remove.Then tap the subtraction button once.`,
    onlyAdmin: false,
  },
  {
    topic: "How to Find Which Items Have Low Inventory",
    text: `To observe what items have a low inventory, navigate along the bottom of the screen to the tab that has the bell icon named “Notifications”. Tap on this tab and you will see a list of the items that currently have an inventory that is lower than their notification level.`,
    onlyAdmin: false,
  },
  {
    topic: "How to Sort Items In a Trailer",
    text: `To sort the items in a trailer inventory, select the three bars in the top right corner of the item list screen. From here there are three options to sort the items in the trailer:
    \n\tName: Sorts the items alphabetically
    \n\tAmount: Sorts the items from lowest quantity to highest quantity
    \n\tLow: Sorts the items by how close the quantity is to the notification level based on the item’s default increment`,
    onlyAdmin: false,
  },
  {
    topic: "How to Search for Items",
    text: `To search for an item, tap in the search bar on the top of the inventory list screen and type in the name of an item. Items will appear in the list whose name matches your search term.`,
    onlyAdmin: false,
  },
  {
    topic: "How to Edit an Item",
    text: `To edit any attribute of an item in an inventory, tap on the pencil icon on the right side of the item tab. You will be navigated to the edit item screen where you can edit fields like the name, amount, default increment amount, and the notification level.
    \nOnce you are done editing the item, tap the back arrow in the back left corner of the screen. You should see your list of items with the updated item in it.`,
    onlyAdmin: true,
  },
  {
    topic: "What are the Item Edit Fields",
    text: `\tName: The name displayed on the item list screen.
    \n\tAmount: The amount of a given item that is left in stock.
    \n\tDefault Increment: The default value that will be subtracted from the inventory everytime the subtract button is tapped.
    \n\tNotification Level: The value that once reached by the amount will trigger a notification in the notifications tab.`,
    onlyAdmin: true,
  },
  {
    topic: "How to Add an Item",
    text: `To add an item into an inventory, click the plus button in the bottom right corner of the item list screen. Doing this will take you to a page where you can input the name, quantity, default increment amount, and the notification level of the item. After editing, tap the back arrow in the top left corner and you should see your new item in the list.`,
    onlyAdmin: true,
  },
  {
    topic: "How to Delete an Item",
    text: `To delete an item, identify the item that you wish to delete on the item list screen. Tap the pencil icon on the right side of the item tab. Once you are navigated to the edit item screen, tap the trash can icon in the top right corner and confirm your choice in the box that displays.`,
    onlyAdmin: true,
  },
  {
    topic: "How to Switch Trailers",
    text: `To switch trailers tap the name of the current trailer in the top left corner of the item list screen. A drop down list of trailers will appear, tap on the trailer you wish to enter. Once this is done you will be brought to the item list of the trailer you selected.`,
    onlyAdmin: true,
  }
];