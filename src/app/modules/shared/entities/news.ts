import { IEntity } from "../interfaces/i-entity";
import { Author } from "./author";
import { Category } from "./category";

export class News implements IEntity {
  id: string;
  title: string;
  subTitle: string;
  imageUrl: string;
  body: string;
  publicationDate: Date;
  categoryId: string;
  category: Category;
  authorId: string;
  author: Author;
}
