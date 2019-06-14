const express = require('express');
 const users = express.Router();
const records = require('../../models');

function asyncHandler(cb){
  return async (req, res, next)=>{
    try {
      await cb(req,res, next);
    } catch(err){
      next(err);
    }
  };
}

// /Get request to get all users
users.get('/', asyncHandler(async(req, res)=>{

  const gdb =  await records.getUsers()
  const users = gdb.users;
    if(users){
      res.json(users)
    }
    else{
      res.status(400).json({message:"No users found"})
    }

}));

//Send a get request to retrieve a single property
users.get('/:id', asyncHandler(async(req, res)=>{

    const user = await  records.getUser(req.params.id)

    if(user){
    res.json(user);}
    else {
      res.status(400).json({message:"Property not found"})
    }
  }));


//send a post request to signup a user
users.post('/signup', asyncHandler(async(req, res)=>{
  if(req.body.username && req.body.password){
    const user = await records.createUser({
      username: req.body.username,
      password: req.body.password
    });
    res.status(201).json(user);
  }else{
    res.status(400).json({message: "password and Username required."});
  }
}));

//send a post request to signin a user
users.post('/login', asyncHandler(async(req, res)=>{
  if(req.body.username && req.body.password){

    const gdb =  await records.getData()
    const users = gdb.users;
    console.log(users)

    for (var i = 0; i < users.length; i++) {
      console.log(req.body.username +"==="+users[i].username)
      if(users[i].username === req.body.username && users[i].password === req.body.password){
        res.status(201).json({
          msg:"User logged in"
        });
      }
    }
  res.status(201).json({
    msg:"Incorrect details"
  });



  }else{
    res.status(400).json({message: "password and Username required."});
  }
}));

//send a put request to update a user
users.put('/:id', asyncHandler(async(req, res)=>{
  const user = await  records.getUser(req.params.id);
    if (user){
      user.username = req.body.username;
      user.password = req.body.password;

      await records.updateUser(user);

      res.status(204).end();
    }
    else{
      res.status(404).json({message:"Property wasn't found"});
    }


}));


module.exports = users;
