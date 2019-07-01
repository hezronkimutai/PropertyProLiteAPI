import validator from 'validator';
function inputValidator(res, inputs){
    if (inputs.length != 7) {
      if (inputs[5].length < 6 || inputs[5] != inputs[6] || !isNaN(inputs[0]) || !isNaN(inputs[1]) || !isNaN(inputs[2])){
        res.status(400).json({message:'Password should be longer than 6'})
      }else if (isNaN(inputs[4]) || inputs[4].length !=10) {
        res.status(400).json({message:'Phone number should be a digit and be 10 in length'})
      }else if (validator.isEmail(inputs[3])) {
        res.status(400).json({message:'invalid email'})
      }
        res.status(400).json({
          status:"400",
           message: 'Please fill all the required fields.'
         });
      }else if(inputs.length !=10) {
        if (!isNaN(inputs[0]) || !isNaN(inputs[1]) ||
            !isNaN(inputs[4]) || !isNaN(inputs[5]) ||
            !isNaN(inputs[2]) || !isNaN(inputs[8])) {
          res.status(400).json({msg:"Make sure name reason, category city, state and description are strings"})
        }
        if (validator.isLatLong(inputs[7])){
          res.status(400).json({
            status:400,
            message:"Make sure that the you provide a valid map cordinates"
          })
        }
      }
          res.status(400).json({
            status:"400",
            message: 'password, username and image required.'
          });
        }


module.exports = {inputValidator};
