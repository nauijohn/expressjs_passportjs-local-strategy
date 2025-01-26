import { Router } from 'express';

import { AuthMiddleware } from '../../api/middlewares/auth.middleware';
import { ClientController } from '../controllers';

export class ClientRoutes {
  private static instance: ClientRoutes;

  public readonly router = Router();
  private readonly controller = ClientController.getInstance();

  private constructor() {
    this.init();
  }

  static getInstance(): ClientRoutes {
    if (!ClientRoutes.instance) ClientRoutes.instance = new ClientRoutes();
    return ClientRoutes.instance;
  }

  public init(): void {
    this.router.use(
      '/sign-up',
      AuthMiddleware.checkNotAuthenticated,
      this.controller.signUp,
    );
    this.router.use(
      '/sign-in',
      AuthMiddleware.checkNotAuthenticated,
      this.controller.signIn,
    );
    this.router.use(
      '/',
      AuthMiddleware.checkAuthenticated,
      this.controller.index,
    );

    // Add more controllers here
  }
}
