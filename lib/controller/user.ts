import * as express from 'express';
import { UserModels } from './../model/user';
// import * as csv from 'fast-csv';
import * as fs from 'graceful-fs';
import  * as zlib  from 'zlib';

var csv      = require('csv-express');
var userModel = new UserModels();
export class UsersController {
    private userModel : UserModels;
    constructor() {
    }

    // create user
    createUser(req, res, next) {
        try {
            var createUserData = {
                "name": req.body.name,
                "phoneNo": req.body.phoneNo,
                "email": req.body.email
            }
              var data:any =  userModel.createUser(createUserData).then((userRes: any)=>{
                if(Object.keys(userRes).length > 0) {
                res.status(200).json(userRes);
               }

            });
          } catch(e) {
            res.status(400).json(e);
        }
    }

    // // update user

    // updateUser(req, res, next) {
    //     try {
    //     var userId = req.params.id;
    //     var  updateUserData = {
    //         "time": req.body.time
    //     }
    //     var data:any =  userModel.updateUser({_id: userId}, updateUserData).then((userRes: any)=>{
    //      if(Object.keys(userRes).length > 0) {
    //         res.status(200).json(userRes);
    //      }
    //     });
    //     } catch(e) {
    //         res.status(400).json(e);
    //     }
    // }

     // get user list 

    getUser(req, res, next) {
        try {
            var data:any =  userModel.getUsers({}).then((userRes: any)=>{
                if(Object.keys(userRes).length > 0) {
                   res.status(200).json(userRes);
                }
               });
        } catch(e) {
            res.status(400).json(e);
        }

    }

    getCSVFile(req, res, next) {
        try {
     var filename   = "users.csv";
    var data = userModel.getUsersWithCSVData().then((userRes: any) => {
    console.log('userRes>>>>>>>>>>>>>....', userRes);
        res.setHeader('Content-Type', 'text/csv');

        res.setHeader("Content-Disposition", 'attachment; filename='+filename);
        
        res.csv(userRes, true);

        console.log('after csv data................', userRes)
       //  res.status(200).json(userRes);
        });
        } catch(e) {
            res.status(400).json(e);
        }

    }
}