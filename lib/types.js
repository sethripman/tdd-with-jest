const isNumber = value => typeof value === 'number';
const isString = value => typeof value === 'string';
const isBoolean = value => typeof value === 'boolean';
const isArray = value => Array.isArray(value);
const isObject = value => typeof value === 'object';
//const isFunction = value =>



const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  Number: castToNumber,
  //String: castToString,
  //Boolean: castToBoolean,
  //Array: castToArray
};

const getCaster = Type => {  
  return casters[Type.name] || null;
};

module.exports = {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  CastError,
  getCaster,
  castToNumber,
};

/*

const isNumber = value => typeof value === 'number';
const isBoolean = value => typeof value === 'boolean';

const castToNumber = value => {
  if(isNumber(value)) return value;
  
  const convertedNumber = Number(value);
  if(value === '' || isBoolean(value) || Number.isNaN(convertedNumber)) {
    throw `Cannot cast >>${value}<< to Number`;
  }

  return convertedNumber;
};

const typesObj = {
  Number: castToNumber
};

const getCaster = type => {
  return typesObj[type.name] || null;
};

module.exports = {
  isNumber,
  castToNumber
};

*/
