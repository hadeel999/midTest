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
routers.post('/:username/:model',bearer, acl('createPosts'),async(req,res)=>{
    const username = req.params.username;
    let newModel = req.body;
    let model = await req.model.createRecord(username,newModel);
    if(model){
       res.status(201).json(model);
    }else{
        res.status(403).send('Username not exist ');
    }
})

routers.get('/home/:model',async(req,res)=>{
    console.log("Model without user");
    let allData = await req.model.readRecordFilterWithProcess();
    res.status(200).send(allData);

})

routers.get('/home/:model/process/:process',async(req,res)=>{
    const process = req.params.process;
    console.log("Process is", process)
    let oneData = await req.model.readRecordFilterWithProcess(process);
    if(oneData){
            res.status(200).send(oneData);
    }else{
        res.status(403).send(`Process must be sell or rent! `);
    }

})

routers.get('/home/:model/category/:category',async(req,res)=>{
    const category = req.params.category;
    console.log("category is", category)
    let oneData = await req.model.readRecordFilterWithCategory(category);
    if(oneData){
            res.status(200).send(oneData);
    }else{
        res.status(403).send(`Category must be one of these: 'houses','apartments','villas','farms','lands'.`);
    }

})


routers.get('/home/:model/location/:location',async(req,res)=>{
    const location = req.params.location;
    console.log("location is", location)
    let oneData = await req.model.readRecordFilterWithLocation(location);
    if(oneData.length!=0){
            res.status(200).send(oneData);
    }else{
        res.status(403).send(`No realestates in this location ${location}! `);
    }

})



routers.get('/home/:model/process/:process/category/:category/location/:location',async(req,res)=>{
    const process = req.params.process;
    const category = req.params.category;
    const location = req.params.location;
    let oneData = await req.model.readFiltered(process,category,location);
    if(oneData.length!=0){
            res.status(200).send(oneData);
    }else{
        res.status(403).send(`No realestates in these specifications.`);
    }

})


routers.get('/:username/dashboard/:model',bearer,acl('read'),async(req,res)=>{
    const username = req.params.username;
    let oneData = await req.model.readDashboard(username);
    if(oneData.length!=0){
            res.status(200).send(oneData);
    }else{
        res.status(403).send(`Your Dashboard is Empty.`);
    }

})



routers.get('/:username/:model',bearer,acl('read'),async(req,res)=>{
    let allData = await req.model.readRecordFilterWithProcess();
    res.status(200).send(allData);

})



routers.get('/:username/:model/process/:process',bearer,acl('read'),async(req,res)=>{
    const process = req.params.process;
    console.log("Process is", process)
    let oneData = await req.model.readRecordFilterWithProcess(process);
    if(oneData){
            res.status(200).send(oneData);
    }else{
        res.status(403).send(`Process must be sell or rent!`);
    }

})

routers.get('/:username/:model/category/:category',bearer,acl('read'),async(req,res)=>{
    const category = req.params.category;
    console.log("category is", category)
    let oneData = await req.model.readRecordFilterWithCategory(category);
    if(oneData){
            res.status(200).send(oneData);
    }else{
        res.status(403).send(`Category must be one of these: 'houses','apartments','villas','farms','lands'.`);
    }

})

routers.get('/:username/:model/location/:location',bearer,acl('read'),async(req,res)=>{
    const location = req.params.location;
    console.log("location is", location)
    let oneData = await req.model.readRecordFilterWithLocation(location);
    if(oneData.length!=0){
            res.status(200).send(oneData);
    }else{
        res.status(403).send(`No realestates in this location ${location}! `);
    }

})

routers.get('/:username/:model/process/:process/category/:category/location/:location',bearer,acl('read'),async(req,res)=>{
    const process = req.params.process;
    const category = req.params.category;
    const location = req.params.location;
    let oneData = await req.model.readFiltered(process,category,location);
    if(oneData.length!=0){
            res.status(200).send(oneData);
    }else{
        res.status(403).send(`No realestates in these specifications.`);
    }

})


routers.put('/:username/:model/:id',bearer, acl('updateHisPosts'),async(req,res)=>{
    const username = req.params.username;
    const id = parseInt(req.params.id);
    let updateModel = req.body; 
    let updatedModel = await req.model.updateRecord(username,updateModel,id);
    if(updatedModel){
        if(updatedModel[0]!=0){
            res.status(201).json(updatedModel[1]);
        }else{
            res.status(403).send(`There is no model with this id: ${id}`);
        }
    }
    else{
        res.status(403).send(`There is an error in updating post, check the post id or if you are signed in or not`);
    }
   
  
})
routers.delete('/:username/:model/:id',bearer, acl('deleteHisPosts'),async(req,res)=>{
    const username = req.params.username;
    let id = parseInt(req.params.id);
    let deletedModel = await req.model.removeRecord(username,id);
    if(deletedModel){
        res.send("Deleted Successfully");
        res.status(204);
    }
    else{
        res.status(403).send(`There is an error in deleting post, check the post id or if you are signed in or not`);
    }
    
})
module.exports = routers;