export default class Employee {
  constructor(name, role, hobbies, motto, hometown, blog) {
    this.name = name;
    this.role = role;
    this.hobbies = hobbies;
    this.motto = motto;
    this.hometown = hometown;
    this.blog = blog;
  }
  toItem() {}
  toDisplay() {}
}
