let numericPattern = /^([0-9])*$/;
let stringPatternP = /^[a-zA-Z\s]*$/;
let stringPattern = /^[a-z]*$/;
let addressPattern = /^[a-zA-Z0-9._]*$/;
let mapPattern = /^[0-9]+,[0-9]*$/;
let passwordPattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;
let positiveFloatsPattern =/^(([0-9]+(?:\.[0-9]+)?)|([0-9]*(?:\.[0-9]+)?))$/;
let emailPattern = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/;



function userValidator(res, inputs){
    let validAddress = inputs.address.match(addressPattern);
    let validFirstName = inputs.first_name.toLowerCase().match(stringPattern);
    let validsecond_name = inputs.last_name.toLowerCase().match(stringPattern);
    let validuser_name = inputs.user_name.toLowerCase().match(stringPattern);
    let validEmail = inputs.email.match(emailPattern);
    let validPhoneNumber = inputs.phone_number.match(numericPattern);
    let validPassword = inputs.password.match(passwordPattern);
    if(!validAddress){
      return res.status(400).json({Error:"Invalid address"})
    }else if(!validEmail){
      return res.status(400).json({Error:"Invalid email"})
    }else if (!validPassword) {
      return res.status(400).json({Error:"Invalid password"})
    }else if(!validAddress){
      return res.status(400).json({Error:"Invalid address"})
    }else if(!validuser_name){
      return res.status(400).json({Error:"Ivalid user_name"})
    }else if (!validFirstName) {
      return res.status(400).json({Error:"Invalid first name"})
    }else if (!validPhoneNumber || inputs.phone_number.length != 10) {
      return res.status(400).json({Error:"Invalid phone_number"})
    }else if(!validsecond_name){
      return res.status(400).json({Error:"Invalid second name"})
    }
    return false;
  }
  function propertyValidator(res, inputs) {
    let validCategory = inputs.category.toLowerCase().match(stringPattern)
    let validName = inputs.name.toLowerCase().match(stringPattern)
    let validCity = inputs.city.toLowerCase().match(stringPattern);
    let validState = inputs.state.toLowerCase().match(stringPattern);
    let validDescription = inputs.description.toLowerCase().match(stringPatternP)
    let validPrice = inputs.price.match(positiveFloatsPattern);
    let validAddress = inputs.address.match(addressPattern);
    let validMap = inputs.map.match(mapPattern);
    let validReason = inputs.reason.toLowerCase().match(stringPattern)
    if (!validCategory) {
      return res.status(400).json({Error:"Invalid Category"})
    }else if (!validName) {
      return res.status(400).json({Error:"Make sure name reason, category city, state and description are strings"})
    }else if(!validReason){
      return res.status(400).json({Error:"Invalid reason"})
    }else if (!validState) {
      return res.status(400).json({Error:"Invalid state name."})
    }else if (!validCity) {
      return res.status(400).json({Error:"Invalid city name."})
    }else if (!validPrice ) {
      return  res.status(400).json({Error:'Invalid price'})
    }else if(!validAddress){
      return res.status(400).json({Error:"Invalid address"})
    }else if (!validMap){
      return res.status(400).json({Error:"Make sure that the you provide a valid map cordinates"})
    }else if(!validDescription) {
      return res.status(400).json({Error:"Invalid description"})
    }
    return false;
  }
module.exports = {userValidator, propertyValidator}