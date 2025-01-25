import express, { Request, Response } from 'express';

const users = [];

function main() {
  console.log('Hello World');

  const app = express();

  app.set('view-engine', 'ejs');
  app.use(express.urlencoded({ extended: false }));

  app.get('/', (req: Request, res: Response) => {
    res.render('index.ejs', { name: 'John' });
  });

  app.get('/register', (req: Request, res: Response) => {
    res.render('register.ejs');
  });

  app.get('/login', (req: Request, res: Response) => {
    res.render('login.ejs');
  });

  app.post('/register', (req: Request, res: Response) => {});
  app.post('/login', (req: Request, res: Response) => {});

  app.listen(3000, () => {
    console.log('Server is running on port 3000...');
  });
}

main();
