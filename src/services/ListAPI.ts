import BaseService from "./BaseService";

import Group from "@/models/Group.interface";
import ListStatus from "@/models/ListStatus.enum";
import ShoppingList from "@/models/ShoppingList.interface";
import ShoppingListItem from "@/models/ShoppingListItem.interface";

export default class ListAPI extends BaseService {
  static async getLists(token: string) {
    const result = await fetch(`${this.API_URL}/shoppinglist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await result.json();

    return json as ShoppingList[];
  }

  static async getListItems(listId: number, token: string) {
    const result = await fetch(`${this.API_URL}/shoppinglist/${listId}/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await result.json();

    return json as Group<ShoppingListItem>[];
  }

  static async addItemToList(listId: number, itemId: number, token: string) {
    const result = await fetch(`${this.API_URL}/shoppinglist/${listId}/add/${itemId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) {
      const json = await result.json();
      throw new Error(json.error);
    }
  }

  static async changeListItemQuantity(listId: number, itemId: number, quantity: number, token: string) {
    const result = await fetch(`${this.API_URL}/shoppinglist/${listId}/item/${itemId}?quantity=${quantity}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) {
      const json = await result.json();
      throw new Error(json.message);
    }
  }

  static async changeListStatus(listId: number, status: ListStatus, token: string) {
    const result = await fetch(`${this.API_URL}/shoppinglist/${listId}/status?status=${status}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) {
      const json = await result.json();
      throw new Error(json.message);
    }
  }

  static async removeItemFromList(listId: number, itemId: number, token: string) {
    const result = await fetch(`${this.API_URL}/shoppinglist/${listId}/item/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) throw new Error("Something went wrong");
  }

  static async changeActiveList(listId: number, token: string) {
    const result = await fetch(`${this.API_URL}/shoppinglist/active/${listId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) throw new Error("Something went wrong");
  }

  static async SaveList(list: ShoppingList, token: string) {
    const body = JSON.stringify(list);

    const result = await fetch(`${this.API_URL}/shoppinglist`, {
      method: "POST",
      headers: { ...this.defaultHeaders, Authorization: `Bearer ${token}` },
      body,
    });

    if (!result.ok) {
      const json = await result.json();
      throw new Error(json.error);
    }
  }

  static async deleteList(listId: number, token: string) {
    const result = await fetch(`${this.API_URL}/shoppinglist/${listId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!result.ok) throw new Error("Something went wrong");
  }
}
