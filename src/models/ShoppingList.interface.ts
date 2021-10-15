import { Group, ListStatus, ShoppingListItem } from "./index";

export default interface ShoppingList {
  id: number;
  date: Date;
  name: string;
  active: boolean;
  status: ListStatus;
  items: Group<ShoppingListItem>[];
}
