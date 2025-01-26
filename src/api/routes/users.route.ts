import { Router } from 'express';

import { UsersController } from '../controllers/users.controller';

export class UsersRoute {
  private static instance: UsersRoute;

  public readonly router = Router();
  private readonly controller = UsersController.getInstance();

  private constructor() {
    this.init();
  }

  static getInstance(): UsersRoute {
    if (!UsersRoute.instance) UsersRoute.instance = new UsersRoute();
    return UsersRoute.instance;
  }

  public init(): void {
    this.router.get('/', this.controller.findAll);
    this.router.get('/:id', this.controller.findOne);
    this.router.post('/', this.controller.create);
    this.router.patch('/', this.controller.update);
    this.router.delete('/', this.controller.delete);
  }
}
