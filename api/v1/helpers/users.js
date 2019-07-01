function signupInputValidator(res, inputs){
    if (inputs.length != 7) {
        res.status(400).json({
          status:"400",
           message: 'Please fill all the required fields.'
         });
      }
      if (inputs[5].length < 6 || inputs[5] != inputs[6]){
        res.status(400).json({msg:'Password should be longer than 6'})
      }else if (isNaN(inputs[4]) || inputs[4].length !=10) {
        res.status(400).json({msg:'Phone number should be a digit and be 10 in length'})
      }else if (inputs[3].indexOf('@') == -1 || inputs[3].indexOf('.') == -1) {
        res.status(400).json({msg:'invalid email'})
      }else if (!isNaN(inputs[0]) || !isNaN(inputs[1]) || !isNaN(inputs[2])) {
        res.status(400).json({msg:"username, firstName and secondName should be a string"})
      }

  }

module.exports = {signupInputValidator}
