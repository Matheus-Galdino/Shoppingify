import Category from "./Category.interface";

export default interface Item {
  id: number;
  name: string;
  note: string;
  imageUrl: string;
  categoryId: number;
  category: Category;
}
