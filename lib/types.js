const isNumber = value => typeof value === 'number';
const isString = value => typeof value === 'string';
const isBoolean = value => typeof value === 'boolean';
const isArray = value => Array.isArray(value);
const isObject = value => typeof value === 'object';
const isFunction = value => typeof value === 'function';


const castToNumber = value => {
  if(isNumber(value)) return value;
  const number = Number(value);
  if(isNaN(number)) throw new CastError(Number, value);
  return number;
};

const castToString = value => {
  if(isString(value)) return value;
  if(isNumber(value) || isBoolean(value) || isArray(value)) return value.toString();
  if(isObject(value)) return JSON.stringify(value);
  if(isFunction(value)) return String(value);
  throw new CastError(String, value);
};

const castToBoolean = value => {
  if(isBoolean(value)) return value;
  if(isNumber(value) || isString(value) || isArray(value) || isObject(value)) return Boolean(value);
  throw new CastError(String, value);
};

const castToArray = value => {
  if(isBoolean(value)) return value;
  if(isNumber(value) || isString(value) || isArray(value) || isObject(value)) return Boolean(value);
  throw new CastError(String, value);
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
  String: castToString,
  Boolean: castToBoolean,
  Array: castToArray
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
  isFunction,
  CastError,
  getCaster,
  castToNumber,
  castToString,
  castToBoolean,
  castToArray
};
