import { Forbidden } from "../errors";
export class Cat {
  constructor(data) {
    if (!data.name || !data.age) {
      throw new Forbidden("That is not a cat... please provide a name and age");
    }
    this.id = Math.floor(Math.random() * 100000);
    this.name = data.name;
    this.age = data.age;
  }
}
