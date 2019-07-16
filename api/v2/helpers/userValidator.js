const numericPattern = /^([0-9])*$/;
const stringPattern = /^[a-z]*$/;
const addressPattern = /^[a-zA-Z0-9.]*$/;
const passwordPattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;
const emailPattern = /^([a-zA-Z0-9.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/;

const userValidator = (res, inputs) => {
  const validAddress = inputs.address.match(addressPattern);
  const validFirstName = inputs.firstname.toLowerCase().match(stringPattern);
  const validsecondname = inputs.lastname.toLowerCase().match(stringPattern);
  const validusername = inputs.username.toLowerCase().match(stringPattern);
  const validEmail = inputs.email.match(emailPattern);
  const validPhoneNumber = inputs.phonenumber.match(numericPattern);
  const validPassword = inputs.password.match(passwordPattern);
  if (!validAddress) {
    return res.status(400).json({ Error: 'Invalid address' });
  } if (!validEmail) {
    return res.status(400).json({ Error: 'Invalid email' });
  } if (!validPassword) {
    return res.status(400).json({ Error: 'Invalid password' });
  } if (!validAddress) {
    return res.status(400).json({ Error: 'Invalid address' });
  } if (!validusername) {
    return res.status(400).json({ Error: 'Ivalid username' });
  } if (!validFirstName) {
    return res.status(400).json({ Error: 'Invalid first name' });
  } if (!validPhoneNumber || inputs.phonenumber.length !== 10) {
    return res.status(400).json({ Error: 'Invalid phonenumber' });
  } if (!validsecondname) {
    return res.status(400).json({ Error: 'Invalid second name' });
  }
  return false;
};

export default { userValidator };
