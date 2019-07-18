const stringPattern = /^[a-z]*$/;
const addressPattern = /^[a-zA-Z0-9.]*$/;
const positiveFloatsPattern = /^(([0-9]+(?:\.[0-9]+)?)|([0-9]*(?:\.[0-9]+)?))$/;

const propertyValidator = (res, inputs) => {
  const validType = inputs.type.toLowerCase().match(stringPattern);
  const validCity = inputs.city.toLowerCase().match(stringPattern);
  const validState = inputs.state.toLowerCase().match(stringPattern);
  const validPrice = inputs.price.match(positiveFloatsPattern);
  const validAddress = inputs.address.match(addressPattern);
  if (!validType) {
    return res.status(400).json({ status: 400, Error: 'Invalid type' });
  } if (!validState) {
    return res.status(400).json({ status: 400, Error: 'Invalid state name.' });
  } if (!validCity) {
    return res.status(400).json({ status: 400, Error: 'Invalid city name.' });
  } if (!validPrice) {
    return res.status(400).json({ status: 400, Error: 'Invalid price' });
  } if (!validAddress) {
    return res.status(400).json({ status: 400, Error: 'Invalid address' });
  }
  return false;
};
export default { propertyValidator };
