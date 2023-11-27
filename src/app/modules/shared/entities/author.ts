import { IEntity } from "../interfaces/i-entity";

export class Author implements IEntity {
  id: string;
  name: string;
  email: string;
}
