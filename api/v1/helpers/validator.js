// import validator from 'validator';
//

import{
  postPropertiesController,
  getPropertiesController,
  updatePropertyController,
  getPropertyController,
  deletePropertyController,
  getPropertyTypeController
} from '../controllers/properties';
import {
  signupUserController,
  signinUserController,
  getUserController,
  getUsersController,
  updateUserController,
  deleteUserController
} from '../controllers/users'



function inputValidator(res, inputs){
  if(Object.keys(inputs).length == 7 && inputs.firstName){
      if (inputs.password.length < 6 || inputs.password != inputs.confirmPassword){
    res.status(400).json({msg:'Password should be longer than 6'})
  }else if (isNaN(inputs.phoneNumber) || inputs.phoneNumber.length !=10) {
    res.status(400).json({msg:'Phone number should be a digit and be 10 in length'})
  }else if (inputs.email.indexOf('@') == -1 || inputs.email.indexOf('.') == -1) {
    res.status(400).json({msg:'invalid email'})
  }else if (!isNaN(inputs.firstName) || !isNaN(inputs.secondName) || !isNaN(inputs.userName)) {
    res.status(400).json({msg:"username, firstName and secondName should be a string"})
  }else {
    signupUserController(res, inputs)
  }
}else if(Object.keys(inputs).length == 10 && inputs.category){
                if (!isNaN(inputs.category) || !isNaN(inputs.name) ||
                      !isNaN(inputs.state) || !isNaN(inputs.city) ||
                      !isNaN(inputs.reason) || !isNaN(inputs.description)) {
                    res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
                  }else if(inputs.map.indexOf(',') == -1){
                    res.status(400).json({
                      status:400,
                      message:"Make sure that the you provide a valid map cordinates"
                    })
                  }else if (isNaN(inputs.map.split(",")[0]) || isNaN(inputs.map.split(",")[1])){
                    res.status(400).json({
                      status:400,
                      message:"Make sure that the you provide a valid map cordinates"
                    })
                  }else{
                    postPropertiesController(res, inputs)
                  }
                }else{
                  res.status(400).json({
                    status:"400",
                    message: 'Please fill all the required fields.'
                  });
                }


      }





module.exports = {inputValidator};
