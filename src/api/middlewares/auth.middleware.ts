import { NextFunction, Request, Response } from 'express';

export class AuthMiddleware {
  private constructor() {}

  static checkNotAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (req.isAuthenticated()) return res.redirect('/');
    next();
  }

  static checkAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) return next();
    res.redirect('/sign-in');
  }
}
