import BaseService from "./BaseService";
import Stat from "@/models/Stat.interface";

export default class StatsAPI extends BaseService {
  private static async MakeRequest(url: string, token: string) {
    const result = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await result.json();

    return json as Stat[];
  }

  static async getTopItems(token: string) {
    return this.MakeRequest(`${this.API_URL}/stats/top/items`, token);
  }

  static async getTopCategories(token: string) {
    return this.MakeRequest(`${this.API_URL}/stats/top/categories`, token);
  }

  static async getMonthlySummary(token: string) {
    return this.MakeRequest(`${this.API_URL}/stats/monthly`, token);
  }
}
