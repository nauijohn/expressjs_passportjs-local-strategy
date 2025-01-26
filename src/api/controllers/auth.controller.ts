import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { User } from '../models/user.model';

export class AuthController {
  private static instance: AuthController;

  private constructor() {}

  static getInstance(): AuthController {
    if (!AuthController.instance)
      AuthController.instance = new AuthController();
    return AuthController.instance;
  }

  async signUp(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      User.create(new User({ email, password: hashedPassword, name }));
      res.redirect('/sign-in');
    } catch {
      res.redirect('/sign-up');
    }
  }

  async signOut(req: Request, res: Response) {
    console.log('Signing out...');
    req.logOut({ keepSessionInfo: false }, () => {});
    res.redirect('/sign-in');
  }
}
