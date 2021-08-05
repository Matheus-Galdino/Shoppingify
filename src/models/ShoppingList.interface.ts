import Group from "./Group.interface";
import ListStatus from "./ListStatus.enum";
import ShoppingListItem from "./ShoppingListItem.interface";

export default interface ShoppingList {
  id: number;
  date: Date;
  name: string;
  active: boolean;
  status: ListStatus;
  items: Group<ShoppingListItem>[];
}
