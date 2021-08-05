import Group from "./Group.interface";
import ShoppingListItem from "./ShoppingListItem.interface";

export default interface ShoppingList {
  id: number;
  date: Date;
  name: string;
  active: boolean;
  status: ListStatus;
  items: Group<ShoppingListItem>[];
}
