import * as bcrypt from 'bcrypt';
import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';

interface CustomStrategyOptions extends VerifyFunction {
  usernameField?: string;
}

export function initializePassport(
  passport: PassportStatic,
  getUserByEmail: (email: string) => {
    id: string;
    name: string;
    email: string;
    password: string;
  },
  getUserById: (id: string) => {
    id: string;
    name: string;
    email: string;
    password: string;
  },
) {
  const authenticateUser: VerifyFunction = async (email, password, done) => {
    console.log('authenticateUser:', email);
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (error: unknown) {
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' } as CustomStrategyOptions,
      authenticateUser,
    ),
  );
  passport.serializeUser(
    (
      user: {
        id: string;
        name: string;
        email: string;
        password;
      },
      done,
    ) => done(null, user.id),
  );
  passport.deserializeUser((id: string, done) => done(null, getUserById(id)));
}
