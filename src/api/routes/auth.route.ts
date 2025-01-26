import { Router } from 'express';
import passport from 'passport';

import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoute {
  private static instance: AuthRoute;

  public readonly router = Router();
  private readonly controller = AuthController.getInstance();

  private constructor() {
    this.init();
  }

  static getInstance(): AuthRoute {
    if (!AuthRoute.instance) AuthRoute.instance = new AuthRoute();
    return AuthRoute.instance;
  }

  public init(): void {
    this.router.post(
      '/sign-up',
      AuthMiddleware.checkNotAuthenticated,
      this.controller.signUp,
    );
    this.router.post(
      '/sign-in',
      AuthMiddleware.checkNotAuthenticated,
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/sign-in',
        failureFlash: true,
      }),
    );
    this.router.delete('/sign-out', this.controller.signOut);
  }
}
