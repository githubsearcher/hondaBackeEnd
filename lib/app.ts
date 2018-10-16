
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import { ApiRouterFactory } from './router/api_router_factory';
class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();        
    }

    private config(): void{


        this.app.use(function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT , PATCH, DELETE, OPTIONS');
            // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
           res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,  x-xsrf-token, Content-Type, Authorization');
            next();
          });
          //this.app.use(cors());
            // parse application/json
          this.app.use(bodyParser.json({limit: '50mb'}));
            // parse application/x-www-form-urlencoded
          this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
          this.app.use('/', ApiRouterFactory.getApiRouter());
          
      
          // mongodb connectivity
      
            mongoose.connect("mongodb://localhost:27017/hondaDatabase", (err) => {
              if (err) {
                  console.log(err);
              } else {
                  console.log('Connected to MongoDb');
              }
            });
          mongoose.set('debug', false);
    }

}

export default new App().app;