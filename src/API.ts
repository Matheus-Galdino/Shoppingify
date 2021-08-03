import Item from "./models/Item.interface";
import Group from "./models/Group.interface";
import Category from "./models/Category.interface";
import ShoppingList from "./models/ShoppingList.interface";
import ShoppingListItem from "./models/ShoppingListItem.interface";

export default {
  async getItems() {
    const result = await fetch("https://localhost:44333/api/item");
    const json = await result.json();

    return json as Group<Item>[];
  },
  async getCategories() {
    const result = await fetch("https://localhost:44333/api/category");
    const json = await result.json();

    return json as Category[];
  },
  async getLists() {
    const result = await fetch("https://localhost:44333/api/shoppinglist");
    const json = await result.json();

    return json as ShoppingList[];
  },
  async getListItems(listId: number) {
    const result = await fetch(`https://localhost:44333/api/shoppinglist/${listId}/items`);
    const json = await result.json();

    return json as Group<ShoppingListItem>[];
  },
  async addItemToList(listId: number, itemId: number) {
    const result = await fetch(`https://localhost:44333/api/shoppinglist/${listId}/add/${itemId}`, {
      method: "POST",
    });

    if (!result.ok) throw new Error("Something went wrong");
  },
  async saveItem(item: Item) {
    const body = JSON.stringify(item);

    const result = await fetch("https://localhost:44333/api/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!result.ok) throw new Error("Something went wrong");
  },
  async deleteItem(item: Item) {
    const body = JSON.stringify(item);

    const result = await fetch("https://localhost:44333/api/item", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!result.ok) throw new Error("Something went wrong");
  },
};
