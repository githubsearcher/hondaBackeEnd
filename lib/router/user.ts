import * as express from 'express';
import { Router } from 'express';
import { UsersController }from '../controller/user';

export class UserRouter {
    private _userController : UsersController;
    router: Router;
    constructor() {
        this.router= express.Router();
        this._userController = new UsersController();
        this.initRoutes();
    }
    initRoutes(){
       this.router.post('/', this._userController.createUser);
    //    this.router.patch('/:id', this._userController.updateUser);
       this.router.get('/', this._userController.getUser)
       this.router.get('/csvFile', this._userController.getCSVFile)
    }
}