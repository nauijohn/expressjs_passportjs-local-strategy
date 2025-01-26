import dotenv from 'dotenv';
import express from 'express';
import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import passport from 'passport';

import { ApiRoutes } from './api/routes';
import { LocalPassportStrategy } from './api/strategies/local-passport.strategy';
import { ClientRoutes } from './client/routes';

// const users: {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// }[] = [];

function main() {
  console.log('Hello World');

  dotenv.config({
    path: '.env.dev',
  });

  const app = express();

  LocalPassportStrategy.init();

  app.set('view-engine', 'ejs');

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(flash());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride('_method'));

  app.use('/api', ApiRoutes.getInstance().router);
  app.use('/', ClientRoutes.getInstance().router);

  // app.get('/', checkAuthenticated, (req: Request, res: Response) => {
  //   res.render('index.ejs', { name: req.user['name'] });
  // });

  // app.get('/register', checkNotAuthenticated, (req: Request, res: Response) => {
  //   res.render('register.ejs');
  // });

  // app.get('/login', checkNotAuthenticated, (req: Request, res: Response) => {
  //   console.log('Viewing login page...');
  //   res.render('login.ejs');
  // });

  // app.post('/register', checkNotAuthenticated, async (req, res) => {
  //   try {
  //     const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //     console.log('Hashed password:', hashedPassword);
  //     users.push({
  //       id: Date.now().toString(),
  //       name: req.body.name,
  //       email: req.body.email,
  //       password: hashedPassword,
  //     });
  //     res.redirect('/login');
  //   } catch {
  //     res.redirect('/register');
  //   }
  // });

  // app.post(
  //   '/login',
  //   checkNotAuthenticated,
  //   passport.authenticate('local', {
  //     successRedirect: '/',
  //     failureRedirect: '/login',
  //     failureFlash: true,
  //   }),
  // );

  // app.delete('/logout', (req: Request, res: Response) => {
  //   req.logOut({ keepSessionInfo: false }, () => {});
  //   res.redirect('/login');
  // });

  app.listen(3000, () => {
    console.log('Server is running on port 3000...');
  });
}

main();
