import * as express from 'express';
import { Router } from 'express';
import { UserRouter } from './user';


export class ApiRouterFactory {
    private constructor() {}

  static getApiRouter () {
    const router: Router = express.Router();
  
    const usersRouter: Router = new UserRouter().router;


    router.use('/user', usersRouter);
    
    router.get('/', function(req, res){
        res.status(200).json({message: "Server is hitting..."})
    });
    return router;
  }
}
