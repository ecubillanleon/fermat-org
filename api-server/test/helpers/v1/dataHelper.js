var faker = require('faker');
var mongoose = require("mongoose");

exports.generateDataComp = function(){

    return {
        "platfrm_id" : mongoose.Types.ObjectId().toString(),
        "suprlay_id" :  mongoose.Types.ObjectId().toString(),
        "layer_id" :  mongoose.Types.ObjectId(),
        "name" : faker.name.firstName(),
        "type" : "addon",
        "description": faker.lorem.sentence(),
        "difficulty": 5,
        "code_level": faker.lorem.sentence(),
        "repo_dir": "root",
        "scrnshts": false,
        "found": false
    };

};

exports.generateDataCompDev = function(){
    return {
        "comp_id" : mongoose.Types.ObjectId().toString(),
        "dev_id" :  mongoose.Types.ObjectId().toString(),
        "role" : faker.name.firstName(),
        "scope": faker.name.firstName(),
        "percnt": 50
    };

};

exports.generateDataLifeCicle = function(){
    return {
        "comp_id" : mongoose.Types.ObjectId().toString(),
        "name" : faker.name.firstName(),
        "target": Date(),
        "reached": Date()
    };
};

exports.generateDataStep = function(){

    return {
        "proc_id" : mongoose.Types.ObjectId().toString(),
        "comp_id" : mongoose.Types.ObjectId().toString(),
        "type": faker.lorem.sentence(),
        "title": faker.lorem.sentence(),
        "desc": faker.lorem.sentence(),
        "order": 0
    };
};

exports.generateDataProc = function(){
    return {
        "platfrm" : faker.name.firstName(),
        "name" : faker.name.firstName(),
        "desc": faker.lorem.sentence(),
        "prev": faker.lorem.sentence(),
        "next": faker.lorem.sentence()
    };
};