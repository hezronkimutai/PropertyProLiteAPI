const stringPatternP = /^[a-zA-Z\s]*$/;
const stringPattern = /^[a-z]*$/;
const mapPattern = /^[0-9]+,[0-9]*$/;

const flagValidator = (res, inputs) => {
  const validDescription = inputs.description.toLowerCase().match(stringPatternP);
  const validMap = inputs.mappoints.match(mapPattern);
  const validReason = inputs.reason.toLowerCase().match(stringPattern);
  if (!validReason) {
    return res.status(400).json({ status: 400, Error: 'Invalid reason' });
  } if (!validMap) {
    return res.status(400).json({ status: 400, Error: 'Make sure that the you provide a valid map cordinates' });
  } if (!validDescription) {
    return res.status(400).json({ status: 400, Error: 'Invalid description' });
  }
  return false;
};
export default { flagValidator };
