import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: { type: String ,required:true},
    phoneNo : { type: Number ,required:true},
    email: { type: String ,required:true},
    // createdAt : {type: Date, default: Date.now()},
    // time: {type: Number, default: 0}
});
var userModel = mongoose.model('users', userSchema);

export class  UserModels {
    constructor(){}
    createUser(data){
        var obj = new userModel(data);
        return new Promise((resolve, reject) => {
            obj.save().then(function (doc) {
                resolve(doc);
            }).catch(e=>{
                reject(e);
            });
        });
    };

    getUsers(condition) {
        return new Promise((resolve, reject) => {
            userModel.find(condition).then(function (doc) {     // apply sort by time in descending order
                resolve(doc);
            }).catch(e=>{
                reject(e);
            });
        });
    };

    getUsersWithCSVData() {
        return new Promise((resolve, reject) => {
            userModel.find({}, { _id: 0, name: 1, phoneNo: 1 , email: 1}).lean().exec().then(function (doc) {     
                resolve(doc);
            }).catch(e=>{
                reject(e);
            });
        });
    };

    // getOneUser(condition,selectParams={}) {
    //     return new Promise((resolve, reject) => {
    //         userModel.findOne(condition, selectParams).then(function (doc) {
    //             resolve(doc);
    //         }).catch(e=>{
    //             reject(e);
    //         });
    //     });
    // };

    // updateUser(condition, data, options={new: true}) {
    //     return new Promise((resolve, reject) =>{
    //         userModel.findOneAndUpdate(condition, data, options).then(function (doc) {
    //             resolve(doc);
    //         }).catch(e =>{
    //             reject(e);
    //         });
    //     });
    // };
}
