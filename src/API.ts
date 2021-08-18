import Item from "./models/Item.interface";
import Group from "./models/Group.interface";
import Category from "./models/Category.interface";
import ShoppingList from "./models/ShoppingList.interface";
import ShoppingListItem from "./models/ShoppingListItem.interface";
import Stat from "./models/Stat.interface";
import ListStatus from "./models/ListStatus.enum";

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

    if (!result.ok) {
      const json = await result.json();
      throw new Error(json.error);
    }
  },
  async changeListItemQuantity(listId: number, itemId: number, quantity: number) {
    const result = await fetch(`https://localhost:44333/api/shoppinglist/${listId}/item/${itemId}?quantity=${quantity}`, {
      method: "PUT",
    });

    if (!result.ok) {
      const json = await result.json();
      throw new Error(json.message);
    }
  },
  async changeListStatus(listId: number, status: ListStatus) {
    const result = await fetch(`https://localhost:44333/api/shoppinglist/${listId}/status?status=${status}`, {
      method: "PUT",
    });

    if (!result.ok) {
      const json = await result.json();
      throw new Error(json.message);
    }
  },
  async removeItemFromList(listId: number, itemId: number) {
    const result = await fetch(`https://localhost:44333/api/shoppinglist/${listId}/item/${itemId}`, {
      method: "DELETE",
    });

    if (!result.ok) throw new Error("Something went wrong");
  },
  async changeActiveList(listId: number) {
    const result = await fetch(`https://localhost:44333/api/shoppinglist/active/${listId}`, {
      method: "PUT",
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

    if (!result.ok) {
      const json = await result.json();
      throw new Error(json.error);
    }
  },
  async saveCategory(category: Category) {
    const body = JSON.stringify(category);
    const headers = { "Content-Type": "application/json" };

    const result = await fetch("https://localhost:44333/api/category", {
      method: "POST",
      headers,
      body,
    });

    if (!result.ok) {
      const json = await result.json();
      throw new Error(json.message);
    }
  },
  async SaveList(list: ShoppingList) {
    const body = JSON.stringify(list);

    const result = await fetch("https://localhost:44333/api/shoppinglist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!result.ok) {
      const json = await result.json();
      throw new Error(json.error);
    }
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
  async deleteList(listId: number) {
    const result = await fetch(`https://localhost:44333/api/shoppinglist/${listId}`, {
      method: "DELETE",
    });

    if (!result.ok) throw new Error("Something went wrong");
  },
  async getTopItems() {
    const result = await fetch("https://localhost:44333/api/stats/top/items");

    const json = await result.json();

    return json as Stat[];
  },
  async getTopCategories() {
    const result = await fetch("https://localhost:44333/api/stats/top/categories");

    const json = await result.json();

    return json as Stat[];
  },
  async getMonthlySummary() {
    const result = await fetch("https://localhost:44333/api/stats/monthly");

    const json = await result.json();

    return json as Stat[];
  }
};
