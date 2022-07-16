'use strict';
const modelFolder = require('../models');
const express = require('express');
const routers = express.Router();
const bearer=require("../middleware/bearerAuth");
const acl=require("../middleware/acl");

routers.param("model",(req,res,next)=>{
    if (modelFolder[req.params.model]) {
        req.model = modelFolder[req.params.model];
        next();
    } else {
        next('invalid input');
    }
}) 
routers.post('/:userid/:model',bearer, acl('createPosts'),async(req,res)=>{
    const userid = parseInt(req.params.userid);
    let newModel = req.body;
    let model = await req.model.createRecord(userid,newModel);
    if(model){
       res.status(201).json(model);
    }else{
        res.status(403).send('UserId not match ');
    }
})

routers.get('/:model',bearer,acl('read'),async(req,res)=>{
    let allData = await req.model.readRecord();
    res.status(200).send(allData);

})
routers.get('/:model/:id',bearer,acl('read'),async(req,res)=>{
    const id = parseInt(req.params.id);
    let oneData = await req.model.readRecord(id);
    if(oneData){
            res.status(200).send(oneData);
    }else{
        res.status(403).send(`There is no model with this id: ${id}`);
    }

})

routers.put('/:model/:id',bearer, acl('updateHisPosts'),async(req,res)=>{
    const id = parseInt(req.params.id);
    let updateModel = req.body; 
    let updatedModel = await req.model.updateRecord(updateModel,id);
    if(updatedModel[0]!=0){
        res.status(201).json(updatedModel[1]);
    }else{
        res.status(403).send(`There is no model with this id: ${id}`);
    }
  
})
routers.delete('/:model/:id',bearer, acl('deleteHisPosts'),async(req,res)=>{
    let id = parseInt(req.params.id);
    let deletedModel = await req.model.removeRecord(id);
    if(deletedModel){
        res.send("Deleted Successfully");
        res.status(204);
    }
    else{
        res.status(403).send(`There is no model with this id: ${id}`);
    }
    
})
module.exports = routers;