const records = require('../models');

async function propertyInputValidator(res, inputs) {
  if (inputs.length !=10) {
    res.status(400).json({
      status:"400",
      message: 'password, username and image required.'
    });
  }
    if (!isNaN(inputs[0]) || !isNaN(inputs[1]) ||
        !isNaN(inputs[4]) || !isNaN(inputs[5]) ||
        !isNaN(inputs[2]) || !isNaN(inputs[8])) {
      res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
    }
    if(inputs[7].indexOf(',') == -1){
      res.status(400).json({
        status:400,
        message:"Make sure that the you provide a valid map cordinates"
      })
    }

    if (isNaN(inputs[7].split(",")[0]) || isNaN(inputs[7].split(",")[1])){
      res.status(400).json({
        status:400,
        message:"Make sure that the you provide a valid map cordinates"
      })
    }
}

module.exports={
  propertyInputValidator
};
