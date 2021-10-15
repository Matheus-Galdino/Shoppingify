import { Item, ShoppingList } from "./index";

export default interface ShoppingListItem {
  Item: Item;
  ItemId: number;
  Quantity: number;
  ShoppingListId: number;
  ShoppingList: ShoppingList;
}
