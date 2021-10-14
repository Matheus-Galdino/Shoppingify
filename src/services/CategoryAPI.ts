import BaseService from "./BaseService";
import Category from "@/models/Category.interface";

export default class CategoryAPI extends BaseService {
  static async getCategories(token: string) {
    const result = await fetch(`${this.API_URL}/category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await result.json();

    return json as Category[];
  }

  static async saveCategory(category: Category, token: string) {
    const body = JSON.stringify(category);

    const result = await fetch(`${this.API_URL}/category`, {
      method: "POST",
      headers: {
        ...this.defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (!result.ok) {
      const json = await result.json();
      throw new Error(json.message);
    }
  }
}
