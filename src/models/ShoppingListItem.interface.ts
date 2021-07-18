import Item from "./Item.interface";
import ShoppingList from "./ShoppingList.interface";

export default interface ShoppingListItem {
  Item: Item;
  ItemId: number;
  Quantity: number;
  ShoppingListId: number;
  ShoppingList: ShoppingList;
}
