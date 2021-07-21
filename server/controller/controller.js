var Userdb = require('../model/model');
// create and save new user
exports.create = (req,res)=>{
console.log("Coming data",req.body)
    //validate request
if(!req.body){
    res.status(400).send({message:"Content can not be an empty!"});
    return;
}
     const user = new Userdb({
         name:req.body.name,
         email:req.body.email,
         //gender:req.body.gender,
         status:req.body.status,
         phnumber: req.body.phnumber,
         address: req.body.address,
         cname: req.body.cname,
         cl: req.body.cl
     })
    user
        .save(user)
        .then(data =>{
            res.redirect("/add-user")
            //res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message:err.message || "Some error occured while creating a create operation"

            });
        });
}
// retrieve and return all  users/retrieve and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}
//Update
exports.update =(req,res)=>{
if(!req.body){
    return res
     .status(400)
     .send({message : "Data to update can not be empty"})
}
const id = req.params.id;
Userdb.findByIdAndUpdate(id,req.body,{userFindAndModify: false})
    .then(data =>{
        if(!data){
            res.status(404).send({message: `Cannot Update User with ${id}.Maybe user not found!`})
        }else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({message : "Error Update user information"})
    })
}
//Delete
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}