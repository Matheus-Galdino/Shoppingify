import Item from "./models/Item.interface";
import Group from "./models/Group.interface";
import Category from "./models/Category.interface";
import ShoppingList from "./models/ShoppingList.interface";

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
