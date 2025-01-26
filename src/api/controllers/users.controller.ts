import { Request, Response } from 'express';

import { User } from '../models/user.model';

export class UsersController {
  private static instance: UsersController;

  private constructor() {}

  static getInstance(): UsersController {
    if (!UsersController.instance)
      UsersController.instance = new UsersController();
    return UsersController.instance;
  }

  create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = User.create(new User({ name, email, password }));
    res.json(user);
  }

  findAll(req: Request, res: Response) {
    const users = User.findAll();
    res.json(users);
  }

  findOne(req: Request, res: Response) {
    const { id } = req.params;
    const user = User.findById(id);
    res.json(user);
  }

  update(req: Request, res: Response) {
    res.json({ message: 'Hello, World!' });
  }

  delete(req: Request, res: Response) {
    res.json({ message: 'Hello, World!' });
  }
}
