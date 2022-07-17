'use strict';

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class Collection {

  constructor(model) {
    this.model = model;
  }

  async createRecord(usernameFromParams,obj) {
    console.log("usernameFromParams is",usernameFromParams,"userID is",obj.user_name,"Obj is",obj);
    obj.user_name=usernameFromParams;
    console.log("usernameFromParams is",usernameFromParams,"userID is",obj.user_name,"Obj is",obj);
        try {     
            let newRecord = await this.model.create(obj);
            return newRecord;
        } catch (e) {
            console.error("Error in creating a new record in model ", this.model)
        } 
    
} 

async readRecordFilterWithProcess(process) {
    try {
        let record = null;
        if (process) {
            record = await this.model.findAll({ where: { process: process } });
            return record;
        }
        else {
            record = await this.model.findAll();
            return record;
        }

    } catch (e) {
        console.error("Error in reading record in model ", this.model);
    }

}

async readRecordFilterWithCategory(category) {
    try {
        let record = null;
        if (category) {
            record = await this.model.findAll({ where: { category: category } });
            return record;
        }
        else {
            record = await this.model.findAll();
            return record;
        }

    } catch (e) {
        console.error("Error in reading record in model ", this.model)
    }

}


async readRecordFilterWithLocation(location) {
    try {
        let record = null;
        if (location) {
            record = await this.model.findAll({ where: { location: location } });
            return record;
        }
        else {
            record = await this.model.findAll();
            return record;
        }

    } catch (e) {
        console.error("Error in reading record in model ", this.model)
    }

}


async readFiltered(process,category,location) {
    try {
        let record = null;
        if (process!=="all"&&category!=="all"&&location!=="all") {
            record = await this.model.findAll({ where: { process:process , category:category , location: location } });
            return record;
        }else if(process!=="all"){
            if(process!=="all"&&category!=="all"){
                record = await this.model.findAll({ where: { process:process , category:category } });
                return record;
            }else if(process!=="all"&&location!=="all"){
                record = await this.model.findAll({ where: { process:process , location:location } });
                return record;
            }else{
                record = await this.model.findAll({ where: { process:process } });
                return record;
            }
        }else if(category!=="all"){
            if(category!=="all"&&process!=="all"){
                record = await this.model.findAll({ where: { process:process , category:category } });
                return record;
            }else if(category!=="all"&&location!=="all"){
                record = await this.model.findAll({ where: { category:category , location:location } });
                return record;
            }else{
                record = await this.model.findAll({ where: { category:category } });
                return record;
            }
        }else if (location!=="all"){
            if(location!=="all"&&process!=="all"){
                record = await this.model.findAll({ where: { process:process , location:location } });
                return record;
            }else if(location!=="all"&&category!=="all"){
                record = await this.model.findAll({ where: { category:category , location:location } });
                return record;
            }else{
                record = await this.model.findAll({ where: { location:location } });
                return record;
            }
        }
        else {
            record = await this.model.findAll();
            return record;
        }

    } catch (e) {
        console.error("Error in reading record in model ", this.model)
    }

}

async readDashboard(username) {
    try {
        let record = null;
            record = await this.model.findAll({ where: { user_name: username } });
            return record;
    } catch (e) {
        console.error("Error in reading record in model ", this.model)
    }

}


async updateRecord(username,obj,dataID) {
    let updated=null;
    if (!dataID) {
        throw new Error('No id provided for model ', this.model)
    }
    let record = await this.model.findOne({ where: { id: dataID } });
    if(record){
        if(username===record.user_name){
            try {
              updated = await this.model.update(obj,{where:{id:dataID},returning: true});
              console.log("Updated",updated);
              return updated;
          } catch (e) {
              console.error("Error in updating record in model ", this.model)
          }
            }else{
              console.error('You can not update posts of other users !!  ');
            }
    }else{
        console.error(`There is no model with this id: ${dataID}`);
    }
    
} 


async removeRecord(username,dataID) {
    if (!dataID) {
        throw new Error('No id provided for model ', this.model)
    }
    let record = await this.model.findOne({ where: { id: dataID } });
    if(record){
        if(username===record.user_name){
            try {
                let deleted = await this.model.destroy({ where: { id: dataID } });
                return deleted;
            } catch (e) {
                console.error('Error in deleting record in model ', this.model);
            }
        }else{
            console.error('You can not delete posts of other users !!  ');
          }
    }else{
        console.error(`There is no model with this id: ${dataID}`);
    }
    
}
}

module.exports = Collection;