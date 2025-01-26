export class User {
  public static users: User[] = [];

  public id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) {
    this.id = `${Math.random()}`;
    this.email = email;
    this.password = password;
    this.name = name;
  }

  static create(user: User) {
    User.users.push(user);
    return user;
  }

  static findAll() {
    return User.users;
  }

  static findById(id: string) {
    return User.users.find((user) => user.id === id);
  }

  static findByEmail(email: string) {
    return User.users.find((user) => user.email === email);
  }
}
