import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthRoute } from './auth.route';
import { UsersRoute } from './users.route';

export class ApiRoutes {
  private static instance: ApiRoutes;
  public router = Router();

  private constructor() {
    this.init();
  }

  static getInstance(): ApiRoutes {
    if (!ApiRoutes.instance) ApiRoutes.instance = new ApiRoutes();
    return ApiRoutes.instance;
  }

  public init(): void {
    this.router.use(
      '/users',
      AuthMiddleware.checkNotAuthenticated,
      UsersRoute.getInstance().router,
    );
    this.router.use('/auth', AuthRoute.getInstance().router);

    // Add more routes here
  }
}
