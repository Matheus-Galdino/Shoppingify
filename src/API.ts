import ItemGroup from "./models/ItemGroup.interface";

export default {
  async getItems() {
    const result = await fetch("https://localhost:44333/api/item");
    const json = await result.json() as ItemGroup[];

    return json;
  },
};
