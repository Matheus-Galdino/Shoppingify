import Category from "./models/Category.interface";
import Item from "./models/Item.interface";
import ItemGroup from "./models/ItemGroup.interface";

export default {
  async getItems() {
    const result = await fetch("https://localhost:44333/api/item");
    const json = await result.json();

    return json as ItemGroup[];
  },
  async getCategories() {
    const result = await fetch("https://localhost:44333/api/category");
    const json = await result.json();

    return json as Category[];
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
};