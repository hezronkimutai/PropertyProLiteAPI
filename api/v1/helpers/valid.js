let numericPattern = /^[0-9]*$/;
let stringPattern = /^[a-zA-Z\s]*$/;
let addressPattern = /^[a-zA-Z0-9._]*$/;
let mapPattern = /^[0-9]+,[0-9]*$/;
let passwordPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*$/;
let positiveFloatsPattern =/^(([0-9]+(?:\.[0-9]+)?)|([0-9]*(?:\.[0-9]+)?))$/;
let emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validator(res, inputs){
  if(Object.keys(inputs).length == 8){
    let validAddress = inputs.address.match(addressPattern);
    let validFirstName = inputs.firstName.match(stringPattern);
    let validSecondName = inputs.secondName.match(stringPattern);
    let validUserName = inputs.userName.match(stringPattern);
    let validEmail = inputs.email.match(emailPattern);
    let isValidPhoneNumber = inputs.phoneNumber.match(numericPattern);
    let validPassword = inputs.password.match(passwordPattern);
    if(!validAddress){
      res.status(400).json({Error:"Invalid address"})
    }else if(!validEmail){
      res.status(400).json({Error:"Invalid email"})
    }else if (!validPassword || inputs.password.length < 6) {
      res.status(400).json({Error:"Invalid password"})
    }else if(inputs.password != inputs.confirmPassword){
      res.status(400).json({Error: "Passwords don't match"})
    }else if(!validAddress){
      return res.status(400).json({Error:"Invalid address"})
    }else if(!validUserName){
      res.status(400).json({Error:"Ivalid username"})
    }else if (!validFirstName) {
      res.status(400).json({Error:"Invalid first name"})
    }else if(!validSecondName){
      res.status(400).json({Error:"Invalid second name"})
    }
  }else if(Object.keys(inputs).length == 10) {
    let validCategory = inputs.category.match(stringPattern)
    let validName = inputs.name.match(stringPattern)
    let validCity = inputs.city.match(stringPattern);
    let validState = inputs.state.match(stringPattern);
    let validDescription = inputs.description.match(stringPattern)
    let validPrice = inputs.price.match(positiveFloatsPattern);
    let validAddress = inputs.address.match(addressPattern);
    let validMap = inputs.map.match(mapPattern);
    let validReason = inputs.map.match(stringPattern)
    if (!validCategory) {
      return res.status(400).json({Error:"Invalid Category"})
    }else if (!validName) {
      return res.status(400).json({Error:"Make sure name reason, category city, state and description are strings"})
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
  }else {
    res.status(400).json({Error:"Please fill all the required fields"})
  }
}
module.exports = {validator}
