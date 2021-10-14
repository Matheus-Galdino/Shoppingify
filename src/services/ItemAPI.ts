import BaseService from "./BaseService";
import Item from "@/models/Item.interface";
import Group from "@/models/Group.interface";

export default class ItemAPI extends BaseService {
  static async getItems(token: string) {
    const result = await fetch(`${this.API_URL}/item`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await result.json();

    return json as Group<Item>[];
  }

  static async saveItem(item: Item, token: string) {
    const body = JSON.stringify(item);

    const result = await fetch(`${this.API_URL}/item`, {
      method: "POST",
      headers: { ...this.defaultHeaders, Authorization: `Bearer ${token}` },
      body,
    });

    if (!result.ok) {
      const json = await result.json();
      throw new Error(json.error);
    }
  }

  static async deleteItem(item: Item, token: string) {
    const body = JSON.stringify(item);

    const result = await fetch(`${this.API_URL}/item`, {
      method: "DELETE",
      headers: { ...this.defaultHeaders, Authorization: `Bearer ${token}` },
      body,
    });

    if (!result.ok) throw new Error("Something went wrong");
  }
}
