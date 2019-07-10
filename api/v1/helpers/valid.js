async function isValidEmail(res, input){
  if (input.indexOf('@') == -1 || input.indexOf('.') == -1 || input.indexOf('@') > input.indexOf('.')) {
    return res.status(400).json({Error:'invalid email'})
  }
  return true
}
async function isValidPhoneNumber(res, input){
  return true

}
async function isValidPassword(res, input1, input2){
  return true
}
async function isValidUserName(res, input){
  return true
}
async function isValidFirstName(res, input){
  return true
}
async function isVAlidSecondName(res, input){
  return true
}
async function isValidAddress(res, input){
  return true
}
// isValidFirstName(inputs.firstName);
// signupUserController(res, inputs)

  async function isValidCategory(res, input){
    return true
  }
  async function isValidName(res, input){
    return true
  }
  async function isValidReason(res, input){
    return true
  }
  async function isValidPrice(res, input){
    return true
  }
  async function isValidState(res, input){
    return true
  }
  async function isVAlidCity(res, input){
    return true
  }
  async function isValidPAddress(res, input){
    return true
  }
  async function isVAlidMap(res, input){
    return true
  }
  async function isValidDescription(res, input){
    return true
  }

// 
// export default validator;
