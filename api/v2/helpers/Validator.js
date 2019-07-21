class Validator {
  constructor(req, res) {
    this.res = res;
    this.req = req;
    this.numericPattern = /^([0-9])*$/;
    this.stringPattern = /^[a-z]*$/;
    this.addressPattern = /^[a-zA-Z0-9.]*$/;
    this.passwordPattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;
    this.emailPattern = /^([a-zA-Z0-9.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/;
    this.numericPattern = /^([0-9])*$/;
    this.stringPattern = /^[a-z]*$/;
    this.addressPattern = /^[a-zA-Z0-9.]*$/;
    this.passwordPattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;
    this.emailPattern = /^([a-zA-Z0-9.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/;
    this.numericPattern = /^([0-9])*$/;
    this.stringPattern = /^[a-z]*$/;
    this.addressPattern = /^[a-zA-Z0-9.]*$/;
    this.passwordPattern = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;
    this.emailPattern = /^([a-zA-Z0-9.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?))*$/;
  }

  Flag() {
    this.validDescription = this.req.body.description.toLowerCase().match(this.stringPatternP);
    this.validMap = this.req.body.mappoints.match(this.mapPattern);
    this.validReason = this.req.body.reason.toLowerCase().match(this.stringPattern);
    if (!this.validReason) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid reason' });
    }
    if (!this.validMap) {
      return this.res.status(400).json({ status: 400, Error: 'Make sure that the you provide a valid map cordinates' });
    }
    if (!this.validDescription) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid description' });
    }
    return false;
  }

  User() {
    if (!this.req.body.firstname
      || !this.req.body.lastname
      || !this.req.body.username
      || !this.req.body.email
      || !this.req.body.phonenumber
      || !this.req.body.password
      || !this.req.body.address) {
      return this.res.status(400).json({ status: 400, Error: 'Please fill all the required inputs.' });
    }
    this.validFirstName = this.req.body.firstname.toLowerCase().match(this.stringPattern);
    this.validsecondname = this.req.body.lastname.toLowerCase().match(this.stringPattern);
    this.validusername = this.req.body.username.toLowerCase().match(this.stringPattern);
    this.validEmail = this.req.body.email.match(this.emailPattern);
    this.validPhoneNumber = this.req.body.phonenumber.match(this.numericPattern);
    this.validPassword = this.req.body.password.match(this.passwordPattern);
    this.validAddress = this.req.body.address.match(this.addressPattern);
    if (!this.validAddress) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid address' });
    }
    if (!this.validEmail) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid email' });
    }
    if (!this.validPassword) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid password' });
    }
    if (!this.validAddress) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid address' });
    }
    if (!this.validusername) {
      return this.res.status(400).json({ status: 400, Error: 'Ivalid username' });
    }
    if (!this.validFirstName) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid first name' });
    }
    if (!this.validPhoneNumber || this.req.body.phonenumber.length !== 10) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid phonenumber' });
    }
    if (!this.validsecondname) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid second name' });
    }
    return false;
  }

  Property() {
    this.validType = this.req.body.type.toLowerCase().match(this.stringPattern);
    this.validCity = this.req.body.city.toLowerCase().match(this.stringPattern);
    this.validState = this.req.body.state.toLowerCase().match(this.stringPattern);
    this.validPrice = this.req.body.price.match(this.positiveFloatsPattern);
    this.validAddress = this.req.body.address.match(this.addressPattern);
    if (!this.validType) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid type' });
    }
    if (!this.validState) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid state name.' });
    }
    if (!this.validCity) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid city name.' });
    }
    if (!this.validPrice) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid price' });
    }
    if (!this.validAddress) {
      return this.res.status(400).json({ status: 400, Error: 'Invalid address' });
    }
    return false;
  }
}

export default Validator;
