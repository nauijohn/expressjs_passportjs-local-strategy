import { Request, Response } from 'express';

interface RequestWithUser extends Request {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
}

export class ClientController {
  private static instance: ClientController;

  private constructor() {}

  static getInstance(): ClientController {
    if (!ClientController.instance)
      ClientController.instance = new ClientController();
    return ClientController.instance;
  }

  index(req: RequestWithUser, res: Response) {
    console.log('ClientController: index...');
    res.render('index.ejs', { name: req.user['name'] });
  }

  signUp(req: Request, res: Response) {
    console.log('ClientController: signUp...');
    res.render('sign-up.ejs');
  }

  signIn(req: Request, res: Response) {
    res.render('sign-in.ejs');
  }
}
