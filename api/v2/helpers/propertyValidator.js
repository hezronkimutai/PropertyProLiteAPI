const stringPatternP = /^[a-zA-Z\s]*$/;
const stringPattern = /^[a-z]*$/;
const addressPattern = /^[a-zA-Z0-9.]*$/;
const mapPattern = /^[0-9]+,[0-9]*$/;
const positiveFloatsPattern = /^(([0-9]+(?:\.[0-9]+)?)|([0-9]*(?:\.[0-9]+)?))$/;

const propertyValidator = (res, inputs) => {
  const validCategory = inputs.category.toLowerCase().match(stringPattern);
  const validName = inputs.name.toLowerCase().match(stringPattern);
  const validCity = inputs.city.toLowerCase().match(stringPattern);
  const validState = inputs.state.toLowerCase().match(stringPattern);
  const validDescription = inputs.description.toLowerCase().match(stringPatternP);
  const validPrice = inputs.price.match(positiveFloatsPattern);
  const validAddress = inputs.address.match(addressPattern);
  const validMap = inputs.map.match(mapPattern);
  const validReason = inputs.reason.toLowerCase().match(stringPattern);
  if (!validCategory) {
    return res.status(400).json({ status: 400, Error: 'Invalid Category' });
  } if (!validName) {
    return res.status(400).json({ status: 400, Error: 'Make sure name reason, category city, state and description are strings' });
  } if (!validReason) {
    return res.status(400).json({ status: 400, Error: 'Invalid reason' });
  } if (!validState) {
    return res.status(400).json({ status: 400, Error: 'Invalid state name.' });
  } if (!validCity) {
    return res.status(400).json({ status: 400, Error: 'Invalid city name.' });
  } if (!validPrice) {
    return res.status(400).json({ status: 400, Error: 'Invalid price' });
  } if (!validAddress) {
    return res.status(400).json({ status: 400, Error: 'Invalid address' });
  } if (!validMap) {
    return res.status(400).json({ status: 400, Error: 'Make sure that the you provide a valid map cordinates' });
  } if (!validDescription) {
    return res.status(400).json({ status: 400, Error: 'Invalid description' });
  }
  return false;
};
export default { propertyValidator };
