/* eslint-disable camelcase */
const numericPattern = /^([0-9])*$/
const stringPatternP = /^[a-zA-Z\s]*$/
const stringPattern = /^[a-z]*$/
const addressPattern = /^[a-zA-Z0-9.]*$/
const mapPattern = /^[0-9]+,[0-9]*$/
const passwordPattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/
const positiveFloatsPattern = /^(([0-9]+(?:\.[0-9]+)?)|([0-9]*(?:\.[0-9]+)?))$/
const emailPattern = /^([a-zA-Z0-9.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/

function userValidator (res, inputs) {
  const validAddress = inputs.address.match(addressPattern)
  const validFirstName = inputs.firstname.toLowerCase().match(stringPattern)
  const validsecondname = inputs.lastname.toLowerCase().match(stringPattern)
  const validusername = inputs.username.toLowerCase().match(stringPattern)
  const validEmail = inputs.email.match(emailPattern)
  const validPhoneNumber = inputs.phonenumber.match(numericPattern)
  const validPassword = inputs.password.match(passwordPattern)
  if (!validAddress) {
    return res.status(400).json({ Error: 'Invalid address' })
  } else if (!validEmail) {
    return res.status(400).json({ Error: 'Invalid email' })
  } else if (!validPassword) {
    return res.status(400).json({ Error: 'Invalid password' })
  } else if (!validAddress) {
    return res.status(400).json({ Error: 'Invalid address' })
  } else if (!validusername) {
    return res.status(400).json({ Error: 'Ivalid username' })
  } else if (!validFirstName) {
    return res.status(400).json({ Error: 'Invalid first name' })
  } else if (!validPhoneNumber || inputs.phonenumber.length != 10) {
    return res.status(400).json({ Error: 'Invalid phonenumber' })
  } else if (!validsecondname) {
    return res.status(400).json({ Error: 'Invalid second name' })
  }
  return false
}
function propertyValidator (res, inputs) {
  const validCategory = inputs.category.toLowerCase().match(stringPattern)
  const validName = inputs.name.toLowerCase().match(stringPattern)
  const validCity = inputs.city.toLowerCase().match(stringPattern)
  const validState = inputs.state.toLowerCase().match(stringPattern)
  const validDescription = inputs.description.toLowerCase().match(stringPatternP)
  const validPrice = inputs.price.match(positiveFloatsPattern)
  const validAddress = inputs.address.match(addressPattern)
  const validMap = inputs.map.match(mapPattern)
  const validReason = inputs.reason.toLowerCase().match(stringPattern)
  if (!validCategory) {
    return res.status(400).json({ Error: 'Invalid Category' })
  } else if (!validName) {
    return res.status(400).json({ Error: 'Make sure name reason, category city, state and description are strings' })
  } else if (!validReason) {
    return res.status(400).json({ Error: 'Invalid reason' })
  } else if (!validState) {
    return res.status(400).json({ Error: 'Invalid state name.' })
  } else if (!validCity) {
    return res.status(400).json({ Error: 'Invalid city name.' })
  } else if (!validPrice) {
    return res.status(400).json({ Error: 'Invalid price' })
  } else if (!validAddress) {
    return res.status(400).json({ Error: 'Invalid address' })
  } else if (!validMap) {
    return res.status(400).json({ Error: 'Make sure that the you provide a valid map cordinates' })
  } else if (!validDescription) {
    return res.status(400).json({ Error: 'Invalid description' })
  }
  return false
}
module.exports = { userValidator, propertyValidator }
