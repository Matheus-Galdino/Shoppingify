import ShoppingListItem from "./ShoppingListItem.interface";

export default interface ShoppingList {
  id: number;
  date: Date;
  name: string;
  active: boolean;
  items: ShoppingListItem[];
}
