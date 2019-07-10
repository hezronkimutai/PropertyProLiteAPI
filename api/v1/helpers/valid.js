



async function isAllUserInputs(res, inputs){
  if(Object.keys(inputs).length != 7){
    return res.status(400).json({
      status:"400",
      message: 'Please fill all the required fields.'
    });
  }
}
async function isAllPropertyInputs(res, inputs){
  if(Object.keys(inputs).length != 10){
    return res.status(400).json({
      status:"400",
      message: 'Please fill all the required fields.'
    });
  }
}


async function isValidEmail(res, input){
  if (input.indexOf('@') == -1 || input.indexOf('.') == -1 || input.indexOf('@') > input.indexOf('.')) {
    return res.status(400).json({Error:'invalid email'})
  }
  return true
}


async function isValidPhoneNumber(res, input){
  if (isNaN(input) || input.length !=10) {
  return  res.status(400).json({msg:'Phone number should be a digit and be 10 in length'})
  }
  return true

}


async function isValidPassword(res, input1, input2){
  if (input1.length < 6 || input1 != input2){
return res.status(400).json({msg:'Password should be longer than 6'})
}
  return true
}
async function isValidUserName(res, input){
  if (!isNaN(input)) {
    res.status(400).json({msg:"username, firstName and secondName should be a string"})
  }
  return true
}
async function isValidFirstName(res, input){
  if (!isNaN(input)) {
    res.status(400).json({msg:"username, firstName and secondName should be a string"})
  }
  return true
}
async function isVAlidSecondName(res, input){
  if (!isNaN(input)) {
    res.status(400).json({msg:"username, firstName and secondName should be a string"})
  }
  return true
}
async function isValidAddress(res, input){
  return true
}
async function isValidCategory(res, input){
  if (!isNaN(input)) {
      return res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
    }
  return true
}
async function isValidName(res, input){
  if (!isNaN(input)) {
      return res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
    }
  return true
}

async function isValidReason(res, input){
  if (!isNaN(input)) {
      return res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
    }
  return true
}

async function isValidPrice(res, input){
  return true
}

async function isValidState(res, input){
  if (!isNaN(input)) {
      return res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
    }
  return true
}

async function isVAlidCity(res, input){
  if (!isNaN(input)) {
      return res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
    }
  return true
}

async function isValidPAddress(res, input){
  return true
}

async function isVAlidMap(res, input){
  if (isNaN(input.split(",")[0]) || isNaN(input.split(",")[1])){
  return res.status(400).json({
      status:400,
      message:"Make sure that the you provide a valid map cordinates"
    })
  }else if(input.indexOf(',') == -1){
    return res.status(400).json({
      status:400,
      message:"Make sure that the you provide a valid map cordinates"
    })
  }
  return true
}

async function isValidDescription(res, input){
  if (!isNaN(input)) {
      return res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
    }
  return true
}
module.exports = {
  isAllUserInputs,
  isAllPropertyInputs,
  isValidEmail,
  isValidPhoneNumber,
  isValidPassword,
  isValidUserName,
  isValidFirstName,
  isVAlidSecondName,
  isValidAddress,
  isValidCategory,
  isValidName,
  isValidReason,
  isValidPrice,
  isValidState,
  isVAlidCity,
  isValidPAddress,
  isVAlidMap,
  isValidDescription
}
