import passport from 'passport';

import { initializePassport } from '../../passport-config';
import { User } from '../models/user.model';

export class LocalPassportStrategy {
  static readonly passport = passport;

  private constructor() {}

  public static init(): void {
    initializePassport(
      passport,
      (email) => User.findByEmail(email),
      (id) => User.findById(id),
    );
  }
}
